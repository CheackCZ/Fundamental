from fastapi import APIRouter, Query
from typing import List
from pydantic import BaseModel
import pandas as pd

router = APIRouter()

tickers_df = pd.read_csv("tickers.csv")  

class SearchResult(BaseModel):
    ticker: str
    name: str

@router.get("/search", response_model=List[SearchResult])
def search_tickers(q: str = Query(..., min_length=1)):
    filtered = tickers_df[
        tickers_df["Symbol"].str.contains(q, case=False) |
        tickers_df["Security Name"].str.contains(q, case=False)
    ].head(5)

    return [{"ticker": row["Symbol"], "name": row["Security Name"]} for _, row in filtered.iterrows()]
