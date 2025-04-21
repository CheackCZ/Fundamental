from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import subprocess
import json
from fastapi import HTTPException
from pydantic import BaseModel
import yfinance as yf
from datetime import datetime, timedelta

router = APIRouter()

FEAR_GREED_URL = "https://edition.cnn.com/markets/fear-and-greed"

class FearGreedData(BaseModel):
    current_value: str
    historical_values: list[str]

@router.get("/analysis/fear-greed", response_model=FearGreedData)
def get_fear_greed_index():
    try:
        result = subprocess.run(
            ["python", "src/scrape_fng.py"],
            capture_output=True,
            text=True,
            timeout=30
        )
        if result.returncode != 0:
            raise Exception(result.stderr)

        data = json.loads(result.stdout)
        return FearGreedData(**data)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Subprocess error: {e}")