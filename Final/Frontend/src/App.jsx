import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateAuction from "./pages/CreateAuction";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import "./styles.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-auction" element={<CreateAuction />} />
      </Routes>
    </Router>
  );
};

export default App;
