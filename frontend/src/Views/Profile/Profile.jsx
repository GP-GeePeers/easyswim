import React, { useState, useEffect } from "react";
import classes from "./Profile.module.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Button from "../../Components/Buttons/Button";

// TODO
function Profile(props) {
    let contentContainer;

    contentContainer = classes.contentContainer;
    if (props.retracted === true) {
        contentContainer += ` ${classes.contentContainerRetracted}`;
    }

    return (
        <div className={classes.container}>
            <Sidebar
                retracted={props.retracted}
                setRetracted={props.setRetracted}
                clickedProfile={true}
            />
            <div className={contentContainer}>
                <div className={classes.headerContainer}>
                    <h1>Olá {props.organization} 👋</h1>

                    <Button
                        text={"Criar prova"}
                        onClick={() => {
                            /* TODO: openModal */
                        }}
                    />
                </div>
                <h1>Definições</h1>
            </div>
        </div>
    );
}

export default Profile;
