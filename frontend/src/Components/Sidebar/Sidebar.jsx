import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Sidebar.module.css";
import Button from "../Buttons/Button";
import Title from "./Assets/Title.svg";
import sideIconpng from "./Assets/sideIconpng.png";

function Sidebar(props) {
    let Sidebar = classes.Sidebar;
    if (props.retracted) {
        Sidebar += ` ${classes.SidebarRetracted}`;
    }

    return (
        <div className={Sidebar}>
            <NavLink to="/" className={classes.SidebarHeader}>
                <div className={classes.TitleLogoContainer}>
                    {/* Redirecionar para a página inicial ao clicar */}
                    <img
                        src={process.env.PUBLIC_URL + "/Assets/Images/logo.png"}
                        style={{
                            "background-color":
                                props.clickedComp || props.clickedProfile
                                    ? null
                                    : "#445552",
                            "border-radius": "8px",
                        }}
                        alt="Easy Swim Logo"
                        className={classes.Logo}
                    />
                    {props.retracted ? null : (
                        <img
                            src={Title}
                            alt="Easy Swim Title"
                            className={classes.Title}
                        />
                    )}
                </div>
            </NavLink>
            {/* <div className={classes.SidebarContent}></div> */}
            <div className={classes.ListButtonContainer}>
                <NavLink to="/TestsList" style={{ "text-decoration": "none" }}>
                    <Button
                        type={props.clickedComp ? "sidebarClicked" : "sidebar"}
                        icon={sideIconpng}
                        text={props.retracted ? null : "Lista de competições"}
                        retracted={props.retracted}
                    />
                </NavLink>
                <NavLink to="/Profile" style={{ "text-decoration": "none" }}>
                    <Button
                        type={
                            props.clickedProfile ? "sidebarClicked" : "sidebar"
                        }
                        icon={sideIconpng}
                        text={props.retracted ? null : "Perfil"}
                        retracted={props.retracted}
                    />
                </NavLink>
            </div>
            <div className={classes.CloseListButtonContainer}>
                <Button
                    type={"close"}
                    text={props.retracted ? ">" : "Fechar"}
                    retracted={props.retracted}
                    onClick={() => {
                        props.setRetracted(!props.retracted);
                    }}
                />
            </div>
            {/* Seta clicável para expandir ou retrair a sidebar */}
        </div>
    );
}

export default Sidebar;
