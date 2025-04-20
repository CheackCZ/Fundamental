import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Chart from "@/components/chart/Chart";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
// @ts-ignore
import Command from "@/components/command/Command";

import LoggedInNavbar from "@/components/logged-in-navbar/LoggedInNavbar";
import IncomeStatement from "@/components/financials/income-statement/IncomeStatement";
import BalanceSheet from "@/components/financials/balance-sheet/BalanceSheet";
import CashFlowStatement from "@/components/financials/cashflow-statement/CashFlowStatement";
import NewsCard from "@/components/news-card/NewsCard";
import Footer from "@/components/footer/Footer";

import { Skeleton } from "@/components/ui/skeleton";
import "./Stock.css";

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

    const skeleton = true;

    return (
        <div className="stock-content">
            <header>
                <LoggedInNavbar toggleCommand={toggleCommand} />
            </header>

            <main className="stock-main">
                {isCommandOpen && <Command isVisible={isCommandOpen} onClose={() => setIsCommandOpen(false)} />}

                <div className="stock-container">
                    <div className="stock-legend">
                        {skeleton ? (
                            <Skeleton className="stock-logo" />
                        ) : (
                            <img className="stock-logo" src="/src/assets/img/apple-logo.png" alt="AAPL Logo" />
                        )}

                        <div className="stock-texts">
                            {skeleton ? (
                                <>
                                    <Skeleton className="w-[100px] h-[32px]" />
                                    <Skeleton className="w-[120px] h-[20px]" />
                                </>
                            ) : (
                                <>
                                    <h2 className="ticker">{ticker}</h2>
                                    <p className="stock-name">Apple Inc.</p>
                                </>
                            )}
                        </div>

                        <div className="price-container">
                            {skeleton ? (
                                <Skeleton className="w-[80px] h-[32px] ml-auto" />
                            ) : (
                                <h3 className="price">$156.12</h3>
                            )}
                        </div>
                    </div>

                    {skeleton ? <Skeleton className="w-full h-[256px]" /> : <Chart />}
                </div>

                <div className="stock-info-container">
                    <h3>Company Description</h3>
                    {skeleton ? (
                        <Skeleton className="w-full h-[80px]" />
                    ) : (
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus placeat odio, nesciunt
                            nobis dolorem...
                        </p>
                    )}
                </div>

                <div className="stock-multiples">
                    <h3>Stock valuations</h3>
                    <div className="stock-valuations">
                        <div className="company-data">
                            {skeleton ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <Skeleton key={i} className="w-full h-[20px]" />
                                ))
                            ) : (
                                <>
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
                                </>
                            )}
                        </div>
                        <div className="stock-data">
                            {skeleton ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <Skeleton key={i} className="w-full h-[20px]" />
                                ))
                            ) : (
                                <>
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
                                </>
                            )}
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
                            {skeleton ? <Skeleton className="w-full h-[128px]" /> : <IncomeStatement />}
                        </TabsContent>
                        <TabsContent value="balance">
                            {skeleton ? <Skeleton className="w-full h-[128px]" /> : <BalanceSheet />}
                        </TabsContent>
                        <TabsContent value="cashflow">
                            {skeleton ? <Skeleton className="w-full h-[128px]" /> : <CashFlowStatement />}
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="stock-related-news">
                    <h3>Company Related News</h3>
                    <div className="section-container grid gap-4">
                        {skeleton
                            ? Array.from({ length: 4 }).map((_, i) => (
                                  <Skeleton key={i} className="w-full h-[153px]" />
                              ))
                            : [0, 1, 2, 3].map((i) => (
                                  <NewsCard
                                      key={i}
                                      image="/src/assets/img/previews/preview-test.png"
                                      title="Wall Street's 2025 stock market forecasts are falling..."
                                      content="Monday's market meltdown coincided with a major shift in how Wall Street is thinking about the health of the US economy..."
                                      newsReference="https://example.com/article"
                                      variant={i === 0 ? "detailed" : "compact"}
                                      width="100%"
                                      height={i === 3 ? "153px" : "auto"}
                                  />
                              ))}
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
