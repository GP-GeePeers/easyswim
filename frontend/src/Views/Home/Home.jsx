import React, { useState } from "react";
import classes from "./Home.module.css";
import Card from "../../Components/Cards/Card";

function Home(props) {
    return (
        <div className={classes.topCardContainer}>
            <Card>
                <div className={classes.title}>Competições inscritas</div>
            </Card>
        </div>
    );
}

export default Home;
