import React, { useEffect, useState } from "react";
import "./FearAndGreed.css";

interface FearGreedData {
    index: number;
    classification: string;
}

const FearAndGreed: React.FC = () => {
    const [data, setData] = useState<FearGreedData | null>(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/fear-greed") // Connect to FastAPI backend
            .then((response) => response.json())
            .then((result) => setData(result))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (

        <div className="fear-greed-container">

            <div className="fng-box">
                {/* Fear & Greed Value */}
                <h2>
                    {data ? data.index : "20"}
                </h2>
                
                {/* Classification Label */}
                <h3>
                    {data ? data.classification : "Extreme Fear"}
                </h3>
            </div>  
            
        </div>
    
    );
};

export default FearAndGreed;
