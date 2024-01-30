import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Background from "./Components/Background/Background";
import Sidebar from "./Components/Sidebar/Sidebar";
import Home from "./Views/Home/Home";
import ListComps from "./Views/ListComps/ListComps";
import Settings from "./Views/Settings/Settings";
import PageContent from "./Components/PageContent/PageContent";
import CompetetionDetails from "./Components/Modals/CompetetionDetails/CompetetionDetails";
import CreateCompetition from "./Components/Modals/CreateCompetition/CreateCompetition";
import Topbar from "./Components/Topbar/Topbar";
import Login from "./Views/Auth/Login/Login";
import Signup from "./Views/Auth/Signup/Signup";
import Activate from "./Views/Auth/Activate/Activate";
import ResetPassword from "./Views/Auth/ResetPassword/ResetPassword";
import ResetPasswordConfirm from "./Views/Auth/ResetPasswordConfirm/ResetPasswordConfirm";
import PrivateRoute from "./Hooks/Common/PrivateRoute";

import { Provider, useSelector } from "react-redux";
import store from "./store";

import Layout from "./Hooks/layout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [retracted, setRetracted] = useState(true);
    const [organization, setOrganization] = useState("");
    const [createCompModal, setCreateCompModal] = useState(false);
    const [compDetailsModal, setCompDetailsModal] = useState(false);
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        const updateWidth = () => {
            setCurrentWidth(window.innerWidth);
        };
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    useEffect(() => {
        setOrganization("Clube de Natação de Coimbra"); /* TODO: get from API */
    }, []);

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
                        path="/login"
                        element={
                            <Layout>
                                <Login />
                            </Layout>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <Layout>
                                <Signup />
                            </Layout>
                        }
                    />
                    <Route
                        path="/api/reset-password"
                        element={
                            <Layout>
                                <ResetPassword />
                            </Layout>
                        }
                    />
                    <Route
                        path="/api/password/reset/confirm/:uid/:token"
                        element={
                            <Layout>
                                <ResetPasswordConfirm />
                            </Layout>
                        }
                    />
                    <Route
                        path="/api/activate/:uid/:token"
                        element={
                            <Layout>
                                <Activate />
                            </Layout>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute
                                auth={{ isAuthenticated: isAuthenticated }}
                            >
                                <>
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
                                        changeCreateCompModal={
                                            changeCreateCompModal
                                        }
                                    />
                                    <CompetetionDetails
                                        compDetailsModal={compDetailsModal}
                                        changeCompDetailsModal={
                                            changeCompDetailsModal
                                        }
                                    />
                                    <PageContent
                                        organization={organization}
                                        retracted={retracted}
                                        createCompModal={createCompModal}
                                        changeCreateCompModal={
                                            changeCreateCompModal
                                        }
                                        changeCompDetailsModal={
                                            changeCompDetailsModal
                                        }
                                    >
                                        <Routes>
                                            <Route
                                                path="/"
                                                element={
                                                    <Home
                                                        retracted={retracted}
                                                        setRetracted={
                                                            setRetracted
                                                        }
                                                        changeCompDetailsModal={
                                                            changeCompDetailsModal
                                                        }
                                                    />
                                                }
                                            />
                                            <Route
                                                path="/TestsList"
                                                element={
                                                    <ListComps
                                                        retracted={retracted}
                                                        setRetracted={
                                                            setRetracted
                                                        }
                                                    />
                                                }
                                            />
                                            <Route
                                                path="/Settings"
                                                element={
                                                    <Settings
                                                        retracted={retracted}
                                                        setRetracted={
                                                            setRetracted
                                                        }
                                                    />
                                                }
                                            />
                                        </Routes>
                                    </PageContent>
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
