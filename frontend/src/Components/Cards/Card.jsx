import React from "react";
import classes from "./Card.module.css";

function Card(props) {
    let card = classes.primaryCard;
    if (props.type === "secondary") {
        card += ` ${classes.secondaryCard}`;
    }
    // if (props.type === "secondary") {
    //     card += ` ${classes.secondaryCard}`;
    // }
    // if (props.type === "secondary") {
    //     card += ` ${classes.secondaryCard}`;
    // }
    // if (props.type === "secondary") {
    //     card += ` ${classes.secondaryCard}`;
    // }

    return <div className={card}>{props.children}</div>;
}

export default Card;
