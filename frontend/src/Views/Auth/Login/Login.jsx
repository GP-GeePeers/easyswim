import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../../Actions/auth";
import classes from "./Login.module.css";
import Button from "../../../Components/Buttons/Button";

const Login = ({ login, isAuthenticated }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className={classes.container}>
            <div className={classes.topCardContainer}>
                <h1 className={classes.title}>Sign In</h1>
                <p className={classes.subtitle}>Sign into your Account</p>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className={classes.formGroup}>
                        <input
                            className={classes.input}
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className={classes.formGroup}>
                        <input
                            className={classes.input}
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                            minLength="6"
                            required
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "0.8rem",
                        }}
                    >
                        <Button text="Login" />
                    </div>
                </form>
                <br />

                <p className={classes.link}>
                    Don't have an account?{" "}
                    <Link to="/signup" className={classes.linkText}>
                        Sign Up
                    </Link>
                </p>
                <p className={classes.link}>
                    Forgot your Password?{" "}
                    <Link to="/api/reset-password" className={classes.linkText}>
                        Reset Password
                    </Link>
                </p>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
