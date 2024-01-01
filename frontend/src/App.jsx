import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Views/Home/Home";
import ListComps from "./Views/ListComps/ListComps";
import Profile from "./Views/Profile/Profile";

function App() {
    const [retracted, setRetracted] = useState(true);
    const [organization, setOrganization] = useState("");
    useEffect(() => {
        setOrganization("Clube de Natação de Coimbra"); /* TODO: get from API */
    }, []);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            retracted={retracted}
                            setRetracted={setRetracted}
                            organization={organization}
                        />
                    }
                />
                <Route
                    path="/TestsList"
                    element={
                        <ListComps
                            retracted={retracted}
                            setRetracted={setRetracted}
                            organization={organization}
                        />
                    }
                />
                <Route
                    path="/Settings"
                    element={
                        <Profile
                            retracted={retracted}
                            setRetracted={setRetracted}
                            organization={organization}
                        />
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
