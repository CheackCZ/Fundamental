import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import "./NewsCard.css";

interface NewsCardProps {
    image: string;
    title: string;
    content: string;
    newsReference: string;
    variant?: "default" | "compact" | "detailed";
    width?: string;
    height?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
    image,
    title,
    content,
    newsReference,
    variant = "default",
    width,
    height,
}) => {
    return (
        
        <Card
            className={`news-card ${variant === "detailed" ? "latest-news" : variant === "compact" ? "news-item" : "news-card-default"}`}
            style={{ width, height }}
        >
        
            {/* Card Header */}
            {variant === "compact" ? (
                <>
                    <img src={image} alt={title} className="news-item-img" />
                    <div className="news-item-texts">
                        <CardTitle className="news-item-title">{title}</CardTitle>
                        <p className="news-item-text">{content}</p>
                        <a href={newsReference}>More &gt;</a>
                    </div>
                </>
            ) : (
                <>
                    <CardHeader className="news-card-header">
                        <img src={image} alt={title} className="news-card-img" />
                        <CardTitle className="news-card-title">{title}</CardTitle>
                    </CardHeader>
                  
                    <CardContent className="news-card-content">
                        <p className="news-card-description">{content}</p>
                    </CardContent>
                  
                    <CardFooter className="news-card-footer">
                        <a href={newsReference}>More &gt;</a>
                    </CardFooter>
                </>
            )}

        </Card>
    
    );
};

export default NewsCard;