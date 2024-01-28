import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Background from "./Components/Background/Background";
import Sidebar from "./Components/Sidebar/Sidebar";
import Home from "./Views/Home/Home";
import ListComps from "./Views/ListComps/ListComps";
import Settings from "./Views/Settings/Settings";
import CreateCompetition from "./Components/Modals/CreateCompetition/CreateCompetition";
import PageContent from "./Components/PageContent/PageContent";
import CompetetionDetails from "./Components/Modals/CompetetionDetails/CompetetionDetails";
import Topbar from "./Components/Topbar/Topbar";

function App() {
    // state to control the sidebar retraction
    const [retracted, setRetracted] = useState(true);
    // state to control the organization name
    const [organization, setOrganization] = useState("");
    // state to control the modal to create a competition appearing and disappearing
    const [createCompModal, setCreateCompModal] = useState(false);
    // temporary state to control the modal to show the competition details appearing and disappearing
    const [compDetailsModal, setCompDetailsModal] = useState(false);
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

    useEffect(() => {
        const updateWidth = () => {
            setCurrentWidth(window.innerWidth);
        };
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    useEffect(() => {
        const orgName = "Clube de Natação de Coimbra";
        if (orgName.length > 30) {
            setOrganization(orgName.substring(0, 30) + "...");
        } else {
            setOrganization(orgName); /* TODO: get from API */
        }
    }, []);

    const changeCreateCompModal = () => {
        setCreateCompModal(!createCompModal);
    };

    const changeCompDetailsModal = () => {
        setCompDetailsModal(!compDetailsModal);
    };

    return (
        <Router>
            <Background />
            {currentWidth > 667 ? (
                <Sidebar
                    retracted={retracted}
                    setRetracted={setRetracted}
                    clicked={false}
                />
            ) : retracted ? (
                <Topbar
                    retracted={retracted}
                    setRetracted={setRetracted}
                    clicked={false}
                />
            ) : (
                <Sidebar
                    retracted={retracted}
                    setRetracted={setRetracted}
                    clicked={false}
                />
            )}

            <CreateCompetition
                createCompModal={createCompModal}
                changeCreateCompModal={changeCreateCompModal}
            />
            <CompetetionDetails
                compDetailsModal={compDetailsModal}
                changeCompDetailsModal={changeCompDetailsModal}
            />
            <PageContent
                organization={organization}
                retracted={retracted}
                createCompModal={createCompModal}
                changeCreateCompModal={changeCreateCompModal}
                changeCompDetailsModal={changeCompDetailsModal}
            >
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                retracted={retracted}
                                setRetracted={setRetracted}
                                changeCompDetailsModal={changeCompDetailsModal}
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
                    <Route
                        path="/Settings"
                        element={
                            <Settings
                                retracted={retracted}
                                setRetracted={setRetracted}
                            />
                        }
                    />
                </Routes>
            </PageContent>
        </Router>
    );
}

export default App;
