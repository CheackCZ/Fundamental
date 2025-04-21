from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src import news, analysis, stock
from src.search import router as search_router

from db.connection import Base, engine
from src import auth

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create DB tables
Base.metadata.create_all(bind=engine)

app.include_router(news.router, prefix="/api", tags=["News"])
app.include_router(analysis.router, prefix="/api", tags=["Analysis"])
app.include_router(stock.router, prefix="/api", tags=["Stocks"])
app.include_router(search_router, prefix="/api/stocks")
app.include_router(auth.router)