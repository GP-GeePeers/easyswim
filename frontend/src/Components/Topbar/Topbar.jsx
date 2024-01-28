import React, { useState } from "react";
import classes from "./Topbar.module.css";
import Button from "../Buttons/Button";
import Title from "./Assets/Title.svg";

function Topbar(props) {
    return (
        <div className={classes.Sidebar}>
            <div className={classes.SidebarHeader}>
                <div className={classes.TitleLogoContainer}>
                    <img
                        src={process.env.PUBLIC_URL + "/Assets/Images/logo.png"}
                        style={{
                            backgroundColor: "#445552",
                            borderRadius: "8px",
                        }}
                        alt="Easy Swim Logo"
                        className={classes.Logo}
                    />
                    <img
                        src={Title}
                        alt="Easy Swim Title"
                        className={classes.Title}
                    />
                </div>
            </div>
            <div className={classes.BottomButtonContainer}>
                <Button
                    type={"close"}
                    text={"⮟"}
                    retracted={props.retracted}
                    onClick={() => {
                        props.setRetracted(!props.retracted);
                    }}
                />
            </div>
        </div>
    );
}

export default Topbar;
