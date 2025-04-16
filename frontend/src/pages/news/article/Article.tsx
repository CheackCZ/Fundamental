import { useState, useEffect } from "react";

import LoggedInNavbar from "@/components/logged-in-navbar/LoggedInNavbar";
import NewsCard from "@/components/news-card/NewsCard";
import Footer from "@/components/footer/Footer";

import './Article.css';

import previewImage from "@/assets/img/previews/preview-test.png";

const Article = () => {
    const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
        
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

    
    const relatedNews = [
        {
            id: 1,
            image: "/src/assets/img/previews/preview-test.png",
            title: "Tech stocks drop amid AI regulations",
            content: "The AI industry is facing regulatory changes that could impact major players...",
            newsReference: "https://example.com/article"
        },
        {
            id: 2,
            image: "/src/assets/img/previews/preview-test.png",
            title: "Global oil prices surge as supply chains struggle",
            content: "Oil prices have seen a significant rise following disruptions in key supply chains...",
            newsReference: "https://example.com/article"
        },
        {
            id: 3,
            image: "/src/assets/img/previews/preview-test.png",
            title: "Crypto markets face turbulence amid economic uncertainty",
            content: "Bitcoin and Ethereum dropped by 8% as investors respond to economic policy shifts...",
            newsReference: "https://example.com/article"
        }
    ];

    return (

        <div className="article-content">

            {/* Header */}
            <header>
                <LoggedInNavbar toggleCommand={toggleCommand}/>
            </header>
            
            {/* Main */}
            <main>

                <div className="article-container">

                    <div className="article-main-content">

                        <div className="article-preview-container">
                            
                            <h1>Wall Street's 2025 stock market forecasts are falling ...</h1>

                            <img src={previewImage} alt="News-prev-image" />

                            <div className="sources-container">
                                <p className="source">Source: Reuters</p>
                                <p className="datetime">Thu, March 13, 2025 at 11:17 AM GMT+1</p>
                            </div>
                           
                        </div>
                        

                        <div className="article-text-container">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam maximus posuere neque, sed egestas est aliquet non. Nunc tortor libero, vestibulum non 
                                finibus eu, egestas eu purus. Aenean molestie at lorem sed auctor. Vivamus in egestas orci. Suspendisse egestas semper nunc in maximus. Suspendisse 
                                potenti. In congue diam a suscipit semper. Nulla facilisi. Curabitur quis vehicula nibh, id tristique velit. Suspendisse tincidunt vehicula velit 
                                quis congue. Sed et metus ultrices, tincidunt velit sed, ultrices tellus.</p>

                            <p>Praesent ac pretium mauris. Aenean fringilla dapibus diam, non sodales arcu varius ac. Cras eu mollis turpis. Aliquam in lectus ligula. Vivamus turpis 
                                sem, tempus a interdum eu, dictum eget mi. Vestibulum ac convallis velit, ac suscipit est. Vivamus tempus arcu quis lorem efficitur egestas. Quisque 
                                at velit et magna fermentum posuere sed et dolor. Pellentesque id venenatis lectus. Suspendisse at turpis erat. Aenean laoreet vulputate nisi, vel 
                                finibus quam vehicula quis. Suspendisse eu diam vel erat hendrerit bibendum eu ut arcu. Aliquam eleifend urna neque, a vulputate erat viverra nec.</p>

                            <p>Ut sodales imperdiet maximus. Ut cursus ex orci, id laoreet metus pretium vitae. Mauris vehicula rutrum leo, sed congue sem consequat in. Vestibulum 
                                faucibus lorem nunc, id vehicula felis interdum sed. Curabitur ut sem pulvinar sem laoreet condimentum. In finibus auctor ligula eget dictum. Duis nec 
                                finibus libero, ut posuere ipsum. Duis tempus libero at sem efficitur, sed ultrices nisi ultrices. Orci varius natoque penatibus et magnis dis parturient 
                                montes, nascetur ridiculus mus. Nulla vitae pulvinar nibh. Sed commodo auctor diam, tincidunt consectetur turpis elementum ut. Sed in iaculis quam. 
                                Aliquam erat volutpat. Nulla venenatis tellus vel nisi imperdiet, vel cursus lacus maximus. Integer non luctus tortor. Phasellus vulputate gravida 
                                consectetur.</p>

                            <p>Nullam vulputate vitae tortor vitae laoreet. Maecenas pharetra eros nisi, ut finibus diam semper nec. Nunc sit amet sem sed tellus dapibus dapibus. 
                                Etiam hendrerit, enim in fermentum scelerisque, nulla nunc convallis ante, eget ultrices orci ligula sed erat. Sed iaculis magna vel mauris gravida 
                                pharetra. Etiam fermentum orci enim, at tristique tellus bibendum in. Proin vel arcu non nisl imperdiet mattis non vitae tellus. Morbi ut justo sed 
                                risus porta consectetur ut non dolor. Nunc ultricies, erat et placerat finibus, leo tortor ornare felis, vel fringilla dolor diam eu odio. Praesent et 
                                lacus tempus, tincidunt arcu ut, mattis elit. Donec sit amet ex vel dui tristique aliquet non quis arcu. Vivamus ultrices neque sed diam imperdiet, 
                                vitae gravida nunc aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam varius purus tincidunt, 
                                mollis nunc quis, vehicula ipsum. Fusce dignissim tellus turpis, vel facilisis dui vehicula a.</p>

                        </div>
                    </div>

                    <div className="related-news-container">
                        <h2 className="related-news-title">Related News</h2>
                        {relatedNews.map((news) => (
                            <NewsCard
                                key={news.id}
                                image={news.image}
                                title={news.title}
                                content={news.content}
                                newsReference={news.newsReference}
                                variant="compact"
                                width="100%"
                                height="153px"
                            />
                        ))}
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
