import React from "react";
import { Card } from "../ui/card";
import "./ImageCard.css";

interface ImageCardProps {
    title: string;
    image: string;
    width?: number;
    height?: number;
}

const ImageCard: React.FC<ImageCardProps> = ({ title, image , width = 265, height = 120}) => {
    
    return (
    
    <Card className="image-card" style={{ width, height }}>

            {/* Image container */}
            <div className="image-container" style={{ backgroundImage: `url(${image})` }}>
                <p className="card-text">{title}</p>
            </div>
        
        </Card>
    
    );

};

export default ImageCard;