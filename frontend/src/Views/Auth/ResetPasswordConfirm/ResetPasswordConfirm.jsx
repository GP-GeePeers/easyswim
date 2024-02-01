import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../../../Actions/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./ResetPasswordConfirm.module.css";
import Button from "../../../Components/Buttons/Button";
import toastclasses from "../../../Actions/auth.module.css"

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
    const navigate = useNavigate();
    const { uid, token } = useParams();

    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: "",
        re_new_password: "",
    });

    const { new_password, re_new_password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        if (new_password === re_new_password) {
            reset_password_confirm(uid, token, new_password, re_new_password);
            setRequestSent(true);
        } else {
            toast.error("Passwords dont match",{
                className: toastclasses.errortoast,
            });
        }
    };

    if (requestSent) {
        navigate("/");
    }

    return (
        <div className={classes.container}>
            <div className={classes.topCardContainer}>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className={classes.formGroup}>
                        <input
                            className={classes.input}
                            type="password"
                            placeholder="New Password"
                            name="new_password"
                            value={new_password}
                            onChange={(e) => onChange(e)}
                            minLength="6"
                            required
                        />
                    </div>
                    <div className={classes.formGroup}>
                        <input
                            className={classes.input}
                            type="password"
                            placeholder="Confirm New Password"
                            name="re_new_password"
                            value={re_new_password}
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
                        <Button text="Reset Password" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
