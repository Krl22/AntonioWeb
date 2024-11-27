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
import CulturalInsights from "./pages/CulturlInisghts";
import Grammar from "./pages/Grammar";
import Community from "./pages/Community";
import VocabularyBuilder from "./pages/VocabularyBuilder";
import Landing from "./pages/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Notification from "./pages/Notifications";
import RolePlay from "./pages/RolePlay";
import Avatar from "./pages/Avatar";
import Game from "./pages/Game";
import Lobby from "./pages/Lobby";
import Room from "./pages/Room";
import Search from "./pages/Search";
import Friends from "./pages/Friends";
import Scene from "./pages/locations/Restaurant/scene";
// import ss1 from "./assets/ss1.png";

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
            <Route path="/game/:roomId" element={<Game />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/room/:roomId" element={<Room />} />
            <Route path="/search-rooms" element={<Search />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/restaurant" element={<Scene />} />
          </Routes>
        </div>
        <ConditionalBottomNavBar />
      </div>
    </Router>
  );
}

const ConditionalTopNavBar = () => {
  const location = useLocation();
  const hiddenRoutes = [
    "/",
    "/login",
    "/register",
    "/chat",
    "/avatar",
    "/game",
  ];
  return !hiddenRoutes.includes(location.pathname) ? <TopNavBar /> : null;
};

const ConditionalBottomNavBar = () => {
  const location = useLocation();
  const hiddenRoutes = ["/", "/login", "/register", "/game"];
  return !hiddenRoutes.includes(location.pathname) ? <BottomNavBar /> : null;
};

export default App;
