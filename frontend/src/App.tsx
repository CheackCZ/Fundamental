import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Markets from "./pages/markets/Markets";
import News from "./pages/news/News";
import Sentiment from "./pages/sentiment/Sentiment";
import Macrocalendar from "./pages/macrocalendar/Macrocalendar";

function App() {

    return (
  
        <Router>
        
            <Routes>
        
                {/* Default route to landing */}
                <Route path="/" element={<Landing />} />

                {/* Route to login page */}
                <Route path="/login" element={<Login />} />

                {/* Route to dashboard */}
                <Route path="/dashboard" element={<Dashboard />}></Route>

                {/* Route to Markets */}
                <Route path="/markets" element={<Markets />}></Route>

                {/* Route to Individual Market */}

                {/* Route to Individual stock */}

                {/* Route to News */}
                <Route path="/news" element={<News />}></Route>

                {/* Route to inidividual news */}

                {/* Route to Macrocalendar */}
                <Route path="/macrocalendar" element={<Macrocalendar />}></Route>

                {/* Route to Sentiment */}
                <Route path="/sentiment" element={<Sentiment />}></Route>
        
            </Routes>
        
        </Router>
    
    );
}

export default App;