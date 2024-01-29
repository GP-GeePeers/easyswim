import React from "react";
import classes from "./Card.module.css";

function Card(props) {
    let card = classes.card;
    if (props.centered) {
        card += ` ${classes.centered}`;
    }
    return <div className={card}>{props.children}</div>;
}

export default Card;
