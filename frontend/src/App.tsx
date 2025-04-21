import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Stocks from "./pages/stocks/Stocks";
import Stock from "./pages/stock/Stock";
import News from "./pages/news/News";
import NewsSection from "./pages/news/news-section/NewsSection";
import Article from './pages/news/article/Article';
import Sentiment from "./pages/sentiment/Sentiment";
import Macrocalendar from "./pages/macrocalendar/Macrocalendar";

function App() {

    return (
  
        <>
            <Router>
            
                <Routes>
            
                    {/* Default route to landing */}
                    <Route path="/" element={<Landing />} />

                    {/* Route to login page */}
                    <Route path="/login" element={<Login />} />

                    {/* Route to dashboard */}
                    <Route path="/dashboard" element={<Dashboard />}></Route>

                    {/* Route to Markets */}
                    <Route path="/stocks" element={<Stocks />}></Route>

                    {/* Route to Individual stock / etf */}
                    <Route path="/stock/:ticker" element={<Stock />} />

                    {/* Route to News */}
                    <Route path="/news" element={<News />}></Route>

                    {/* Dynamic News Section Route */}
                    <Route path="/news/:sectionName" element={<NewsSection />} />

                    {/* Route to inidividual news */}
                    <Route path="/news/article/:id" element={<Article />} />

                    {/* Route to Macrocalendar */}
                    <Route path="/macrocalendar" element={<Macrocalendar />}></Route>

                    {/* Route to Sentiment */}
                    <Route path="/sentiment" element={<Sentiment />}></Route>
                    
                </Routes>
            
            </Router>
            <Toaster />
        </>
    
    );
}

export default App;