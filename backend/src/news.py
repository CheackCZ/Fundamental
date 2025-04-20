from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import requests
import hashlib
from newspaper import Article as NewsScraper

from utils.logger import logger
from utils.config import config

router = APIRouter()
BASE_URL = "https://newsapi.org/v2"

def generate_id_from_url(url: str) -> str:
    return hashlib.md5(url.encode()).hexdigest()

class NewsArticle(BaseModel):
    id: str
    title: str
    description: Optional[str]
    url: str
    published_at: datetime
    source: Optional[str]
    image_url: Optional[str]
    content: Optional[str] = None

class NewsResponse(BaseModel):
    category: str
    articles: List[NewsArticle]

def scrape_full_article(url: str) -> str:
    try:
        article = NewsScraper(url)
        article.download()
        article.parse()
        return article.text.strip() if article.text else None
    except Exception as e:
        logger.warning(f"Error scraping article from {url}: {e}")
        return None

def fetch_news(query: str, limit: int = 4) -> List[NewsArticle]:
    url = f"{BASE_URL}/everything"
    params = {
        "q": query,
        "language": "en",
        "apiKey": config.NEWS_API_KEY,
        "sortBy": "publishedAt",
        "pageSize": 20,
    }

    logger.debug(f"Fetching news for query: {query}")
    response = requests.get(url, params=params)
    data = response.json()

    if response.status_code != 200:
        logger.error(f"News API error: {data}")
        raise HTTPException(status_code=500, detail=data.get("message", "Failed to fetch news"))

    articles: List[NewsArticle] = []
    for item in data.get("articles", []):
        try:
            if not item.get("title") or not item.get("url") or not item.get("publishedAt"):
                continue

            article = NewsArticle(
                id=generate_id_from_url(item["url"]),
                title=item["title"],
                description=item.get("description"),
                url=item["url"],
                published_at=datetime.fromisoformat(item["publishedAt"].replace("Z", "+00:00")),
                source=item["source"]["name"],
                image_url=item.get("urlToImage"),
            )
            articles.append(article)

            if len(articles) >= limit:
                break
        except Exception as e:
            logger.warning(f"Skipping invalid article: {e}")
            continue

    return articles

@router.get("/news/latest", response_model=NewsResponse)
def latest_news():
    return NewsResponse(category="general", articles=fetch_news("latest news", limit=4))

@router.get("/news/economics", response_model=NewsResponse)
def economic_news():
    return NewsResponse(category="economics", articles=fetch_news("economic news", limit=4))

@router.get("/news/stocks", response_model=NewsResponse)
def stock_news():
    return NewsResponse(category="stocks", articles=fetch_news("stock market", limit=4))

@router.get("/news/all", response_model=NewsResponse)
def all_news():
    latest = fetch_news("latest news", limit=10)
    economics = fetch_news("economic news", limit=10)
    stocks = fetch_news("stock market", limit=10)
    
    all_articles = latest + economics + stocks
    unique_articles_dict = {article.url: article for article in all_articles}
    unique_articles = list(unique_articles_dict.values())

    return NewsResponse(category="all", articles=unique_articles)

@router.get("/news/article/{article_id}", response_model=NewsArticle)
def get_article_by_id(article_id: str):
    combined_articles = (
        fetch_news("latest news", limit=10) +
        fetch_news("economic news", limit=10) +
        fetch_news("stock market", limit=10)
    )
    unique_articles = {article.id: article for article in combined_articles}

    if article_id not in unique_articles:
        raise HTTPException(status_code=404, detail="Article not found")

    article = unique_articles[article_id]
    article.content = scrape_full_article(article.url) or f"Full article content could not be retrieved. Please visit the original article: {article.url}."

    return article

@router.get("/news/related", response_model=List[NewsArticle])
def get_related_articles(title: str):
    all_articles = (
        fetch_news("latest news", limit=10) +
        fetch_news("economic news", limit=10) +
        fetch_news("stock market", limit=10)
    )
    
    target_article = next((a for a in all_articles if a.title == title), None)
    if not target_article:
        raise HTTPException(status_code=404, detail="Article not found")

    stop_words = {"the", "a", "an", "in", "on", "and", "of", "to", "as", "with", "at", "for"}
    keywords = [word.lower() for word in target_article.title.split() if word.lower() not in stop_words and len(word) > 2]

    related = [
        article for article in all_articles
        if article.title != title and any(kw in article.title.lower() for kw in keywords)
    ]

    return related[:3]