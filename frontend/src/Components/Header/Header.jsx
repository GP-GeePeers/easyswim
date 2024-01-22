import React from "react";
import classes from "./Header.module.css";
import Button from "../../Components/Buttons/Button";

function Header(props) {
    let headerContainer = classes.headerContainer;
    if (props.retracted === true) {
        headerContainer += ` ${classes.retractedHeaderContainer}`;
    }
    return (
        <div className={classes.container}>
            <div className={classes.textContainer}>
                <h1>Olá {props.organization} 👋</h1>
            </div>
            <div className={classes.buttonContainer}>
                <Button
                    text={"Criar prova"}
                    onClick={props.changeCreateCompModal}
                />
            </div>
        </div>
    );
}

export default Header;
