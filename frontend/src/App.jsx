import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Background from "./Components/Background/Background";
import Sidebar from "./Components/Sidebar/Sidebar";
import Home from "./Views/Home/Home";
import ListComps from "./Views/ListComps/ListComps";
import Settings from "./Views/Settings/Settings";
import CreateCompetition from "./Components/Modals/CreateCompetition";
import PageContent from "./Components/PageContent/PageContent";

function App() {
    // state to control the sidebar retraction
    const [retracted, setRetracted] = useState(true);
    // state to control the organization name
    const [organization, setOrganization] = useState("");
    // state to control the modal to create a competition appearing and disappearing
    const [createCompModal, setCreateCompModal] = useState(false);

    // get organization name from API
    useEffect(() => {
        setOrganization("Clube de Natação de Coimbra"); /* TODO: get from API */
    }, []);

    //funtion to change state of createCompModal
    const changeCreateCompModal = () => {
        setCreateCompModal(!createCompModal);
    };

    return (
        <Router>
            <Background />
            <Sidebar
                retracted={retracted}
                setRetracted={setRetracted}
                clicked={false}
            />
            <CreateCompetition
                createCompModal={createCompModal}
                changeCreateCompModal={changeCreateCompModal}
            />
            <PageContent
                organization={organization}
                retracted={retracted}
                createCompModal={createCompModal}
                changeCreateCompModal={changeCreateCompModal}
            >
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
