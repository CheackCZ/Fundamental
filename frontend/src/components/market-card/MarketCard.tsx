import React from "react";

import "./MarketCard.css"; 

interface MarketCardProps {
    name: string;
    url: string;
    icon?: string;
}

const MarketCard: React.FC<MarketCardProps> = ({ name, url, icon }) => {
    return (

        <a href={url} className="market-card">
            {icon && <img src={icon} alt={`${name} icon`} className="market-icon" />}
            <span className="market-name">{name}</span>
        </a>
    
    );
};

export default MarketCard;