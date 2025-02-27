import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import Landing from "./pages/landing/Landing";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route to landing */}
        <Route path="/" element={<Landing />} />
        
        {/* Route to login page */}
        <Route path="/login" element={<Login />} />
      
      </Routes>
    </Router>
  );
}

export default App;