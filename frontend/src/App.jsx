import React, { useState } from "react";
import ListComps from "./Views/ListComps/ListComps";
import Home from "./Views/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    const [retracted, setRetracted] = useState(true);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            retracted={retracted}
                            setRetracted={setRetracted}
                        />
                    }
                />
                <Route
                    path="/TestsList"
                    element={
                        <ListComps
                            retracted={retracted}
                            setRetracted={setRetracted}
                        />
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
