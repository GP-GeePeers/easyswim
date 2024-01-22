import React, { useState } from "react";
import axios from "axios";
import classes from "./Home.module.css";

const TABLE_DATA = [
    { 
        id: 1, 
        organizer: "Associação Académica de Coimbra", 
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL", 
        date: "14-07-2023", 
        state: "active" },
    { 
        id: 2, 
        organizer: "Associação Académica de Coimbra", 
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL", 
        date: "14-07-2023", 
        state: "inactive" },
    { 
        id: 3, 
        organizer: "Associação Académica de Coimbra", 
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL", 
        date: "14-07-2023", 
        state: "inactive" },
    { 
        id: 4, 
        organizer: "Associação Académica de Coimbra", 
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL", 
        date: "14-07-2023", 
        state: "active" },
    // Add more data as needed
];

const TABLE_HEADERS = ["ORGANIZADOR", "NOME", "DATA", "ESTADO"];

function Home(props) {
    let container = classes.container;

    if (props.retracted === true) {
        container += ` ${classes.containerRetracted}`;
    }

    return (
        <div className={container}>
            <div className={classes.contentContainer}>
                <h1>Homepage</h1>
                <div className={classes.box}>
                    <div className={classes.table}>
                        <div className={classes.tableRow + " " + classes.tableHeader}>
                            {TABLE_HEADERS.map((header, index) => (
                                <div key={index} className={classes.tableCell}>
                                    {header}
                                </div>
                            ))}
                        </div>
                        {TABLE_DATA.map((row) => (
                            <div key={row.id} className={classes.tableRow}>
                                <div className={`${classes.tableCell} ${classes.organizerColumn}`}>{row.organizer}</div>
                                <div className={`${classes.tableCell} ${classes.nameColumn}`}>{row.name}</div>
                                <div className={`${classes.tableCell} ${classes.dateColumn}`}>{row.date}</div>
                                <div className={`${classes.tableCell} ${classes.stateColumn}`}>{row.state}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
