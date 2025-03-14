from fastapi import FastAPI
import yfinance as yf

app = FastAPI()

@app.get("/api/fear-greed")
def get_vix_index():
    """Fetch VIX (Volatility Index) to estimate market Fear & Greed"""
    vix = yf.Ticker("VIX") 
    vix_data = vix.history(period="1d")

    if vix_data.empty:
        return {"error": "Failed to fetch VIX data"}

    vix_value = round(vix_data["Close"].iloc[-1], 2)

    if vix_value > 30:
        classification = "Extreme Fear"
    elif vix_value > 20:
        classification = "Fear"
    elif vix_value > 15:
        classification = "Neutral"
    elif vix_value > 10:
        classification = "Greed"
    else:
        classification = "Extreme Greed"

    return {"index": vix_value, "classification": classification}
