import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

import StockCard from "@/components/stock-card/StockCard";
import LoggedInNavbar from "@/components/logged-in-navbar/LoggedInNavbar";
// @ts-ignore
import Command from "@/components/command/Command";
import Footer from "@/components/footer/Footer";

import './Stocks.css';

interface StockData {
    ticker: string;
    name: string;
    logo: string;
    price: number;
    changePercent: number;
    volume: string; // ✅ Add volume field
}

export default function Stocks() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [stocks, setStocks] = useState<StockData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);

    useEffect(() => {
        fetch("http://localhost:8000/api/stocks/top")
            .then((res) => res.json())
            .then((data) => {
                const enriched = data.map((stock: any) => ({
                    ...stock,
                    logo: `https://logo.clearbit.com/${stock.name
                        .split(" ")[0]
                        .toLowerCase()}.com`,
                }));
                setStocks(enriched);
            })
            .catch((err) => {
                console.error("Failed to load top stocks", err);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const toggleCommand = () => setIsCommandOpen((prev) => !prev);

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

    const filtered = stocks.filter((stock) =>
        stock.ticker.toLowerCase().includes(search.toLowerCase())
    );

    const [suggestions, setSuggestions] = useState<StockData[]>([]);
    useEffect(() => {
        if (search.length < 1) return setSuggestions([]);
    
        const delayDebounce = setTimeout(() => {
            fetch(`http://localhost:8000/api/stocks/search?query=${search}`)
                .then((res) => res.json())
                .then((data) => setSuggestions(data))
                .catch(() => setSuggestions([]));
        }, 300); 
    
        return () => clearTimeout(delayDebounce);
    }, [search]);
    


    return (
        <div className="stocks-content">
            <header>
                <LoggedInNavbar toggleCommand={toggleCommand} />
            </header>

            <main>
                {isCommandOpen && (
                    <Command
                        isVisible={isCommandOpen}
                        onClose={() => setIsCommandOpen(false)}
                    />
                )}

                <div className="stocks-container">
                    <h1 className="text-3xl font-bold mb-6">Stocks</h1>
                    <div className="relative mb-6 max-w-md">
                        <Input
                            placeholder="Search ticker..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full"
                        />
                        {suggestions.length > 0 && (
                            <ul className="absolute top-full mt-1 w-full border rounded bg-white shadow-md z-10 max-h-60 overflow-y-auto">
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


                    <h3>Hottest Stocks</h3>

                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                            {stocks.map((stock) => (
                                <StockCard key={stock.ticker} stock={stock} />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}