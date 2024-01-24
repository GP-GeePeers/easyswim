import React, { useState } from "react";
import classes from "./Home.module.css";
import NextCompetition from "../../Components/Cards/NextCompetition/NextCompetition";

function Home(props) {
    return (
        <div className={classes.topCardContainer}>
            <NextCompetition />
        </div>
    );
}

export default Home;
