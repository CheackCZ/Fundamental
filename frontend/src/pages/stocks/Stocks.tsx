import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

import StockCard from "@/components/stock-card/StockCard";
import LoggedInNavbar from "@/components/logged-in-navbar/LoggedInNavbar";
// @ts-ignore
import Command from "@/components/command/Command"; 
import Footer from "@/components/footer/Footer";

import './Stocks.css'


interface StockData {
    ticker: string;
    name: string;
    logo: string;
    price: number;
    changePercent: number;
}

const mockTopStocks: StockData[] = [
    {
        ticker: "AAPL",
        name: "Apple Inc.",
        logo: "https://logo.clearbit.com/apple.com",
        price: 172.35,
        changePercent: 1.23,
    },
    {
        ticker: "MSFT",
        name: "Microsoft Corp.",
        logo: "https://logo.clearbit.com/microsoft.com",
        price: 315.12,
        changePercent: -0.45,
    },
    {
        ticker: "MSFT",
        name: "Microsoft Corp.",
        logo: "https://logo.clearbit.com/microsoft.com",
        price: 315.12,
        changePercent: -0.45,
    },
    {
        ticker: "MSFT",
        name: "Microsoft Corp.",
        logo: "https://logo.clearbit.com/microsoft.com",
        price: 315.12,
        changePercent: -0.45,
    },
    {
        ticker: "MSFT",
        name: "Microsoft Corp.",
        logo: "https://logo.clearbit.com/microsoft.com",
        price: 315.12,
        changePercent: -0.45,
    },
    {
        ticker: "MSFT",
        name: "Microsoft Corp.",
        logo: "https://logo.clearbit.com/microsoft.com",
        price: 315.12,
        changePercent: -0.45,
    },
    {
        ticker: "MSFT",
        name: "Microsoft Corp.",
        logo: "https://logo.clearbit.com/microsoft.com",
        price: 315.12,
        changePercent: -0.45,
    },
    {
        ticker: "MSFT",
        name: "Microsoft Corp.",
        logo: "https://logo.clearbit.com/microsoft.com",
        price: 315.12,
        changePercent: -0.45,
    },
    {
        ticker: "MSFT",
        name: "Microsoft Corp.",
        logo: "https://logo.clearbit.com/microsoft.com",
        price: 315.12,
        changePercent: -0.45,
    },
    {
        ticker: "MSFT",
        name: "Microsoft Corp.",
        logo: "https://logo.clearbit.com/microsoft.com",
        price: 315.12,
        changePercent: -0.45,
    },
];

export default function Stocks() {
    const [search, setSearch] = useState("");
    const [stocks, setStocks] = useState<StockData[]>([]);

    useEffect(() => {
        setStocks(mockTopStocks);
    }, []);

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

        <div className="stocks-content">

            {/* Header */}
            <header>
                <LoggedInNavbar toggleCommand={toggleCommand}/>
            </header>
        
            {/* Main */}
            <main>
                
                {/* Command Component (Search) - Opened from Navbar */}
                {isCommandOpen && <Command isVisible={isCommandOpen} onClose={() => setIsCommandOpen(false)} />}

                <div className="stocks-container">
                    <h1 className="text-3xl font-bold mb-6">Stocks</h1>
                    <Input
                        placeholder="Search ticker..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="mb-6 max-w-md"
                    />
                    
                    <h3>Hottest Stocks</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                        {stocks
                            .filter((stock) =>
                                stock.ticker
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            )
                            .map((stock) => (
                                <StockCard key={stock.ticker} stock={stock} />
                            ))}
                    </div>
                </div>
            </main>

            <footer>
                <Footer></Footer>
            </footer>

        </div>
       
    );
}
