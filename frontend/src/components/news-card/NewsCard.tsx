import React from "react";
import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";

import "./NewsCard.css";

interface NewsCardProps {
    id?:string,
    image?: string;
    title?: string;
    content?: string;
    newsReference?: string;
    variant?: "default" | "compact" | "detailed";
    width?: string;
    height?: string;
    loading?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({
    id = "",
    image = "",
    title = "",
    content = "",
    newsReference = "#",
    variant = "default",
    width,
    height,
    loading = false,
}) => {
    const baseClass =
        variant === "detailed"
            ? "latest-news"
            : variant === "compact"
            ? "news-item"
            : "news-card-default";

    return (
        <Card className={`news-card ${baseClass}`} style={{ width, height }}>
            {loading ? (
                <>
                    {variant === "compact" ? (
                        <>
                            <div className="skeleton-image skeleton-compact" />
                            <div className="news-item-texts">
                                <div className="skeleton-text short" />
                                <div className="skeleton-text long" />
                                <div className="skeleton-text long" />
                                <div className="skeleton-text long" />
                                <div className="skeleton-text long" />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="skeleton-image skeleton-detailed" />
                            <div className="skeleton-text-container">
                                <div className="skeleton-text short" />
                                <div className="skeleton-text long" />
                                <div className="skeleton-text long" />
                                <div className="skeleton-text long" />
                                <div className="skeleton-text long" />
                                <div className="skeleton-text link" />
                            </div>
                        </>
                    )}
                </>
            ) : variant === "compact" ? (
                <>
                    <img
                        src={image}
                        alt={title}
                        className="news-item-img"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "/src/assets/img/previews/image-preview.png";
                        }}
                    />
                    <div className="news-item-texts">
                        <CardTitle className="news-item-title">{title}</CardTitle>
                        <p className="news-item-text">{content}</p>
                        <Link to={`/news/article/${id}`}>More &gt;</Link>
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
                        <Link to={`/news/article/${id}`}>More &gt;</Link>
                    </CardFooter>
                </>
            )}
        </Card>
    );
};

export default NewsCard;
