import json
from playwright.sync_api import sync_playwright, TimeoutError
import yfinance as yf

def scrape_top_stocks():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("https://edition.cnn.com/markets", timeout=20000)
            # Wait for tickers to appear (instead of fixed sleep)
            page.wait_for_selector("a.basic-table__link-B1P_UJ", timeout=10000)
        except TimeoutError:
            print(json.dumps({"error": "Timeout loading CNN Markets"}))
            browser.close()
            return

        ticker_elements = page.locator("a.basic-table__link-B1P_UJ").all()
        volume_elements = page.locator("div.basic-table__volume-3V90t3").all()

        tickers = [el.inner_text().strip() for el in ticker_elements[:20]]
        volumes = [el.inner_text().strip() for el in volume_elements[:20]]

        results = []

        for ticker, volume in zip(tickers, volumes):
            if any(x in ticker for x in [" ", "$", "INDEX", "&"]):
                continue

            try:
                stock = yf.Ticker(ticker)
                hist = stock.history(period="7d", interval="1d")

                if hist.empty or len(hist["Close"]) < 2:
                    continue

                price_now = hist["Close"].iloc[-1]
                price_week_ago = hist["Close"].iloc[0]
                change_percent = ((price_now - price_week_ago) / price_week_ago) * 100

                info = stock.info

                results.append({
                    "ticker": ticker,
                    "name": info.get("shortName", ticker),
                    "price": round(price_now, 2),
                    "changePercent": round(change_percent, 2),
                    "volume": volume
                })
            except Exception as e:
                print(f"Error for {ticker}: {e}")
                continue

        browser.close()
        print(json.dumps(results, indent=2))

if __name__ == "__main__":
    scrape_top_stocks()