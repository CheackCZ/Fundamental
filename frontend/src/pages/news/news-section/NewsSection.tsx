import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import LoggedInNavbar from "@/components/logged-in-navbar/LoggedInNavbar";
import NewsCard from "@/components/news-card/NewsCard";
import Footer from "@/components/footer/Footer";

import './NewsSection.css';

const NewsSection = () => {
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

    
    const params = useParams();
    console.log("Params:", params); 

    const { sectionName } = params || {};

    if (!sectionName) {
        return <p>Loading... or No section provided.</p>;
    }

    const newsData = [
        {
            id: 1,
            image: "/src/assets/img/previews/preview-test.png",
            title: "Wall Street's 2025 stock market forecasts are falling...",
            content: "Monday's skdvnsja kajdhsfhas hfbjkdfaskdf jas nfjs fs ndfkjna ehfadsfjanef unasdssdfjsk...",
            newsReference: "https://example.com/article"
        },
        {
            id: 2,
            image: "/src/assets/img/previews/preview-test.png",
            title: "More updates on stock market trends...",
            content: "The financial sector is seeing a major shift as economists analyze the market reaction...",
            newsReference: "https://example.com/article"
        },
        {
            id: 3,
            image: "/src/assets/img/previews/preview-test.png",
            title: "Economic policies impact global markets...",
            content: "Recent decisions by central banks worldwide have led to significant fluctuations...",
            newsReference: "https://example.com/article"
        },
        {
            id: 4,
            image: "/src/assets/img/previews/preview-test.png",
            title: "Breaking: Global finance updates...",
            content: "Key financial institutions are monitoring the stock market as volatility remains high...",
            newsReference: "https://example.com/article"
        },
        ...Array(6).fill({
            id: 5,
            image: "/src/assets/img/previews/preview-test.png",
            title: "Ongoing economic developments...",
            content: "Markets continue to respond to new economic indicators, affecting global trends...",
            newsReference: "https://example.com/article"
        })
    ];
    return (

        <div className="news-section-content">

            {/* Header */}
            <header>
                <LoggedInNavbar toggleCommand={toggleCommand} />
            </header>

            {/* Main Section */}
            <main>
                <div className="news-section-container">
                    <h1 className="section-title">{sectionName.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}</h1>

                    {/* Latest News Section */}
                    <div className="section-container" id="latest-container">
                        {/* First article in detailed variant */}
                        <NewsCard 
                            image={newsData[0].image}
                            title={newsData[0].title}
                            content={newsData[0].content}
                            newsReference={newsData[0].newsReference}
                            variant="detailed"
                            width="100%"
                            height="auto"
                        />

                        {/* Next 3 articles in compact variant */}
                        {newsData.slice(1, 4).map((news) => (
                            <NewsCard
                                key={news.id}
                                image={news.image}
                                title={news.title}
                                content={news.content}
                                newsReference={news.newsReference}
                                variant="compact"
                                width="100%"
                                height="153px"
                            />
                        ))}
                    </div>

                    {/* Remaining News Articles (Compact Variant with Gap) */}
                    <div className="section-container news-grid">
                        {newsData.slice(4).map((news) => (
                            <NewsCard
                                key={news.id}
                                image={news.image}
                                title={news.title}
                                content={news.content}
                                newsReference={news.newsReference}
                                variant="compact"
                                width="100%"
                                height="153px"
                            />
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer>
                <Footer />
            </footer>
            
        </div>
    
    );
};

export default NewsSection;