import React from 'react';
import {Route, Redirect, Navigate } from "react-router-dom";


const PrivateRoute = ({ auth = { isAuthenticated: false }, children }) => {
    return auth.isAuthenticated ? children : <Navigate to="/login" />;
 };

export default PrivateRoute;