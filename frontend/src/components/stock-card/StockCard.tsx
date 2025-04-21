import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface StockData {
    ticker: string;
    name: string;
    logo: string;
    price: number;
    changePercent: number;
    volume: string;
}

export default function StockCard({ stock }: { stock: StockData }) {
    const isPositive = stock.changePercent >= 0;
    const navigate = useNavigate();

    return (
        <Card
            className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted transition"
            onClick={() => navigate(`/stock/${stock.ticker}`)} 
        >
            <img
                src={stock.logo}
                alt={stock.name}
                className="w-12 h-12 rounded-full"
            />

            <CardContent className="flex-1 p-0">
                <h2 className="font-semibold text-lg">{stock.name}</h2>
                <p className="text-sm text-muted-foreground">{stock.ticker}</p>
            </CardContent>

            <div className="text-right text-sm">
                <p className="font-medium text-base">${stock.price.toFixed(2)}</p>
                <p className={isPositive ? "text-green-500" : "text-red-500"}>
                    {isPositive ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                </p>
                <hr className="my-2 border-gray-200" />
                <p className="text-muted-foreground">Volume: {stock.volume}</p>
            </div>
        </Card>
    );
}
