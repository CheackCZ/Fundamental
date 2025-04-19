import React from "react";

import { Card } from "../ui/card";

import "./ImageCard.css";

interface ImageCardProps {
    title: string;
    image: string;
    url: string;
    width?: number;
    height?: number;
}

const ImageCard: React.FC<ImageCardProps> = ({ title, image, url, width = 265, height = 120 }) => {
    return (
        <Card
            className="image-card"
            style={{ width, height }}
            onClick={() => (window.location.href = url)}
        >
            {/* Image container */}
            <div className="photo-container" style={{ backgroundImage: `url(${image})` }}>
                <p className="card-text">{title}</p>
            </div>
        </Card>
    );
};

export default ImageCard;