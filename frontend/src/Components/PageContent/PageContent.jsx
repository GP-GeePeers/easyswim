import React from "react";
import classes from "./PageContent.module.css";
import Header from "../Header/Header";

function PageContent(props) {
    let container = classes.container;

    if (props.retracted === true) {
        container += ` ${classes.containerRetracted}`;
    }
    return (
        <div className={container}>
            <div className={classes.headerContainer}>
                <Header
                    organization={props.organization}
                    retracted={props.retracted}
                    createCompModal={props.createCompModal}
                    changeCreateCompModal={props.changeCreateCompModal}
                />
            </div>
            <div className={classes.contentContainer}>{props.children}</div>
        </div>
    );
}

export default PageContent;
