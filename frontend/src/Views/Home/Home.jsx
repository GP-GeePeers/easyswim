import React, { useState } from "react";
import classes from "./Home.module.css";
import Card from "../../Components/Cards/Card";

function Home(props) {
    return (
        <div className={classes.topCardContainer}>
            <Card>
                <h1>Competições inscritas</h1>
            </Card>
            <Card>
                <h1>Competições inscritas</h1>
            </Card>
            <Card>
                <h1>Competições inscritas</h1>
            </Card>
            <Card>
                <h1>Competições inscritas</h1>
            </Card>
            <Card>
                <h1>Competições inscritas</h1>
            </Card>
            <Card>
                <h1>Competições inscritas</h1>
            </Card>
        </div>
    );
}

export default Home;
