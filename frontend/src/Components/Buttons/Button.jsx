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
            text = "Inactive";
        }
    } else if (props.type === "sidebar") {
        buttonClass = classes.sidebarButton;
        textClass = classes.sidebarText;
    } else {
        buttonClass = classes.primaryButton;
        textClass = classes.primaryText;
        text = props.text;
        if (props.disabled) {
            buttonClass += ` ${classes.smallPrimaryButton}`;
            text = "Active";
        }
    }

    return (
        <div>
            <button
                className={buttonClass}
                onClick={props.disabled ? null : props.onClick}
                disabled={props.disabled}
            >
                <span className={textClass}>{text}</span>
            </button>
        </div>
    );
}

export default Button;
