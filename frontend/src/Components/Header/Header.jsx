import React from "react";
import classes from "./Header.module.css";
import Button from "../../Components/Buttons/Button";

function Header(props) {
    let headerContainer = classes.headerContainer;
    if (props.retracted === true) {
        headerContainer += ` ${classes.retractedHeaderContainer}`;
    }
    return (
        <div className={headerContainer}>
            <h1>Olá {props.organization} 👋</h1>

            <Button
                text={"Criar prova"}
                onClick={() => {
                    /* TODO: openModal */
                }}
            />
        </div>
    );
}

export default Header;
