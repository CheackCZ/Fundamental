import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import Navbar from '@/components/navbar/Navbar';
import Subbar from '@/components/subbar/Subbar';
import InfoCard from '@/components/info-card/InfoCard';
import ImageCard from '@/components/img-card/ImageCard';
import Footer from '@/components/footer/Footer';

import phoneImage from '@/assets/img/phone.png';
import worldWideCoverageIcon from '@/assets/icons/world-wide_coverage.svg';
import advancedAnalyticsIcon from '@/assets/icons/advanced_analytics.svg';    
import webBasedIcon from '@/assets/icons/web-based.svg';
import affordableIcon from '@/assets/icons/affordable.svg';

import './Landing.css';


function Landing() {
    const navigate = useNavigate();

    return (
        <div className='landing-content'>

            {/* Header */}
            <header>

                {/* Navbar component */}
                <Navbar />

            </header>

            {/* Main */}
            <main>

                {/* Hero section */}
                <section className='hero-section'>

                    {/* div with text in the main content */}
                    <div className='text-container'>
                        <h3>Fundamental.</h3>
                        <h1>Master the markets with real time data and smart analytics, at one place.</h1>
                        <h2>Join a community of top investors and level up your game from anywhere.</h2>

                        {/* Buttons */}
                        <div className='button-container'>
                            <Button id='signin-button' onClick={() => navigate('/login?tab=signin')}>Sign In</Button>
                            <Button id='login-button' onClick={() => navigate('/login?tab=login')}>Login</Button>
                        </div>
                    </div>    

                    {/* div with image in the main content */}
                    <div className="image-container">
                        <img src={phoneImage} alt="phone-image" id='phone-image' />
                    </div>

                </section>

                {/* Subbar component */}
                <div className="subbar-section" id="subbar-section">
                    <Subbar />
                </div>

                {/* Overview section */}
                <section className="overview-section" id='overview-section'>
                    <p>The Fundamental changes the game of investing more than ever before for <span>anyone</span>, <span>anywhere</span> and <span>at anytime</span>. 
                        It’s simplicity leading to fast access to news, data, analytics and modern tools.</p>
                
                    {/* InfoCard components */}
                    <div className="cards-container">
                        {/* InfoCard with World wide Coverage text */}
                        <InfoCard 
                            image={worldWideCoverageIcon} 
                            title='World-Wide Coverage' 
                            content='Access real-time data across multiple asset classes, including stocks, indexes, commodities, and cryptocurrencies.'
                        />

                        {/* InfoCard with Advanced analytics */}
                        <InfoCard 
                            image={advancedAnalyticsIcon} 
                            title='Advanced Analytics' 
                            content='Leverage powerful analytics, proprietary research, and third-party data to make informed investment decisions.'
                        />

                        {/* InfoCard with Web based */}
                        <InfoCard 
                            image={webBasedIcon} 
                            title='Web-Based' 
                            content='A fully cloud-based platform, accessible from anywhere, without the need for expensive hardware or installations.'
                        />

                        {/* InfoCard with Affordable */}
                        <InfoCard 
                            image={affordableIcon} 
                            title='Affordable' 
                            content='A cost-effective alternative to traditional financial terminals, designed for both individual investors and institutions.'
                        />

                    </div>
                
                </section>

                {/* Products section */}
                <section className="products-section" id='products-section'>
                    <p>Fundamental offers the most powerful, flexible, and essential tools, designed for seamless and efficient use.</p>
                    
                    <div className='img_cards-container'>
                        <ImageCard 
                            title="Stocks" 
                            image="/src/assets/img/previews/stocks-preview.png" 
                            url="/stocks"
                        />
                        <ImageCard 
                            title="News" 
                            image="/src/assets/img/previews/news-preview.png" 
                            url='/news'
                        />
                        <ImageCard 
                            title="Macrocalendar" 
                            image="/src/assets/img/previews/macrocalendar-preview.png" 
                            url='/macrocalendar'
                        />
                        <ImageCard 
                            title="Analysis" 
                            image="" 
                            url='/sentiment'
                        />
                    </div>

                </section>

                {/* Showcase section */}
                <section className="showcase-section" id='showcase-section'>
                    <h2>Use every single piece of Fundamental</h2>
                    <p>Highlights of Fundamental</p>

                    {/* Showcase info container */}
                    <div className="boxes-container">

                        {/* Showcase box */}
                        <div className="showcase-box">

                            <div className="text-part">
                                <h3>Analysis on Demand</h3>
                                <p>Fundamental gives you the freedom to analyze anything, anytime—offering real-time data, 
                                    deep insights, and powerful tools at your fingertips.</p>
                            </div>

                            <div className="image-part">
                                <ImageCard 
                                    title="Research" 
                                    image=""
                                    width={550}
                                    height={220}
                                    url=''
                                />
                            </div>

                        </div>

                        {/* Showcase box */}
                        <div className="showcase-box">

                            <div className="image-part" id='left'>
                                <ImageCard 
                                    title="Research" 
                                    image=""
                                    width={550}
                                    height={220}
                                    url=''
                                />
                            </div>

                            <div className="text-part">
                                <h3>Be the first to read the News </h3>
                                <p>Get the latest market-moving news the moment it breaks, ensuring you never miss a critical update.</p>
                            </div>

                        </div>

                        {/* Showcase box */}
                        <div className="showcase-box">
                            
                            <div className="text-part">
                                <h3>Stocks in depth</h3>
                                <p>Dive deep into every stock with comprehensive financial data, performance metrics, and advanced 
                                    analytics—giving you the insights you need to make informed decisions.</p>
                            </div>

                            <div className="image-part">
                                <ImageCard 
                                    title="Research" 
                                    image=""
                                    width={550}
                                    height={220}
                                    url=''
                                />
                            </div>

                        </div>

                    </div>

                </section>

                {/* Footer component */}
                <footer id='footer'>
                    <Footer />
                </footer>

            </main>            

        </div>
    );

}

export default Landing;