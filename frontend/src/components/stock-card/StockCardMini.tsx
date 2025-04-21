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

export default function StockCardMini({
    stock,
    loading = false,
}: {
    stock?: StockData;
    loading?: boolean;
}) {
    const navigate = useNavigate();

    if (loading) {
        return (
            <Card className="flex flex-col items-center text-center p-4 gap-2 animate-pulse">
                <div className="w-10 h-10 bg-muted rounded-full" />
                <CardContent className="p-0 space-y-1">
                    <div className="w-24 h-4 bg-muted rounded" />
                    <div className="w-16 h-3 bg-muted rounded" />
                </CardContent>
            </Card>
        );
    }

    if (!stock) return null;

    return (
        <Card
            className="flex flex-col items-center text-center p-4 gap-2 cursor-pointer hover:bg-muted transition"
            onClick={() => navigate(`/stock/${stock.ticker}`)}
        >
            <img
                src={stock.logo}
                alt={stock.name}
                className="w-10 h-10 rounded-full"
            />
            <CardContent className="p-0">
                <h2 className="text-sm font-medium truncate w-24">
                    {stock.name}
                </h2>
                <p className="text-xs text-muted-foreground">{stock.ticker}</p>
            </CardContent>
        </Card>
    );
}