import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import TopNavBar from "./components/TopNavBar";
import BottomNavBar from "./components/BottomNavBar";
import Home from "./pages/home";
import Lessons from "./pages/Lessons";
import Environment from "./pages/Environment";
import More from "./pages/More";
import Chat from "./pages/chat";
import Account from "./pages/Account";
import CulturalInsights from "./pages/CulturlInisghts"; // Agregamos CulturalInsights
import Grammar from "./pages/Grammar"; // Agregamos Grammar
import Community from "./pages/Community"; // Agregamos Community
import VocabularyBuilder from "./pages/VocabularyBuilder"; // Agregamos VocabularyBuilder
import Landing from "./pages/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Notification from "./pages/Notifications";
import RolePlay from "./pages/RolePlay";
import Avatar from "./pages/Avatar";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100 ">
        <ConditionalTopNavBar />
        <div className="flex-grow ">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/environment" element={<Environment />} />
            <Route path="/more" element={<More />} />
            <Route path="/account" element={<Account />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/culturalinsights" element={<CulturalInsights />} />
            <Route path="/grammar" element={<Grammar />} />
            <Route path="/community" element={<Community />} />
            <Route path="/vocabulary" element={<VocabularyBuilder />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/rolePlay" element={<RolePlay />} />
            <Route path="/avatar" element={<Avatar />} />
          </Routes>
        </div>
        <ConditionalBottomNavBar />
      </div>
    </Router>
  );
}

const ConditionalTopNavBar = () => {
  const location = useLocation();
  const hiddenRoutes = ["/", "/login", "/register", "/chat", "/avatar"];
  return !hiddenRoutes.includes(location.pathname) ? <TopNavBar /> : null;
};

const ConditionalBottomNavBar = () => {
  const location = useLocation();
  const hiddenRoutes = ["/", "/login", "/register"];
  return !hiddenRoutes.includes(location.pathname) ? <BottomNavBar /> : null;
};

export default App;
