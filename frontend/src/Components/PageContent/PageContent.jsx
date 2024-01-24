import React from "react";
import classes from "./PageContent.module.css";
import Header from "../Header/Header";
import Button from "../Buttons/Button";

function PageContent(props) {
    let container = classes.container;
    let headerContainer = classes.headerContainer;

    if (props.retracted === true) {
        container += ` ${classes.containerRetracted}`;
        headerContainer += ` ${classes.headerContainerRetracted}`;
    }
    return (
        <div className={container}>
            <div className={headerContainer}>
                <Header
                    organization={props.organization}
                    retracted={props.retracted}
                    createCompModal={props.createCompModal}
                    changeCreateCompModal={props.changeCreateCompModal}
                />
            </div>
            <div className={classes.contentContainer}>{props.children}</div>
            <div className={classes.footerContainer}>
                <Button
                    text={"Criar prova"}
                    onClick={props.changeCreateCompModal}
                />
            </div>
        </div>
    );
}

export default PageContent;
