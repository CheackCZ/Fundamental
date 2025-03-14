import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";

import LoggedInNavbar from "@/components/logged-in-navbar/LoggedInNavbar";
import ImageCard from '@/components/img-card/ImageCard';
import NewsCard from "@/components/news-card/NewsCard";
import MarketsCarousel from "@/components/markets-carousel/MarketsCarousel";
import MacrocalendarTable from "@/components/macrocalendar-table/MacroCalendarTable";
import Footer from "@/components/footer/Footer";

// @ts-ignore
import Command from "@/components/command/Command"; 

import "./Dashboard.css";
import FearAndGreed from "@/components/fear-and-greed/FearAndGreed";

function Dashboard() {
    const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
    const [placeholder, setPlaceholder] = useState<string>("");
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [typingSpeed, setTypingSpeed] = useState<number>(100);

    const placeholderOptions = [
        "Search for stocks...",
        "Try 'Tesla stock price'...",
        "Look up financial news...",
        "Find market trends...",
        "Search for economic data...",
        "Try 'AAPL earnings'..."
    ];

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
                        <h1>Welcome, ondra.faltin@gmail.com</h1>
                        <p>Press CTRL + J or search for anything you need.</p>

                        <Input className="text-white" placeholder={placeholder} />
                    </div>

                    {/* Container with some visualization, not yet added. */}
                    <div className="visualize-container"></div>

                </section>

                {/* Section with boxes for individual subpages preview */}
                <section id="boxes-section" className="main-section">

                        <ImageCard 
                            title="Markets" 
                            image="" 
                        />
                        <ImageCard 
                            title="News" 
                            image="" 
                        />
                        <ImageCard 
                            title="Macrocalendar" 
                            image="" 
                        />
                        <ImageCard 
                            title="Analysis" 
                            image="" 
                        />

                </section>

                {/* Section with News previews */}
                <section id="news-section" className="main-section">
                    {/* Link to enitre News page */}
                    <a href="" className="section-title">All news &gt;</a>

                    {/* Container with individual news preview */}
                    <div className="news-boxes-container">
                        <NewsCard 
                            image="https://via.placeholder.com/360x200" 
                            title="Breaking News" 
                            content="This is a summary of the latest news happening around the world."
                            newsReference="https://example.com/news"
                        />

                        <NewsCard 
                            image="https://via.placeholder.com/360x200" 
                            title="Breaking News" 
                            content="This is a summary of the latest news happening around the world."
                            newsReference="https://example.com/news"
                            width="420px"
                            height="560px"
                        />

                        <NewsCard 
                            image="https://via.placeholder.com/360x200" 
                            title="Breaking News" 
                            content="This is a summary of the latest news happening around the world."
                            newsReference="https://example.com/news"
                        />
                    </div>
                    
                </section>

                {/* Section with Markets preview */}
                <section id="markets-section" className="main-section">
                    {/* Link to entire Markets page */}
                    <a href="" className="section-title">All Markets &gt;</a>

                    {/* Carousel with the markets */}
                    <div className="markets-carousel">
                        <MarketsCarousel />
                    </div>

                </section>


                {/* Section with Macrocalendar preview */}
                <section id="macro-section" className="main-section">
                    {/* Link to entire Macrocalendar page */}
                    <a href="" className="section-title">Entire Macrocalendar &gt;</a>

                    {/* Macrocalendar table component */}
                    <MacrocalendarTable />
                    
                </section>

                {/* Section with Mood preview */}
                <section id="analysis-section" className="main-section">

                    {/* Link to entire Analysis page */}
                    <a href="" className="section-title">Analysis &gt;</a>
                    
                    {/* Stock Market Fear & Greed Index */}
                    <FearAndGreed />

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