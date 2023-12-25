import React from "react";
import ListComps from "./Views/ListComps/ListComps";
import Home from "./Views/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/TestsList" element={<ListComps />} />
            </Routes>
        </Router>
    );
}

export default App;
