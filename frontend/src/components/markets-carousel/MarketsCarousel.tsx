import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import StockCardMini from "../stock-card/StockCardMini";
import { useEffect, useState } from "react";

interface StockData {
    ticker: string;
    name: string;
    logo: string;
    price: number;
    changePercent: number;
    volume: string;
}

const StocksCarousel: React.FC = () => {
    const [stocks, setStocks] = useState<StockData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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
                console.error("Failed to load hottest stocks", err);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const renderItems = isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                  key={index}
                  className="pl-4 basis-1/3 md:basis-1/4 xl:basis-1/5"
              >
                  <div className="p-2">
                      <StockCardMini loading />
                  </div>
              </CarouselItem>
          ))
        : stocks.map((stock, index) => (
              <CarouselItem
                  key={index}
                  className="pl-4 basis-1/3 md:basis-1/4 xl:basis-1/5"
              >
                  <div className="p-2">
                      <StockCardMini stock={stock} />
                  </div>
              </CarouselItem>
          ));

    return (
        <div className="hottest-stocks-carousel-wrapper">
            <Carousel className="relative w-full">
                <CarouselContent className="-ml-1 flex">{renderItems}</CarouselContent>
                <CarouselPrevious className="carousel-btn left-0" />
                <CarouselNext className="carousel-btn right-0" />
            </Carousel>
        </div>
    );
};

export default StocksCarousel;
