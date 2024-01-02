import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Sidebar.module.css";
import Button from "../Buttons/Button";
import Title from "./Assets/Title.svg";
import sideIcon from "./Assets/sideIcon.png";
import gear from "./Assets/gear.svg";
import logout from "./Assets/logout1.png";

function Sidebar(props) {
    const [clickedComp, setClickedComp] = useState(false);
    const [clickedProfile, setClickedProfile] = useState(false);

    let Sidebar = classes.Sidebar;
    if (props.retracted) {
        Sidebar += ` ${classes.SidebarRetracted}`;
    }

    return (
        <div className={Sidebar}>
            <NavLink
                to="/"
                className={classes.SidebarHeader}
                onClick={() => {
                    setClickedComp(false);
                    setClickedProfile(false);
                }}
            >
                <div className={classes.TitleLogoContainer}>
                    {/* Redirecionar para a página inicial ao clicar */}
                    <img
                        src={process.env.PUBLIC_URL + "/Assets/Images/logo.png"}
                        style={{
                            "background-color":
                                clickedComp || clickedProfile
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
                        type={clickedComp ? "compClicked" : "sidebar"}
                        icon={sideIcon}
                        text={props.retracted ? null : "Lista de competições"}
                        retracted={props.retracted}
                        onClick={() => {
                            setClickedComp(!clickedComp);
                            setClickedProfile(false);
                        }}
                    />
                </NavLink>
                <NavLink to="/Settings" style={{ "text-decoration": "none" }}>
                    <Button
                        type={clickedProfile ? "profileClicked" : "sidebar"}
                        icon={gear}
                        text={props.retracted ? null : "Definições"}
                        retracted={props.retracted}
                        onClick={() => {
                            setClickedProfile(!clickedProfile);
                            setClickedComp(false);
                        }}
                    />
                </NavLink>
            </div>
            <div className={classes.BottomButtonContainer}>
                <Button
                    // type={"close"}
                    type={"sidebar"}
                    text={props.retracted ? "" : "Terminar Sessão"}
                    icon={logout}
                    retracted={props.retracted}
                    onClick={() => {
                        /*TODO: Logout*/
                    }}
                />
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