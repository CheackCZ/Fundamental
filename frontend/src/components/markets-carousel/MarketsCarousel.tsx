import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
  
  import MarketCard from "../market-card/MarketCard";
  
  import "./MarketsCarousel.css"; 
  
  const markets = [
      { name: "US Market", url: "https://example.com/us-market", icon: "https://example.com/icon.png" },
      { name: "EU Market", url: "https://example.com/eu-market", icon: "https://example.com/icon.png" },
      { name: "Asia Market", url: "https://example.com/asia-market", icon: "https://example.com/icon.png" },
      { name: "Crypto Market", url: "https://example.com/crypto-market", icon: "https://example.com/icon.png" },
      { name: "Commodities", url: "https://example.com/commodities", icon: "https://example.com/icon.png" },
      { name: "Energy Market", url: "https://example.com/energy-market", icon: "https://example.com/icon.png" },
      { name: "Bonds", url: "https://example.com/bonds", icon: "https://example.com/icon.png" },
      { name: "Futures", url: "https://example.com/futures", icon: "https://example.com/icon.png" },
      { name: "Forex", url: "https://example.com/forex", icon: "https://example.com/icon.png" },
      { name: "Tech Stocks", url: "https://example.com/tech-stocks", icon: "https://example.com/icon.png" }
  ];
  
  const MarketsCarousel: React.FC = () => {
      return (
          <div className="markets-carousel-wrapper">
              <Carousel className="relative w-full">
      
                  <CarouselContent className="-ml-1 flex">
                      {markets.map((market, index) => (
                          <CarouselItem key={index} className="pl-14 basis-1/5"> 
                              <div className="p-1">
                                  <MarketCard name={market.name} url={market.url} icon={market.icon} />
                              </div>
                          </CarouselItem>
                      ))}
                  </CarouselContent>
  
                  {/* Fix button positioning */}
                  <CarouselPrevious className="carousel-btn left-0" />
                  <CarouselNext className="carousel-btn right-0" />
      
              </Carousel>
          </div>
      );
  };
  
  export default MarketsCarousel;
  