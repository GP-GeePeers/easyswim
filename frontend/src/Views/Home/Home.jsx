import React, { useState } from "react";
import axios from "axios";
import classes from "./Home.module.css";

function Home(props) {
    let container = classes.container;

    if (props.retracted === true) {
        container += ` ${classes.containerRetracted}`;
    }

    return (
        <div className={container}>
            <div className={classes.contentContainer}>
                <h1>Homepage</h1>
                {/* <h1>
                    Content Content Content Content Content Content Content
                    Content Content Content Content Content Content Content
                    Content Content Content Content Content Content
                </h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1>
                <h1>Content</h1> */}
            </div>
        </div>
    );
}

export default Home;
