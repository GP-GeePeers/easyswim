import React from "react";
import classes from "./Header.module.css";
import Button from "../../Components/Buttons/Button";
import CreateCompetition from "../Modals/CreateCompetition";

function Header(props) {
    let headerContainer = classes.headerContainer;
    if (props.retracted === true) {
        headerContainer += ` ${classes.retractedHeaderContainer}`;
    }
    return (
        <div className={headerContainer}>
            <div className={classes.textContainer}>
                <h1>Olá {props.organization} 👋</h1>
            </div>
            <div className={classes.buttonContainer}>
                <Button
                    text={"Criar prova"}
                    onClick={props.changeCreateCompModal}
                />
            </div>
            {props.createCompModal && (
                <CreateCompetition
                    createCompModal={props.createCompModal}
                    changeCreateCompModal={props.changeCreateCompModal}
                />
            )}
        </div>
    );
}

export default Header;
