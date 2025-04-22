import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

interface StockData {
    ticker: string;
    name: string;
    logo: string;
    price: number;
    changePercent: number;
    volume: string;
}

export default function StockCard({ stock, skeleton = false }: { stock?: StockData; skeleton?: boolean }) {
    const navigate = useNavigate();

    const isPositive = !skeleton && stock ? stock.changePercent >= 0 : true;

    return (
        <Card
            className={`flex items-center gap-4 p-4 ${skeleton ? "" : "cursor-pointer hover:bg-muted transition"}`}
            onClick={() => !skeleton && stock && navigate(`/stock/${stock.ticker}`)}
        >
            {skeleton || !stock ? (
                <Skeleton className="w-12 h-12 rounded-full" />
            ) : (
                <img
                    src={stock.logo}
                    alt={stock.name}
                    className="w-12 h-12 rounded-full"
                />
            )}

            <CardContent className="flex-1 p-0">
                {skeleton || !stock ? (
                    <>
                        <Skeleton className="h-4 w-3/4 mb-1" />
                        <Skeleton className="h-3 w-1/4" />
                    </>
                ) : (
                    <>
                        <h2 className="font-semibold text-lg">{stock.name}</h2>
                        <p className="text-sm text-muted-foreground">{stock.ticker}</p>
                    </>
                )}
            </CardContent>

            <div className="text-right text-sm">
                {skeleton || !stock ? (
                    <>
                        <Skeleton className="h-4 w-16 mb-1" />
                        <Skeleton className="h-3 w-12 mb-2" />
                        <Skeleton className="h-3 w-20 mb-1" />
                    </>
                ) : (
                    <>
                        <p className="font-medium text-base">${stock.price.toFixed(2)}</p>
                        <p className={isPositive ? "text-green-500" : "text-red-500"}>
                            {isPositive ? "+" : ""}
                            {stock.changePercent.toFixed(2)}%
                        </p>
                        <hr className="my-2 border-gray-200" />
                        <p className="text-muted-foreground">Volume: {stock.volume}</p>
                    </>
                )}
            </div>
        </Card>
    );
}
