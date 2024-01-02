import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Views/Home/Home";
import ListComps from "./Views/ListComps/ListComps";
import Profile from "./Views/Profile/Profile";
import Header from "./Components/Header/Header";
// import Sidebar from "./Components/Sidebar/Sidebar";

function App() {
    const [retracted, setRetracted] = useState(true);
    const [organization, setOrganization] = useState("");
    useEffect(() => {
        setOrganization("Clube de Natação de Coimbra"); /* TODO: get from API */
    }, []);

    return (
        <Router>
            <Header organization={organization} retracted={retracted} />
            {/* TODO - have sidebar and background done here so that the views component only aggregate their
            correspondent components and remove the sidebar from the views that it is currently placed in */}
            {/* <Sidebar
                retracted={retracted}
                setRetracted={setRetracted}
                clicked={false}
            /> */}
            {/* <Background /> */}
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
