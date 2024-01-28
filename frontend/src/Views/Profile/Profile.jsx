import React, { useState, useEffect } from "react";
import classes from "./Profile.module.css";

// TODO
function Profile(props) {
    let container = classes.container;

    if (props.retracted === true) {
        container += ` ${classes.containerRetracted}`;
    }

    return (
        <div className={container}>
            <div className={classes.contentContainer}>
                <h1>Definições</h1>
            </div>
        </div>
    );
}

export default Profile;
