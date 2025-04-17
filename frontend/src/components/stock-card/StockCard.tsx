import { Card, CardContent } from "@/components/ui/card";

interface StockData {
    ticker: string;
    name: string;
    logo: string;
    price: number;
    changePercent: number;
}

export default function StockCard({ stock }: { stock: StockData }) {
    const isPositive = stock.changePercent >= 0;

    return (
    
        <Card className="flex items-center gap-4 p-4 cursor-pointer">
        
            <img
                src={stock.logo}
                alt={stock.name}
                className="w-12 h-12 rounded-full"
            />
          
            <CardContent className="flex-1 p-0">
                <h2 className="font-semibold text-lg">{stock.name}</h2>
                <p className="text-sm text-muted-foreground">{stock.ticker}</p>
            </CardContent>
          
            <div className="text-right">
                <p className="font-medium text-base">
                    ${stock.price.toFixed(2)}
                </p>
          
                <p className={isPositive ? "text-green-500" : "text-red-500"}>
                    {isPositive ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                </p>
            </div>
        
        </Card>
    );
}