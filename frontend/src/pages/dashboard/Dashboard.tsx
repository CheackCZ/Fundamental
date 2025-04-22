import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";

import LoggedInNavbar from "@/components/logged-in-navbar/LoggedInNavbar";
import ImageCard from '@/components/img-card/ImageCard';
import NewsCard from "@/components/news-card/NewsCard";
import StocksCarousel from "@/components/markets-carousel/MarketsCarousel";
import MacrocalendarTable from "@/components/macrocalendar-table/MacroCalendarTable";
import FearGreedBox from "@/components/sentiment/FearAndGreed";
import Footer from "@/components/footer/Footer";

// @ts-ignore
import Command from "@/components/command/Command"; 

import "./Dashboard.css";

function Dashboard() {
    const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
    const [placeholder, setPlaceholder] = useState<string>("");
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [typingSpeed, setTypingSpeed] = useState<number>(100);

    interface NewsArticle {
        id: string;
        title: string;
        description?: string;
        url: string;
        published_at: string;
        source?: string;
        image_url?: string;
        content?: string;
    }

    const placeholderOptions = [
        "Search for stocks...",
        "Try 'Tesla ticker'...",
        "Try 'AAPL'..."
    ];

    const navigate = useNavigate();
    const [search, setSearch] = useState<string>("");
    const [suggestions, setSuggestions] = useState<StockData[]>([]);

    interface StockData {
        ticker: string;
        name: string;
    }

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        let currentText = placeholderOptions[currentIndex];

        if (isDeleting) {
            // Deleting effect
            timeout = setTimeout(() => {
                setPlaceholder((prev) => prev.slice(0, -1));
                if (placeholder === "") {
                    setIsDeleting(false);
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholderOptions.length);
                }
            }, 50); 
        } else {
            // Typing effect
            timeout = setTimeout(() => {
                setPlaceholder((prev) => currentText.slice(0, prev.length + 1));
                if (placeholder === currentText) {
                    setTimeout(() => setIsDeleting(true), 2000); 
                }
            }, typingSpeed);
        }

        return () => clearTimeout(timeout);
    }, [placeholder, isDeleting, currentIndex, typingSpeed]);

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

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/news/latest")
            .then(res => res.json())
            .then(data => {
                setLatestNews(data.articles.slice(0, 3));
            })
            .catch(err => console.error("Failed to load latest news:", err));
    }, []);

    useEffect(() => {
        if (search.length < 1) {
            setSuggestions([]);
            return;
        }
    
        const delayDebounce = setTimeout(() => {
            fetch(`http://localhost:8000/api/stocks/search?query=${search}`)
                .then((res) => res.json())
                .then((data) => setSuggestions(data))
                .catch(() => setSuggestions([]));
        }, 300);
    
        return () => clearTimeout(delayDebounce);
    }, [search]);


    return (
        <div className="dashboard-content">

            {/* Header */}
            <header>
                <LoggedInNavbar toggleCommand={toggleCommand} />
            </header>

            {/* Main */}
            <main>

                {/* Command Component (Search) - Opened from Navbar */}
                {isCommandOpen && <Command isVisible={isCommandOpen} onClose={() => setIsCommandOpen(false)} />}

                {/* Section at the top with input and preview */}
                <section id="welcome-section" className="main-section">

                    {/* Container with welcome message, instruction and input box. */}
                    <div className="info-container">
                        <h1>Welcome to Fundamental!</h1>
                        <p>Press CTRL + J or search for anything you need.</p>

                        <div className="relative w-full max-w-md">
                            <Input
                                className="text-white w-full"
                                placeholder={placeholder}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {suggestions.length > 0 && (
                                <ul className="absolute top-full mt-1 w-full border rounded bg-white shadow-md z-10 max-h-60 overflow-y-auto text-black">
                                    {suggestions.slice(0, 5).map((s) => (
                                        <li
                                            key={s.ticker}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setSearch(s.ticker);
                                                navigate(`/stock/${s.ticker}`);
                                            }}
                                        >
                                            {s.ticker} - {s.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                    </div>

                    {/* Container with some visualization, not yet added. */}
                    <div className="visualize-container"></div>

                </section>

                {/* Section with boxes for individual subpages preview */}
                <section id="boxes-section" className="main-section">

                        <ImageCard 
                            title="Stocks" 
                            image="/src/assets/img/previews/stocks-preview.png" 
                            url="/stocks"
                        />
                        <ImageCard 
                            title="News" 
                            image="/src/assets/img/previews/news-preview.png" 
                            url='/news'
                        />
                        <ImageCard 
                            title="Macrocalendar" 
                            image="/src/assets/img/previews/macrocalendar-preview.png" 
                            url='/macrocalendar'
                        />
                        <ImageCard 
                            title="Analysis" 
                            image="/src/assets/img/previews/analysis-preview.png" 
                            url='/sentiment'
                        />

                </section>

                {/* Section with News previews */}
                <section id="news-section" className="main-section">
                    {/* Link to enitre News page */}
                    <a href="/news" className="section-title">All news &gt;</a>

                    <div className="news-boxes-container">
                    {latestNews.length === 0 ? (
                        <>
                            <NewsCard loading variant="default" width="100%" height="480px" />
                            <NewsCard loading variant="default" width="100%" height="520px" />
                            <NewsCard loading variant="default" width="100%" height="480px" />
                        </>
                    ) : (
                        latestNews.map((news, index) => (
                            <NewsCard
                                key={news.id}
                                id={news.id}
                                image={news.image_url || "/src/assets/img/previews/image-preview.png"}
                                title={news.title}
                                content={news.description || news.content?.slice(0, 100) + "..."}
                                variant="default"
                                width="100%"
                                height={index === 1 ? "520px" : "480px"}
                            />
                        ))
                    )}

                    </div>
                    
                </section>

                {/* Section with Markets preview */}
                <section id="markets-section" className="main-section">
                    {/* Link to entire Markets page */}
                    <a href="/stocks" className="section-title">All Stocks &gt;</a>

                    {/* Carousel with the markets */}
                    <div className="markets-carousel">
                        <StocksCarousel />
                    </div>

                </section>


                {/* Section with Macrocalendar preview */}
                <section id="macro-section" className="main-section">
                    {/* Link to entire Macrocalendar page */}
                    <a href="/macrocalendar" className="section-title">Entire Macrocalendar &gt;</a>

                    {/* Macrocalendar table component */}
                    <MacrocalendarTable />
                    
                </section>

                {/* Section with Mood preview */}
                <section id="analysis-section" className="main-section">

                    {/* Link to entire Analysis page */}
                    <a href="/sentiment" className="section-title">Analysis &gt;</a>
                    
                    {/* Stock Market Fear & Greed Index */}
                    <FearGreedBox />
                </section>

            </main>

            {/* Footer */}
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Dashboard;