import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Signup.module.css";
import { connect } from "react-redux";
import { signup } from "../../../Actions/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../../Components/Buttons/Button";
import toastclasses from "../../../Actions/auth.module.css"


const Signup = ({ signup, isAuthenticated }) => {
    const navigate = useNavigate();

    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        re_password: "",
    });

    const { first_name, last_name, email, password, re_password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        if (password === re_password) {
            signup(first_name, last_name, email, password, re_password);
            setAccountCreated(true);
        } else {
            toast.error("Passwords dont match",{
                className: toastclasses.errortoast,
            });
        
        }
    };

    if (isAuthenticated) {
        navigate("/");
    }

    if (accountCreated) {
        navigate("/login");
    }

    return (
        <div className={classes.container}>
            <div className={classes.topCardContainer}>
                <h1 className={classes.title}>Sign Up</h1>
                <p>Create your Account</p>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className={classes.formGroup}>
                        <input
                            className={classes.input}
                            type="text"
                            placeholder="First Name*"
                            name="first_name"
                            value={first_name}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className={classes.formGroup}>
                        <input
                            className={classes.input}
                            type="text"
                            placeholder="Last Name*"
                            name="last_name"
                            value={last_name}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className={classes.formGroup}>
                        <input
                            className={classes.input}
                            type="email"
                            placeholder="Email*"
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
                            placeholder="Password*"
                            name="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                            minLength="8" //Do not change this value. The library Djoser only accepts passwords with a minimum length of 8 characters.
                            required
                        />
                    </div>
                    <div className={classes.formGroup}>
                        <input
                            className={classes.input}
                            type="password"
                            placeholder="Confirm Password*"
                            name="re_password"
                            value={re_password}
                            onChange={(e) => onChange(e)}
                            minLength="8" //Do not change this value. The library Djoser only accepts passwords with a minimum length of 8 characters.
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
                        <Button text="Register" />
                    </div>
                </form>
                <br />
                <p className={classes.link}>
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
