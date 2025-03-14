import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"

import './NewsCard.css';

interface NewsCardProps {
    image: string;
    title: string;
    content: string;
    newsReference: string;
    width?: string;
    height?: string;
}


const NewsCard: React.FC<NewsCardProps> = ({ image, title, content, newsReference, width = "360px", height = "480px" }) => {

    return (
        
        <Card className="news-card" style={{ width, height }}>
        
            {/* Card Header */}
            <CardHeader className="news-card-header">
                <img src={image} alt={title} className="news-card-img" />
                <CardTitle className="news-card-title">{title}</CardTitle>
            </CardHeader>
        
            {/* Card Content */}
            <CardContent className="news-card-content">
                <CardDescription className="news-card-description">{content}</CardDescription>
            </CardContent>

            {/* Card Footer */}
            <CardFooter className="news-card-footer">
                <a href={newsReference}>More</a>
            </CardFooter>

        </Card>
    
);

}

export default NewsCard;