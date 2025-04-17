import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Chart from "@/components/chart/Chart"
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
// @ts-ignore
import Command from "@/components/command/Command"; 

import LoggedInNavbar from "@/components/logged-in-navbar/LoggedInNavbar";
import IncomeStatement from "@/components/financials/income-statement/IncomeStatement";
import BalanceSheet from "@/components/financials/balance-sheet/BalanceSheet";
import CashFlowStatement from "@/components/financials/cashflow-statement/CashFlowStatement";
import NewsCard from "@/components/news-card/NewsCard";
import Footer from "@/components/footer/Footer";

import './Stock.css'


const Stock = () => {
    const { ticker } = useParams();
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

        <div className="stock-content">

            {/* Header */}
            <header>
                <LoggedInNavbar toggleCommand={toggleCommand}/>
            </header>
            
            {/* Main */}
            <main className="stock-main">

                {/* Command Component (Search) - Opened from Navbar */}
                {isCommandOpen && <Command isVisible={isCommandOpen} onClose={() => setIsCommandOpen(false)} />}

                <div className="stock-container">

                    <div className="stock-legend">

                        <img className="stock-logo" src="/src/assets/img/apple-logo.png" alt="AAPL Logo" />

                        <div className="stock-texts">
                            <h2 className="ticker">{ticker}</h2>
                            <p className="stock-name">Apple Inc.</p>
                        </div>
                        
                        <div className="price-container">
                            <h3 className="price">$156.12</h3>
                        </div>
                    </div>

                    <Chart />

                </div>


                <div className="stock-info-container">
                    <h3>Company Description</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus placeat odio, nesciunt nobis dolorem distinctio pariatur magnam a veritatis? Ducimus, illum ab aut iste accusantium a laudantium placeat nulla deleniti.</p>
                </div>


                <div className="stock-multiples">
                    <h3>Stock valuations</h3>

                    <div className="stock-valuations">
                        <div className="company-data">

                            <div className="value-data">
                                <p>Market cap: </p>
                                <span>$3.4B</span>
                            </div>

                            <div className="value-data">
                                <p>Revenues: </p>
                                <span>$391.4M</span>
                            </div>

                            <div className="value-data">
                                <p>P/E: </p>
                                <span>20.42</span>
                            </div>

                        </div>

                        <div className="stock-data">
                            
                            <div className="value-data">
                                <p>EPS: </p>
                                <span>$22.12</span>
                            </div>

                            <div className="value-data">
                                <p>BETA: </p>
                                <span>1.01</span>
                            </div>

                            <div className="value-data">
                                <p>Dividend yield: </p>
                                <span>3.04%</span>
                            </div>
                        </div>
                    </div>
                    
                </div>


                <div className="stock-financials">

                    <h3>Stock Financials</h3>

                    <Tabs defaultValue="income" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="income">Income Statement</TabsTrigger>
                            <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
                            <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
                        </TabsList>
        
                        <TabsContent value="income">
                            <IncomeStatement />
                        </TabsContent>
            
                        <TabsContent value="balance">
                            <BalanceSheet />
                        </TabsContent>
                
                        <TabsContent value="cashflow">
                            <CashFlowStatement />
                        </TabsContent>
                    </Tabs>

                </div>


                <div className="stock-related-news">
                    <h3>Company Related News</h3>

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

            </main>

            <footer>
                <Footer />
            </footer>

        </div>
    
    );
};

export default Stock;