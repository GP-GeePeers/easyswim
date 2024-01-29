import React from "react";
import classes from "./Button.module.css";

function Button(props) {
    let buttonClass;
    let textClass;
    let text;

    if (props.type === "secondary") {
        buttonClass = classes.secondaryButton;
        textClass = classes.secondaryText;
        text = props.text;
        if (props.disabled) {
            buttonClass += ` ${classes.smallSecondaryButton}`;
            text = "Inativo";
        }
        if (props.retracted) {
            buttonClass += ` ${classes.retractedSecondaryButton}`;
        }
    } else if (
        props.type === "sidebar" ||
        props.type === "compClicked" ||
        props.type === "profileClicked" ||
        props.type === "close"
    ) {
        buttonClass = classes.sidebarButton;
        if (props.type === "compClicked") {
            buttonClass += ` ${classes.sidebarButtonClicked}`;
        }
        if (props.type === "profileClicked") {
            buttonClass += ` ${classes.sidebarButtonClicked}`;
        }
        if (props.retracted) {
            buttonClass += ` ${classes.retractedSidebarButton}`;
        }
        textClass = classes.sidebarText;
        if (props.type === "compClicked") {
            textClass += ` ${classes.sidebarTextClicked}`;
        }
        if (props.type === "profileClicked") {
            textClass += ` ${classes.sidebarTextClicked}`;
        }
        if (props.type === "close") {
            buttonClass += ` ${classes.close}`;
        }
        text = props.text;
    } else {
        buttonClass = classes.primaryButton;
        textClass = classes.primaryText;
        text = props.text;
        if (props.disabled) {
            buttonClass += ` ${classes.smallPrimaryButton}`;
            text = "Ativo";
        }
        if (props.retracted) {
            buttonClass += ` ${classes.retractedPrimaryButton}`;
        }
    }

    return (
        <div>
            <button
                className={buttonClass}
                onClick={props.disabled ? null : props.onClick}
                disabled={props.disabled}
            >
                {props.icon && (
                    <img src={props.icon} alt="Icon" className={classes.Logo} />
                )}
                <span className={textClass}>{text}</span>
            </button>
        </div>
    );
}

export default Button;
