import React from "react";
import classes from "./Header.module.css";
import Button from "../../Components/Buttons/Button";

function Header(props) {
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
