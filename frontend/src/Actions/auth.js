import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    LOGOUT,
} from "./types";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export const load_user = () => async dispatch => {
    const accessToken = localStorage.getItem('access');
    const csrfToken = localStorage.getItem('csrfToken');
    console.log(accessToken);
    console.log(csrfToken);

    if (accessToken) {
        try {
            const res = await axios.get(`${apiUrl}/auth/users/me/`, {
                headers: {
                    'Authorization': `JWT ${accessToken}`,
                    'X-CSRFToken': csrfToken,
                }
            });

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data,
            });
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: USER_LOADED_FAIL,
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL,
        });
    }
};

export const checkAuthenticated = () => async (dispatch) => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        };

        const body = JSON.stringify({ token: localStorage.getItem("access") });

        try {
            const res = await axios.post(
                `${apiUrl}/auth/jwt/verify/`,
                body,
                config
            );

            if (res.data.code !== "token_not_valid") {
                dispatch({
                    type: AUTHENTICATED_SUCCESS,
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL,
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL,
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL,
        });
    }
};

export const login = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ email, password });
    console.log(body);

    try {
        const res = await axios.post(
            `${apiUrl}/auth/jwt/create/`,
            body,
            config
        );

        localStorage.setItem("access", res.data.access);

        localStorage.setItem('access', res.data.access);
        localStorage.setItem('csrfToken', res.data.csrfToken);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch(load_user());
        toast.success("Login success.");
    } catch (err) {
        console.log(err.response.data);
        toast.error("Login Error. Check your credentials.");

        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

export const signup =
    (first_name, last_name, email, password, re_password) =>
    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            re_password,
        });

        try {
            const res = await axios.post(`${apiUrl}/auth/users/`, body, config);
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data,
            });
            toast.success("Signup confirmation sended to your email.");
        } catch (err) {
            if (err.response.status === 400) {
                if (err.response && err.response.data) {
                    const errorDetails = err.response.data;

                    if (errorDetails.password) {
                        toast.error(`${errorDetails.password[0]}`);
                    } else if (errorDetails.email) {
                        toast.error(`${errorDetails.email[0]}`);
                    } else if (errorDetails.detail) {
                        toast.error(`${errorDetails.detail}`);
                    } else {
                        toast.error("Something went wrong. Please try again.");
                    }
                } else {
                    toast.error("Something went wrong. Please try again.");
                }
            } else {
                toast.error("Signup Error. Fill in all fields correctly.");
            }
            dispatch({
                type: SIGNUP_FAIL,
            });
        }
    };

export const verify = (uid, token) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${apiUrl}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
        toast.success("Account activation success.");
    } catch (err) {
        toast.error("Error activating account.");
        dispatch({
            type: ACTIVATION_FAIL,
        });
    }
};

export const reset_password = (email) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(`${apiUrl}/auth/users/reset_password/`, body, config);
        toast.success("Reset password confirmation sended to your email.");

        dispatch({
            type: PASSWORD_RESET_SUCCESS,
        });
    } catch (err) {
        console.log(err.response.data);
        toast.error("Reset Password Error.");
        dispatch({
            type: PASSWORD_RESET_FAIL,
        });
    }
};

export const reset_password_confirm =
    (uid, token, new_password, re_new_password) => async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify({
            uid,
            token,
            new_password,
            re_new_password,
        });

        try {
            await axios.post(
                `${apiUrl}/auth/users/reset_password_confirm/`,
                body,
                config
            );

            dispatch({
                type: PASSWORD_RESET_CONFIRM_SUCCESS,
            });
            toast.success("Reset Password Success.");
        } catch (err) {
            console.log(err.response.data);
            toast.error("Reset Password Error.");
            dispatch({
                type: PASSWORD_RESET_CONFIRM_FAIL,
            });
        }
    };

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
};
