from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import requests
import os

router = APIRouter()

NEWS_API_KEY = os.getenv("NEWS_API_KEY", "45cedd337d8f4a97aeb83448943b0081")
BASE_URL = "https://newsapi.org/v2"


class NewsArticle(BaseModel):
    title: str
    description: Optional[str]
    url: str
    published_at: datetime
    source: Optional[str]


class NewsResponse(BaseModel):
    category: str
    articles: List[NewsArticle]


def fetch_news(query: str) -> List[NewsArticle]:
    url = f"{BASE_URL}/everything"
    params = {
        "q": query,
        "language": "en",
        "apiKey": NEWS_API_KEY,
        "sortBy": "publishedAt",
        "pageSize": 10,
    }
    response = requests.get(url, params=params)
    data = response.json()

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail=data.get("message", "Failed to fetch news"))

    return [
        NewsArticle(
            title=article["title"],
            description=article.get("description"),
            url=article["url"],
            published_at=datetime.fromisoformat(article["publishedAt"].replace("Z", "+00:00")),
            source=article["source"]["name"]
        )
        for article in data.get("articles", [])
    ]


@router.get("/news/latest", response_model=NewsResponse)
def latest_news():
    articles = fetch_news("latest news")
    return NewsResponse(category="general", articles=articles)


@router.get("/news/economics", response_model=NewsResponse)
def economic_news():
    articles = fetch_news("economic news")
    return NewsResponse(category="economics", articles=articles)


@router.get("/news/stocks", response_model=NewsResponse)
def stock_news():
    articles = fetch_news("stock market")
    return NewsResponse(category="stocks", articles=articles)
