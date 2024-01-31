import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../../../Actions/auth";
import classes from "./ResetPassword.module.css";
import Button from "../../../Components/Buttons/Button";

const ResetPassword = ({ reset_password }) => {
    const navigate = useNavigate();

    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
    });

    const { email } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        reset_password(email);
        setRequestSent(true);
    };

    if (requestSent) {
        navigate("/");
    }

    return (
        <div className={classes.container}>
            <div className={classes.topCardContainer}>
                <h1 className={classes.title}>Request Password Reset:</h1>
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
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "0.8rem",
                        }}
                    >
                        <Button text="Reset Password" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default connect(null, { reset_password })(ResetPassword);