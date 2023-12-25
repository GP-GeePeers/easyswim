import React, { useState } from "react";
import classes from "./Sidebar.module.css";
import Title from "./Assets/Title.svg";
import Button from "../Buttons/Button";

function Sidebar() {
    const [retracted, setRetracted] = useState(false);
    const [clicked, setClicked] = useState(false);

    let Sidebar = classes.Sidebar;
    if (retracted) {
        Sidebar += ` ${classes.SidebarRetracted}`;
    }

    return (
        <div className={Sidebar}>
            <div className={classes.SidebarHeader}>
                {/* Logo */}
                <div className={classes.TitleLogoContainer}>
                    {/* Redirecionar para a página inicial ao clicar */}
                    <img
                        src={process.env.PUBLIC_URL + "/Assets/Images/logo.png"}
                        alt="Easy Swim Logo"
                        className={classes.Logo}
                    />
                    {retracted ? null : (
                        <img
                            src={Title}
                            alt="Easy Swim Title"
                            className={classes.Title}
                        />
                    )}
                </div>
            </div>
            {/* <div className={classes.SidebarContent}></div> */}
            <div className={classes.ListButtonContainer}>
                <Button
                    type={clicked ? "sidebarClicked" : "sidebar"}
                    // icon={}
                    text={"Lista de competições"}
                    retracted={retracted}
                    onClick={() => {
                        setClicked(!clicked);
                    }}
                />
                <div className={classes.BottomListButtonContainer}>
                    <Button
                        type={"sidebar"}
                        // icon={retracted ? ArrowRight : ArrowLeft}
                        text={"Lista de competições"}
                        retracted={retracted}
                        onClick={() => {}}
                    />
                </div>
            </div>
            {/* Seta clicável para expandir ou retrair a sidebar */}
        </div>
    );
}

export default Sidebar;
