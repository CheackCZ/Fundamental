import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LoggedInNavbar from "@/components/logged-in-navbar/LoggedInNavbar";
import NewsCard from "@/components/news-card/NewsCard";
import Footer from "@/components/footer/Footer";

// @ts-ignore
import Command from "@/components/command/Command";

import './News.css';

interface NewsArticle {
    id: string,
    title: string;
    description?: string;
    url: string;
    published_at: string;
    source?: string;
    image_url?: string;
}

function News() {
    const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);

    const toggleCommand = () => {
        setIsCommandOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === "j") {
                event.preventDefault();
                toggleCommand();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);
    const [stockNews, setStockNews] = useState<NewsArticle[]>([]);
    const [economicNews, setEconomicNews] = useState<NewsArticle[]>([]);
    const [allNews, setAllNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const [latestRes, stockRes, econRes, allRes] = await Promise.all([
                    fetch("http://127.0.0.1:8000/api/news/latest"),
                    fetch("http://127.0.0.1:8000/api/news/stocks"),
                    fetch("http://127.0.0.1:8000/api/news/economics"),
                    fetch("http://127.0.0.1:8000/api/news/all")
                ]);

                const latestData = await latestRes.json();
                const stockData = await stockRes.json();
                const econData = await econRes.json();
                const allData = await allRes.json();

                setLatestNews(latestData.articles);
                setStockNews(stockData.articles);
                setEconomicNews(econData.articles);
                setAllNews(allData.articles);
            } catch (err) {
                console.error("Error fetching news:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const renderNewsSection = (
        title: string,
        link: string | null,
        newsList: NewsArticle[],
        id: string
    ) => (
        <div className="news-page-section" id={id}>
            {link ? (
                <Link to={link} className="section-title">{title} &gt;</Link>
            ) : (
                <h1 className="section-title">{title}</h1>
            )}

            <div className="section-container">
                {loading
                    ? Array.from({ length: 4 }).map((_, index) => (
                          <NewsCard
                              key={index}
                              loading={true}
                              variant={index === 0 ? "detailed" : "compact"}
                              width="100%"
                              height={index === 0 ? "auto" : "153px"}
                          />
                      ))
                    : newsList.map((news, index) => (
                          <NewsCard
                              key={news.id}
                              id={news.id}
                              image={news.image_url || "/src/assets/img/previews/image-preview.jpg"}
                              title={news.title}
                              content={news.description || "No description."}
                              newsReference={news.url}
                              variant={index === 0 ? "detailed" : "compact"}
                              width="100%"
                              height={index === 0 ? "auto" : "153px"}
                          />
                      ))}
            </div>
        </div>
    );

    return (
        <div className="news-content">

            <header>
                <LoggedInNavbar toggleCommand={toggleCommand} />
            </header>

            <main>
                {isCommandOpen && (
                    <Command isVisible={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
                )}

                <div className="news-page-sections">

                    {/* Latest News Section */}
                    {renderNewsSection("Latest News", null, latestNews, "latest-section")}

                    {/* Stock Market News Section */}
                    {renderNewsSection("Stock Market News", "/news/stock-market-news", stockNews, "stock-market-section")}

                    {/* Economic News Section */}
                    {renderNewsSection("Economic News", "/news/economic-news", economicNews, "economic-market-section")}

                    {/* All News Section */}
                    {renderNewsSection("All News", null, allNews, "all-section")}

                </div>
            </main>

            <footer>
                <Footer />
            </footer>

        </div>
    );
}

export default News;