import React, { useState, useEffect } from "react";
import classes from "./Settings.module.css";
import Card from "../../Components/Cards/Card";

// TODO
function Profile(props) {
    return (
        <div className={classes.topCardContainer}>
            <Card centered>
                <div className={classes.title}>Definições</div>
            </Card>
        </div>
    );
}

export default Profile;
