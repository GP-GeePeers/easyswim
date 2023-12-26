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
        if (props.retracted) {
            buttonClass += ` ${classes.retractedSecondaryButton}`;
        }
    } else if (props.type === "sidebar" || props.type === "sidebarClicked") {
        buttonClass = classes.sidebarButton;
        if (props.type === "sidebarClicked") {
            buttonClass += ` ${classes.sidebarButtonClicked}`;
        }
        if (props.retracted) {
            buttonClass += ` ${classes.retractedSidebarButton}`;
        }
        textClass = classes.sidebarText;
        if (props.type === "sidebarClicked") {
            textClass += ` ${classes.sidebarTextClicked}`;
        }

        text = props.text;
    } else {
        buttonClass = classes.primaryButton;
        textClass = classes.primaryText;
        text = props.text;
        if (props.disabled) {
            buttonClass += ` ${classes.smallPrimaryButton}`;
            text = "Active";
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
