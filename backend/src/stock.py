from fastapi import APIRouter, Query
import yfinance as yf
import requests
import subprocess
import json
from pydantic import BaseModel
from fastapi import HTTPException
import pandas as pd

router = APIRouter()

FINNHUB_API_KEY = "csormhpr01qt3r34gfq0csormhpr01qt3r34gfqg"
TICKERS = pd.read_csv("tickers.csv")

@router.get("/stock/{ticker}/info")
async def get_stock_info(ticker: str):
    stock = yf.Ticker(ticker)
    info = stock.info
    return {
        "ticker": ticker,
        "name": info.get("shortName"),
        "current_price": info.get("currentPrice"),
        "description": info.get("longBusinessSummary"),
    }

@router.get("/stock/{ticker}/logo")
async def get_company_logo(ticker: str):
    try:
        url = f"https://finnhub.io/api/v1/stock/profile2?symbol={ticker}&token={FINNHUB_API_KEY}"
        response = requests.get(url)
        data = response.json()
        logo_url = data.get("logo")
        return {"logo_url": logo_url}
    except Exception as e:
        return {"error": str(e)}

@router.get("/stock/{ticker}/valuations")
async def get_stock_valuations(ticker: str):
    stock = yf.Ticker(ticker)
    info = stock.info
    return {
        "market_cap": info.get("marketCap"),
        "pe_ratio": info.get("trailingPE"),
        "eps": info.get("trailingEps"),
        "beta": info.get("beta"),
        "dividend_yield": info.get("dividendYield"),
    }


def fetch_history(ticker: str, interval: str, period: str):
    stock = yf.Ticker(ticker)
    hist = stock.history(interval=interval, period=period)
    hist = hist.reset_index()
    hist["date"] = hist["Datetime" if "Datetime" in hist.columns else "Date"].astype(str)
    return hist[["date", "Close"]].rename(columns={"Close": "price"}).to_dict(orient="records")

@router.get("/stock/{ticker}/history/1d")
async def get_1d_history(ticker: str):
    return {"chart_data": fetch_history(ticker, "1m", "1d")}

@router.get("/stock/{ticker}/history/5d")
async def get_5d_history(ticker: str):
    return {"chart_data": fetch_history(ticker, "5m", "5d")}

@router.get("/stock/{ticker}/history/1m")
async def get_1m_history(ticker: str):
    return {"chart_data": fetch_history(ticker, "60m", "1mo")}

@router.get("/stock/{ticker}/history/3m")
async def get_3m_history(ticker: str):
    return {"chart_data": fetch_history(ticker, "1d", "3mo")}

@router.get("/stock/{ticker}/history/1y")
async def get_1y_history(ticker: str):
    return {"chart_data": fetch_history(ticker, "1d", "1y")}

@router.get("/stock/{ticker}/history/5y")
async def get_5y_history(ticker: str):
    return {"chart_data": fetch_history(ticker, "1wk", "5y")}


@router.get("/stock/{ticker}/financials/income")
async def get_income_statement(ticker: str):
    stock = yf.Ticker(ticker)
    return stock.income_stmt.fillna(0).to_dict()

@router.get("/stock/{ticker}/financials/balance")
async def get_balance_sheet(ticker: str):
    stock = yf.Ticker(ticker)
    return stock.balance_sheet.fillna(0).to_dict()

@router.get("/stock/{ticker}/financials/cashflow")
async def get_cash_flow(ticker: str):
    stock = yf.Ticker(ticker)
    return stock.cashflow.fillna(0).to_dict()


class TopStock(BaseModel):
    ticker: str
    name: str
    price: float
    changePercent: float
    volume: str

@router.get("/stocks/top", response_model=list[TopStock])
def get_top_stocks():
    """
    Returns top trending stocks scraped from CNN Markets, enriched with Yahoo Finance data.
    """
    try:
        result = subprocess.run(
            ["python", "src/scrape_hottest.py"], 
            capture_output=True,
            text=True,
            timeout=60  
        )
        print("STDOUT:", result.stdout)
        print("STDERR:", result.stderr)

        if result.returncode != 0:
            raise Exception(result.stderr)

        if result.returncode != 0:
            raise Exception(result.stderr)

        data = json.loads(result.stdout)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Top stock scraping failed: {e}")


@router.get("/stocks/search")
def search_tickers(query: str = Query(..., min_length=1)) -> list[dict]:
    results = TICKERS[
        TICKERS["Symbol"].str.contains(query, case=False) |
        TICKERS["Security Name"].str.contains(query, case=False)
    ].head(10)

    return results.rename(columns={"Symbol": "ticker", "Security Name": "name"}).to_dict(orient="records")