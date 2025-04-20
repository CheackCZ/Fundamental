import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import LoggedInNavbar from "@/components/logged-in-navbar/LoggedInNavbar";
import NewsCard from "@/components/news-card/NewsCard";
// @ts-ignore
import Command from "@/components/command/Command"; 
import Footer from "@/components/footer/Footer";

import './Article.css';

interface NewsArticle {
    id: string;
    title: string;
    description?: string;
    url: string;
    published_at: string;
    source?: string;
    image_url?: string;
    content?: string;
}

const Article = () => {
    const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
    const [article, setArticle] = useState<NewsArticle | null>(null);
    const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);

    const { id } = useParams();

    const toggleCommand = () => {
        setIsCommandOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === "j") {
                event.preventDefault();
                toggleCommand();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (!id) return;
        fetch(`http://127.0.0.1:8000/api/news/article/${id}`)
            .then(res => res.json())
            .then(data => setArticle(data))
            .catch(err => console.error("Failed to load article:", err));
    }, [id]);

    useEffect(() => {
        if (!article?.title) return;
        const encodedTitle = encodeURIComponent(article.title);
        fetch(`http://127.0.0.1:8000/api/news/related?title=${encodedTitle}`)
            .then(res => res.json())
            .then(data => setRelatedArticles(data))
            .catch(err => console.error("Failed to fetch related articles:", err));
    }, [article]);

    if (!article) return <p></p>;

    return (
        <div className="article-content">
            {/* Header */}
            <header>
                <LoggedInNavbar toggleCommand={toggleCommand} />
            </header>

            {/* Main */}
            <main>
                {isCommandOpen && (
                    <Command isVisible={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
                )}

                <div className="article-container">
                    <div className="article-main-content">
                        <div className="article-preview-container">
                            <h1>{article.title}</h1>
                            <img
                                src={article.image_url || "/src/assets/img/previews/image-preview.png"}
                                alt="News-prev-image"
                            />
                            <div className="sources-container">
                                <p className="source">Source: {article.source}</p>
                                <p className="datetime">{new Date(article.published_at).toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="article-text-container">
                            {article.content ? (
                                article.content.split("\n").map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))
                            ) : (
                                <p>⚠️ Article content could not be displayed.</p>
                            )}
                        </div>
                    </div>

                    <div className="related-news-container">
                        <h2 className="related-news-title">Related News</h2>
                        {relatedArticles.length === 0 ? (
                            <p>No related articles found.</p>
                        ) : (
                            relatedArticles.map((news) => (
                                <NewsCard
                                    id={news.id}
                                    key={news.id}
                                    image={news.image_url || "/src/assets/img/previews/image-preview.png"}
                                    title={news.title}
                                    content={news.description || news.content?.slice(0, 100) + "..."}
                                    newsReference={news.url}
                                    variant="compact"
                                    width="100%"
                                    height="153px"
                                />
                            ))
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Article;