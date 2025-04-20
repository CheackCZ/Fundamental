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

function News () {
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
    

    return (

        <div className="news-content">
            
            {/* Header */}
            <header>
                <LoggedInNavbar toggleCommand={toggleCommand}/>
            </header>
        
            {/* Main */}
            <main>

                {/* Command Component (Search) - Opened from Navbar */}
                {isCommandOpen && <Command isVisible={isCommandOpen} onClose={() => setIsCommandOpen(false)} />}

                <div className="news-page-sections">

                    {/* Latest News Section */}
                    <div className="news-page-section" id="latest-section">
                        
                        <h1 className="section-title" id="latest-title">Latest News</h1>

                        {/* Latest News Section */}
                        <div className="section-container" id="latest-container">
                            {latestNews.map((news, index) => (
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

                    {/* Stock market News Section */}
                    <div className="news-page-section" id="stock-market-section">

                        <Link to="/news/stock-market-news" className="section-title" id="stock-market-title">
                            Stock Market News &gt;
                        </Link>

                        <div className="section-container" id="stock-market-container">
                            {stockNews.map((news, index) => (
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

                    {/* Economic News Section */}
                    <div className="news-page-section" id="economic-market-section">
                        
                        <Link to="/news/economic-news" className="section-title" id="stock-market-title">
                            Economic News &gt;
                        </Link>

                        <div className="section-container" id="economics-container">
                            {economicNews.map((news, index) => (
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

                    {/* All News Section */}
                    <div className="news-page-section" id="all-section">
                        
                        <h1 className="section-title" id="stock-market-title">All News</h1>

                        <div className="section-container">
                            {allNews.map((news, index) => (
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

                </div>
                
            </main>

            <footer>
                <Footer></Footer>
            </footer>

        </div>

    )
    
}

export default News;