import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Background from "./Components/Background/Background";
import Sidebar from "./Components/Sidebar/Sidebar";
import Home from "./Views/Home/Home";
import ListComps from "./Views/ListComps/ListComps";
import Settings from "./Views/Settings/Settings";
import CreateCompetition from "./Components/Modals/CreateCompetition/CreateCompetition";
import PageContent from "./Components/PageContent/PageContent";
import CompetetionDetails from "./Components/Modals/CompetetionDetails/CompetetionDetails";
import Topbar from "./Components/Topbar/Topbar";

import Login from './Views/Auth/Login/Login';
import Signup from './Views/Auth/Signup/Signup';
import Activate from './Views/Auth/Activate/Activate';
import ResetPassword from './Views/Auth/ResetPassword/ResetPassword';
import ResetPasswordConfirm from './Views/Auth/ResetPasswordConfirm/ResetPasswordConfirm';
import PrivateRoute from "./Hooks/Common/PrivateRoute";

import { Provider, useSelector } from 'react-redux';
import store from './store';

import Layout from './Hooks/layout';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    // get organization name from API

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

return (
    <Provider store={store}>
        <Router>
            <ToastContainer />
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
            <Header
                organization={organization}
                retracted={retracted}
                createCompModal={createCompModal}
                changeCreateCompModal={changeCreateCompModal}
            />
            <Routes>
                <Route
                    path='/login'
                    element={
                        <Layout>
                            <Login />
                        </Layout>
                    }
                />
                <Route
                    path='/signup'
                    element={
                        <Layout>
                            <Signup />
                        </Layout>
                    }
                />
                <Route
                    path='/reset-password'
                    element={
                        <Layout>
                            <ResetPassword />
                        </Layout>
                    }
                />
                <Route
                    path='/password/reset/confirm/:uid/:token'
                    element={
                        <Layout>
                            <ResetPasswordConfirm />
                        </Layout>
                    }
                />
                <Route
                    path='/activate/:uid/:token'
                    element={
                        <Layout>
                            <Activate />
                        </Layout>
                    }
                />

                <Route
                    path="/"
                    element={
                        <PrivateRoute auth={{ isAuthenticated: isAuthenticated }}>
                            <>
                                <Background />
                                <Sidebar
                                    retracted={retracted}
                                    setRetracted={setRetracted}
                                    clicked={false}
                                />
                                <Header
                                    organization={organization}
                                    retracted={retracted}
                                    createCompModal={createCompModal}
                                    changeCreateCompModal={changeCreateCompModal}
                                />
                                <CreateCompetition
                                    createCompModal={createCompModal}
                                    changeCreateCompModal={changeCreateCompModal}
                                />
                                <Home
                                    retracted={retracted}
                                    setRetracted={setRetracted}
                                    organization={organization}
                                    changeCompDetailsModal={changeCompDetailsModal}
                                />
                            </>
                        </PrivateRoute>
                    }
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
                            <PrivateRoute auth={{ isAuthenticated: isAuthenticated }}>
                            <>
                            <Background />
                            <Sidebar
                                retracted={retracted}
                                setRetracted={setRetracted}
                                clicked={false}
                            />
                            <Header
                                organization={organization}
                                retracted={retracted}
                                createCompModal={createCompModal}
                                changeCreateCompModal={changeCreateCompModal}
                            />
                            <CreateCompetition
                                createCompModal={createCompModal}
                                changeCreateCompModal={changeCreateCompModal}
                            />
                            <ListComps
                                retracted={retracted}
                                setRetracted={setRetracted}
                                organization={organization}
                            />
                            </>
                            </PrivateRoute>
                            <ListComps
                                retracted={retracted}
                                setRetracted={setRetracted}
                            />
                        }
                    />
                    <Route
                        path="/Settings"
                        element={
                            <PrivateRoute auth={{ isAuthenticated: isAuthenticated }}>
                            <>
                            <Background />
                            <Sidebar
                                retracted={retracted}
                                setRetracted={setRetracted}
                                clicked={false}
                            />
                            <Header
                                organization={organization}
                                retracted={retracted}
                                createCompModal={createCompModal}
                                changeCreateCompModal={changeCreateCompModal}
                            />
                            <CreateCompetition
                                createCompModal={createCompModal}
                                changeCreateCompModal={changeCreateCompModal}
                            />
                            <Profile
                                retracted={retracted}
                                setRetracted={setRetracted}
                                organization={organization}
                            />
                            </>
                            </PrivateRoute>
                        }
                    />
                </Routes>
                
            </Router>
        </Provider>
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
