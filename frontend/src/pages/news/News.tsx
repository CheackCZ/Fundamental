import { useState, useEffect } from "react";

import LoggedInNavbar from "@/components/logged-in-navbar/LoggedInNavbar";
import Footer from "@/components/footer/Footer";

// @ts-ignore
import Command from "@/components/command/Command"; 

import './News.css';

function Markets () {
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

                        <div className="section-container" id="latest-container">

                            <div className="latest-news">
                                <img src="/src/assets/img/previews/preview-test.png" alt="" />
                                
                                <h3>Wall Street's 2025 stock market forecasts are falling ...</h3>
                                
                                <p>Monday's market meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy and the current bull market run....</p>

                                <a href="">More &gt;</a>

                            </div>

                            <div className="news-item latest-1">
                                <img src="/src/assets/img/previews/preview-test.png" alt="" />

                                <div className="news-item-texts">
                                    <h3>Wall Street's 2025 stock market forecasts are falling ...</h3>
                                    
                                    <p>Monday's market meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy and the current bull market run....</p>

                                    <a href="">More &gt;</a>
                                </div>

                            </div>
                            <div className="news-item latest-2">
                                <img src="/src/assets/img/previews/preview-test.png" alt="" />

                                <div className="news-item-texts">
                                    <h3>Wall Street's 2025 stock market forecasts are falling ...</h3>
                                    
                                    <p>Monday's market meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy and the current bull market run....</p>

                                    <a href="">More &gt;</a>
                                </div>
                            </div>
                            <div className="news-item latest-3">
                                <img src="/src/assets/img/previews/preview-test.png" alt="" />

                                <div className="news-item-texts">
                                    <h3>Wall Street's 2025 stock market forecasts are falling ...</h3>
                                    
                                    <p>Monday's market meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy and the current bull market run....</p>

                                    <a href="">More &gt;</a>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Stock market News Section */}
                    <div className="news-page-section" id="stock-market-section">
                        
                        <h1 className="section-title" id="stock-market-title">Stock Market News</h1>

                        <div className="section-container" id="stock-market-container">
                            <div className="latest-news"></div>

                            <div className="news-item latest-1"></div>
                            <div className="news-item latest-2"></div>
                            <div className="news-item latest-3"></div>
                        </div>

                    </div>

                    {/* Economic News Section */}
                    <div className="news-page-section" id="economic-market-section">
                        
                        <h1 className="section-title" id="economic-market-title">Economic News</h1>

                        <div className="section-container" id="economic-market-container">
                            <div className="latest-news"></div>

                            <div className="news-item latest-1"></div>
                            <div className="news-item latest-2"></div>
                            <div className="news-item latest-3"></div>
                        </div>

                    </div>

                    {/* All News Section */}
                    <div className="news-page-section" id="all-section">
                        
                        <h1 className="section-title" id="all-title">All News</h1>

                        <div className="section-container" id="all-container">
                            <div className="news-item latest-1"></div>
                            <div className="news-item latest-2"></div>
                            <div className="news-item latest-3"></div>

                            <div className="news-item latest-4"></div>
                            <div className="news-item latest-5"></div>
                            <div className="news-item latest-6"></div>
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

export default Markets;