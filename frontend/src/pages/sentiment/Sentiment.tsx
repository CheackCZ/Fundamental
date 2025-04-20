import { useState, useEffect } from "react";

import LoggedInNavbar from "@/components/logged-in-navbar/LoggedInNavbar";
import FearGreedBox from "@/components/sentiment/FearAndGreed";
import VixBox from "@/components/sentiment/Vix";
// @ts-ignore
import Command from "@/components/command/Command"; 
import Footer from "@/components/footer/Footer";

import './Sentiment.css'


function Sentiment() {
    const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
    const [vixData, setVixData] = useState([]);
    const [vixValue, setVixValue] = useState<number | null>(null);

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
        fetch("/api/market/vix")
            .then((res) => res.json())
            .then((data) => {
                setVixData(data.history);
                setVixValue(data.current);
            });
    }, []);

    return (

        <div className="sentiment-content">
        
            {/* Header */}
            <header>
                <LoggedInNavbar toggleCommand={toggleCommand} />
            </header>

            {/* Main */}
            <main className="sentiment-main">

                {/* Command Component (Search) - Opened from Navbar */}
                {isCommandOpen && <Command isVisible={isCommandOpen} onClose={() => setIsCommandOpen(false)} />}
            
                <h1 className="section-title" id="latest-title">Current Market Mood</h1>
                
                <div className="flex items-start w-full">
                    <FearGreedBox indexValue={21} level="Greed" />
                </div>

                <div className="flex items-start w-full">
                    <VixBox />
                </div>

            </main>

            {/* Footer */}
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Sentiment;