import React, { useState } from "react";
import classes from "./Sidebar.module.css";
import Title from "./Assets/Title.svg";
import Button from "../Buttons/Button";

function Sidebar() {
    const [retracted, setRetracted] = useState(true);

    return (
        <div className={classes.Sidebar}>
            <div className={classes.SidebarHeader}>
                {/* Logo */}
                <div className={classes.TitleLogoContainer}>
                    {/* Redirecionar para a página inicial ao clicar */}
                    <img
                        src={process.env.PUBLIC_URL + "/Assets/Images/logo.png"}
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
            {/* <div className={classes.SidebarContent}></div> */}
            <div className={classes.ListButtonContainer}>
                <Button
                    type={"secondary"}
                    text={"ive"}
                    disabled
                    onClick={() => {
                        console.log("Click");
                    }}
                />
            </div>
            {/* Seta clicável para expandir ou retrair a sidebar */}
        </div>
    );
}

export default Sidebar;
