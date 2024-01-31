import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../../../Actions/auth";
import classes from "./Activate.module.css";
import Button from "../../../Components/Buttons/Button";

const Activate = ({ verify }) => {
    const navigate = useNavigate();
    const { uid, token } = useParams();

    const [verified, setVerified] = useState(false);

    const verify_account = () => {
        verify(uid, token);
        setVerified(true);
    };

    if (verified) {
        navigate("/login");
    }

    return (
        <div className={classes.container}>
            <div className={classes.topCardContainer}>
                <h1 className={classes.title}>Verify your Account:</h1>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "0.8rem",
                    }}
                >
                    <Button text="Verify" onClick={verify_account} />
                </div>
            </div>
        </div>
    );
};

export default connect(null, { verify })(Activate);
