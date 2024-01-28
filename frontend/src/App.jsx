import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Background from "./Components/Background/Background";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import Home from "./Views/Home/Home";
import ListComps from "./Views/ListComps/ListComps";
import Profile from "./Views/Profile/Profile";
import CreateCompetition from "./Components/Modals/CreateCompetition";
import Settings from "./Views/Settings/Settings";
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
        setOrganization("Clube de Natação de Coimbra"); /* TODO: get from API */
    }, []);

    // function to change state of createCompModal
    const changeCreateCompModal = () => {
        setCreateCompModal(!createCompModal);
    };

    const changeCompDetailsModal = () => {
        setCompDetailsModal(!compDetailsModal);
    };

    return (
        <Provider store={store}>
            <Router>
                <ToastContainer />
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
                                    />
                                </>
                            </PrivateRoute>
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
    );
}

export default App;
