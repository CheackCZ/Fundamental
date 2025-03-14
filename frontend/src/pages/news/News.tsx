import { useState, useEffect } from "react";

import LoggedInNavbar from "@/components/logged-in-navbar/LoggedInNavbar";
import NewsCard from "@/components/news-card/NewsCard";
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

                            <NewsCard 
                                image="/src/assets/img/previews/preview-test.png"
                                title="Wall Street's 2025 stock market forecasts are falling..."
                                content="Monday's skdvnsja  kajdhsfhas hfbjkdfaskdf jas nfjs fs ndfkjna ehfadsfjanef unasdssdfjsk  ajsnf asfsjadf naj ndnfksankfd nasdjasndajsn da sdnj ansd jandaa  akd aj a dnaj fn rsfndna  asdn ajns dakjsn dmarket meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy..."
                                newsReference="https://example.com/article"
                                variant="detailed" 
                                width="100%" 
                                height="auto"
                            />
                            
                            <NewsCard 
                                image="/src/assets/img/previews/preview-test.png"
                                title="Wall Street's 2025 stock market forecasts are falling..."
                                content="Monday's skdvnsja  kajdhsfhas hfbjkdfaskdf jas nfjs fs ndfkjna ehfadsfjanef unasdssdfjsk  ajsnf asfsjadf naj ndnfksankfd nasdjasndajsn da sdnj ansd jandaa  akd aj a dnaj fn rsfndna  asdn ajns dakjsn dmarket meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy..."
                                newsReference="https://example.com/article"
                                variant="compact" 
                                width="100%" 
                                height="153px"
                            />

                            <NewsCard 
                                image="/src/assets/img/previews/preview-test.png"
                                title="Wall Street's 2025 stock market forecasts are falling..."
                                content="Monday's skdvnsja  kajdhsfhas hfbjkdfaskdf jas nfjs fs ndfkjna ehfadsfjanef unasdssdfjsk  ajsnf asfsjadf naj ndnfksankfd nasdjasndajsn da sdnj ansd jandaa  akd aj a dnaj fn rsfndna  asdn ajns dakjsn dmarket meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy..."
                                newsReference="https://example.com/article"
                                variant="compact" 
                                width="100%" 
                                height="153px"
                            />

                            <NewsCard 
                                image="/src/assets/img/previews/preview-test.png"
                                title="Wall Street's 2025 stock market forecasts are falling..."
                                content="Monday's skdvnsja  kajdhsfhas hfbjkdfaskdf jas nfjs fs ndfkjna ehfadsfjanef unasdssdfjsk  ajsnf asfsjadf naj ndnfksankfd nasdjasndajsn da sdnj ansd jandaa  akd aj a dnaj fn rsfndna  asdn ajns dakjsn dmarket meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy..."
                                newsReference="https://example.com/article"
                                variant="compact" 
                                width="100%" 
                                height="153px"
                            />

                        </div>

                    </div>

                    {/* Stock market News Section */}
                    <div className="news-page-section" id="stock-market-section">

                        <a className="section-title" id="stock-market-title">Stock Market News &gt;</a>

                        <div className="section-container">
                            
                            <NewsCard 
                                    image="/src/assets/img/previews/preview-test.png"
                                    title="Wall Street's 2025 stock market forecasts are falling..."
                                    content="Monday's skdvnsja  kajdhsfhas hfbjkdfaskdf jas nfjs fs ndfkjna ehfadsfjanef unasdssdfjsk  ajsnf asfsjadf naj ndnfksankfd nasdjasndajsn da sdnj ansd jandaa  akd aj a dnaj fn rsfndna  asdn ajns dakjsn dmarket meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy..."
                                    newsReference="https://example.com/article"
                                    variant="detailed" 
                                    width="100%" 
                                    height="auto"
                                />
                                
                                <NewsCard 
                                    image="/src/assets/img/previews/preview-test.png"
                                    title="Wall Street's 2025 stock market forecasts are falling..."
                                    content="Monday's skdvnsja  kajdhsfhas hfbjkdfaskdf jas nfjs fs ndfkjna ehfadsfjanef unasdssdfjsk  ajsnf asfsjadf naj ndnfksankfd nasdjasndajsn da sdnj ansd jandaa  akd aj a dnaj fn rsfndna  asdn ajns dakjsn dmarket meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy..."
                                    newsReference="https://example.com/article"
                                    variant="compact" 
                                    width="100%" 
                                    height="153px"
                                />

                                <NewsCard 
                                    image="/src/assets/img/previews/preview-test.png"
                                    title="Wall Street's 2025 stock market forecasts are falling..."
                                    content="Monday's skdvnsja  kajdhsfhas hfbjkdfaskdf jas nfjs fs ndfkjna ehfadsfjanef unasdssdfjsk  ajsnf asfsjadf naj ndnfksankfd nasdjasndajsn da sdnj ansd jandaa  akd aj a dnaj fn rsfndna  asdn ajns dakjsn dmarket meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy..."
                                    newsReference="https://example.com/article"
                                    variant="compact" 
                                    width="100%" 
                                    height="153px"
                                />

                                <NewsCard 
                                    image="/src/assets/img/previews/preview-test.png"
                                    title="Wall Street's 2025 stock market forecasts are falling..."
                                    content="Monday's skdvnsja  kajdhsfhas hfbjkdfaskdf jas nfjs fs ndfkjna ehfadsfjanef unasdssdfjsk  ajsnf asfsjadf naj ndnfksankfd nasdjasndajsn da sdnj ansd jandaa  akd aj a dnaj fn rsfndna  asdn ajns dakjsn dmarket meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy..."
                                    newsReference="https://example.com/article"
                                    variant="compact" 
                                    width="100%" 
                                    height="153px"
                                />

                            </div>

                        </div>

                    {/* Economic News Section */}
                    <div className="news-page-section" id="economic-market-section">
                        
                        <a className="section-title" id="economic-market-title">Economic News &gt;</a>

                        <div className="section-container">
                            
                            <NewsCard 
                                    image="/src/assets/img/previews/preview-test.png"
                                    title="Wall Street's 2025 stock market forecasts are falling..."
                                    content="Monday's skdvnsja  kajdhsfhas hfbjkdfaskdf jas nfjs fs ndfkjna ehfadsfjanef unasdssdfjsk  ajsnf asfsjadf naj ndnfksankfd nasdjasndajsn da sdnj ansd jandaa  akd aj a dnaj fn rsfndna  asdn ajns dakjsn dmarket meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy..."
                                    newsReference="https://example.com/article"
                                    variant="detailed" 
                                    width="100%" 
                                    height="auto"
                                />
                                
                                <NewsCard 
                                    image="/src/assets/img/previews/preview-test.png"
                                    title="Wall Street's 2025 stock market forecasts are falling..."
                                    content="Monday's skdvnsja  kajdhsfhas hfbjkdfaskdf jas nfjs fs ndfkjna ehfadsfjanef unasdssdfjsk  ajsnf asfsjadf naj ndnfksankfd nasdjasndajsn da sdnj ansd jandaa  akd aj a dnaj fn rsfndna  asdn ajns dakjsn dmarket meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy..."
                                    newsReference="https://example.com/article"
                                    variant="compact" 
                                    width="100%" 
                                    height="153px"
                                />

                                <NewsCard 
                                    image="/src/assets/img/previews/preview-test.png"
                                    title="Wall Street's 2025 stock market forecasts are falling..."
                                    content="Monday's skdvnsja  kajdhsfhas hfbjkdfaskdf jas nfjs fs ndfkjna ehfadsfjanef unasdssdfjsk  ajsnf asfsjadf naj ndnfksankfd nasdjasndajsn da sdnj ansd jandaa  akd aj a dnaj fn rsfndna  asdn ajns dakjsn dmarket meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy..."
                                    newsReference="https://example.com/article"
                                    variant="compact" 
                                    width="100%" 
                                    height="153px"
                                />

                                <NewsCard 
                                    image="/src/assets/img/previews/preview-test.png"
                                    title="Wall Street's 2025 stock market forecasts are falling..."
                                    content="Monday's skdvnsja  kajdhsfhas hfbjkdfaskdf jas nfjs fs ndfkjna ehfadsfjanef unasdssdfjsk  ajsnf asfsjadf naj ndnfksankfd nasdjasndajsn da sdnj ansd jandaa  akd aj a dnaj fn rsfndna  asdn ajns dakjsn dmarket meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy..."
                                    newsReference="https://example.com/article"
                                    variant="compact" 
                                    width="100%" 
                                    height="153px"
                                />

                            </div>

                    </div>

                    {/* All News Section */}
                    <div className="news-page-section" id="all-section">
                        
                        <a className="section-title" id="all-title">All News</a>

                        <div className="section-container">
                            
                                <NewsCard 
                                    image="/src/assets/img/previews/preview-test.png"
                                    title="Wall Street's 2025 stock market forecasts are falling..."
                                    content="Monday's skdvnsja  kajdhsfhas hfbjkdfaskdf jas nfjs fs ndfkjna ehfadsfjanef unasdssdfjsk  ajsnf asfsjadf naj ndnfksankfd nasdjasndajsn da sdnj ansd jandaa  akd aj a dnaj fn rsfndna  asdn ajns dakjsn dmarket meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy..."
                                    newsReference="https://example.com/article"
                                    variant="compact" 
                                    width="100%" 
                                    height="auto"
                                />
                                
                                <NewsCard 
                                    image="/src/assets/img/previews/preview-test.png"
                                    title="Wall Street's 2025 stock market forecasts are falling..."
                                    content="Monday's skdvnsja  kajdhsfhas hfbjkdfaskdf jas nfjs fs ndfkjna ehfadsfjanef unasdssdfjsk  ajsnf asfsjadf naj ndnfksankfd nasdjasndajsn da sdnj ansd jandaa  akd aj a dnaj fn rsfndna  asdn ajns dakjsn dmarket meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy..."
                                    newsReference="https://example.com/article"
                                    variant="compact" 
                                    width="100%" 
                                    height="153px"
                                />

                                <NewsCard 
                                    image="/src/assets/img/previews/preview-test.png"
                                    title="Wall Street's 2025 stock market forecasts are falling..."
                                    content="Monday's skdvnsja  kajdhsfhas hfbjkdfaskdf jas nfjs fs ndfkjna ehfadsfjanef unasdssdfjsk  ajsnf asfsjadf naj ndnfksankfd nasdjasndajsn da sdnj ansd jandaa  akd aj a dnaj fn rsfndna  asdn ajns dakjsn dmarket meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy..."
                                    newsReference="https://example.com/article"
                                    variant="compact" 
                                    width="100%" 
                                    height="153px"
                                />

                                <NewsCard 
                                    image="/src/assets/img/previews/preview-test.png"
                                    title="Wall Street's 2025 stock market forecasts are falling..."
                                    content="Monday's skdvnsja  kajdhsfhas hfbjkdfaskdf jas nfjs fs ndfkjna ehfadsfjanef unasdssdfjsk  ajsnf asfsjadf naj ndnfksankfd nasdjasndajsn da sdnj ansd jandaa  akd aj a dnaj fn rsfndna  asdn ajns dakjsn dmarket meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy..."
                                    newsReference="https://example.com/article"
                                    variant="compact" 
                                    width="100%" 
                                    height="153px"
                                />

                                <NewsCard 
                                    image="/src/assets/img/previews/preview-test.png"
                                    title="Wall Street's 2025 stock market forecasts are falling..."
                                    content="Monday's skdvnsja  kajdhsfhas hfbjkdfaskdf jas nfjs fs ndfkjna ehfadsfjanef unasdssdfjsk  ajsnf asfsjadf naj ndnfksankfd nasdjasndajsn da sdnj ansd jandaa  akd aj a dnaj fn rsfndna  asdn ajns dakjsn dmarket meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy..."
                                    newsReference="https://example.com/article"
                                    variant="compact" 
                                    width="100%" 
                                    height="auto"
                                />

                                <NewsCard 
                                    image="/src/assets/img/previews/preview-test.png"
                                    title="Wall Street's 2025 stock market forecasts are falling..."
                                    content="Monday's skdvnsja  kajdhsfhas hfbjkdfaskdf jas nfjs fs ndfkjna ehfadsfjanef unasdssdfjsk  ajsnf asfsjadf naj ndnfksankfd nasdjasndajsn da sdnj ansd jandaa  akd aj a dnaj fn rsfndna  asdn ajns dakjsn dmarket meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy..."
                                    newsReference="https://example.com/article"
                                    variant="compact" 
                                    width="100%" 
                                    height="auto"
                                />

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