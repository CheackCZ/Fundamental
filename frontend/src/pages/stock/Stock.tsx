import { useState, useEffect, useCallback } from "react";
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

type FinancialStatement = Record<string, Record<string, number | null>>;

const Stock = () => {
    const { ticker } = useParams();
    const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);

    const [info, setInfo] = useState<any>(null);
    const [chartData, setChartData] = useState<any[]>([]);
    const [valuations, setValuations] = useState<any>(null);
    const [financials, setFinancials] = useState<{
        income: FinancialStatement | null;
        balance: FinancialStatement | null;
        cashflow: FinancialStatement | null;
    }>({
        income: null,
        balance: null,
        cashflow: null,
    });
    const [relatedNews, setRelatedNews] = useState<any[]>([]);

    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    infoRes,
                    chartRes,
                    incomeRes,
                    balanceRes,
                    cashflowRes,
                    valuationsRes,
                    logoRes
                ] = await Promise.all([
                    fetch(`http://localhost:8000/api/stock/${ticker}/info`).then(res => res.json()),
                    fetch(`http://localhost:8000/api/stock/${ticker}/history/1m`).then(res => res.json()),
                    fetch(`http://localhost:8000/api/stock/${ticker}/financials/income`).then(res => res.json()),
                    fetch(`http://localhost:8000/api/stock/${ticker}/financials/balance`).then(res => res.json()),
                    fetch(`http://localhost:8000/api/stock/${ticker}/financials/cashflow`).then(res => res.json()),
                    fetch(`http://localhost:8000/api/stock/${ticker}/valuations`).then(res => res.json()),
                    fetch(`http://localhost:8000/api/stock/${ticker}/logo`).then(res => res.json())
                ]);
                

                setInfo({ ...infoRes, logo_url: logoRes.logo_url });
                setChartData(chartRes.chart_data);
                setFinancials({
                    income: incomeRes,
                    balance: balanceRes,
                    cashflow: cashflowRes,
                });
                setValuations(valuationsRes);

                const relatedNewsRes = await fetch(`http://localhost:8000/api/news/ticker/${ticker}`).then(res => res.json());
                setRelatedNews(relatedNewsRes.articles);
            } catch (err) {
                console.error("Error fetching stock data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (ticker) fetchData();
    }, [ticker]);

    const handleTimeRangeChange = useCallback(async (range: string) => {
        try {
            const res = await fetch(`http://localhost:8000/api/stock/${ticker}/history/${range}`);
            const data = await res.json();

            setChartData(data.chart_data);
        } catch (err) {
            console.error("Error fetching chart data:", err);
        }
    }, [ticker]);

    return (
        <div className="stock-content">
            <header>
                <LoggedInNavbar toggleCommand={toggleCommand} />
            </header>

            <main className="stock-main">
                {isCommandOpen && <Command isVisible={isCommandOpen} onClose={() => setIsCommandOpen(false)} />}

                <div className="stock-container">
                    <div className="stock-legend">
                        {isLoading ? (
                            <Skeleton className="stock-logo" />
                        ) : (
                            <img
                                className="stock-logo"
                                src={info?.logo_url || "/src/assets/img/apple-logo.png"}
                                alt={`${ticker} Logo`}
                            />
                        )}

                        <div className="stock-texts">
                            {isLoading ? (
                                <>
                                    <Skeleton className="w-[100px] h-[32px]" />
                                    <Skeleton className="w-[120px] h-[20px]" />
                                </>
                            ) : (
                                <>
                                    <h2 className="ticker">{ticker}</h2>
                                    <p className="stock-name">{info?.name}</p>
                                </>
                            )}
                        </div>

                        <div className="price-container">
                            {isLoading ? (
                                <Skeleton className="w-[80px] h-[32px] ml-auto" />
                            ) : (
                                <h3 className="price">${info?.current_price}</h3>
                            )}
                        </div>
                    </div>

                    {isLoading ? (
                            <Skeleton className="w-full h-[256px]" />
                        ) : (
                            <Chart data={chartData} onTimeRangeChange={handleTimeRangeChange} />
                        )}

                </div>

                <div className="stock-info-container">
                    <h3>Company Description</h3>
                    {isLoading ? (
                        <Skeleton className="w-full h-[80px]" />
                    ) : (
                        <p>{info?.description}</p>
                    )}
                </div>

                <div className="stock-multiples">
                    <h3>Stock valuations</h3>
                    <div className="stock-valuations">
                        <div className="company-data">
                            {isLoading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <Skeleton key={i} className="w-full h-[20px]" />
                                ))
                            ) : (
                                <>
                                    <div className="value-data">
                                        <p>Market cap: </p>
                                        <span>
                                            {valuations?.market_cap
                                                ? `$${(valuations.market_cap / 1e9)
                                                    .toFixed(1)
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}B`
                                                : "—"}
                                        </span>
                                    </div>
                                    <div className="value-data">
                                        <p>P/E: </p>
                                        <span>
                                            {valuations?.pe_ratio !== undefined
                                                ? valuations.pe_ratio.toFixed(2)
                                                : "—"}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="stock-data">
                            {isLoading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <Skeleton key={i} className="w-full h-[20px]" />
                                ))
                            ) : (
                                <>
                                    <div className="value-data">
                                        <p>EPS: </p>
                                        <span>
                                            {valuations?.eps !== undefined
                                                ? `$${valuations.eps.toFixed(2)}`
                                                : "—"}
                                        </span>
                                    </div>
                                    <div className="value-data">
                                        <p>BETA: </p>
                                        <span>
                                            {valuations?.beta !== undefined
                                                ? valuations.beta.toFixed(2)
                                                : "—"}
                                        </span>
                                    </div>
                                    <div className="value-data">
                                        <p>Dividend yield: </p>
                                        <span>
                                            {valuations?.dividend_yield !== undefined
                                                ? `${valuations.dividend_yield.toFixed(2)}%`
                                                : "—"}
                                        </span>
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
                            <TabsTrigger value="income" className="data-[state=inactive]:bg-gray-200 data-[state=active]:text-black data-[state=active]:bg-white">Income Statement</TabsTrigger>
                            <TabsTrigger value="balance" className="data-[state=inactive]:bg-gray-200 data-[state=active]:text-black data-[state=active]:bg-white">Balance Sheet</TabsTrigger>
                            <TabsTrigger value="cashflow" className="data-[state=inactive]:bg-gray-200 data-[state=active]:text-black data-[state=active]:bg-white">Cash Flow</TabsTrigger>
                        </TabsList>

                        <TabsContent value="income">
                            {isLoading || !financials.income ? (
                                <Skeleton className="w-full h-[128px]" />
                            ) : (
                                <IncomeStatement data={financials.income} />
                            )}
                        </TabsContent>
                        <TabsContent value="balance">
                            {isLoading || !financials.balance ? (
                                <Skeleton className="w-full h-[128px]" />
                            ) : (
                                <BalanceSheet data={financials.balance} />
                            )}
                        </TabsContent>
                        <TabsContent value="cashflow">
                            {isLoading || !financials.cashflow ? (
                                <Skeleton className="w-full h-[128px]" />
                            ) : (
                                <CashFlowStatement data={financials.cashflow} />
                            )}
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="stock-related-news">
                    <h3>Company Related News</h3>
                    <div className="section-container grid gap-4">
                        {isLoading
                            ? Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton key={i} className="w-full h-[153px]" />
                            ))
                            : relatedNews.slice(0, 4).map((article, i) => (
                                <NewsCard
                                    key={article.id}
                                    id={article.id}
                                    image={article.image_url || "/src/assets/img/previews/preview-test.png"}
                                    title={article.title}
                                    content={article.description || article.content || "No summary available."}
                                    newsReference={article.url}
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
