import React, { useState } from "react";
import axios from "axios";
import classes from "./Home.module.css";
import searchLogo from "./Assets/search.svg"

const TABLE_DATA0 = [
    {
        id: 1,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-07-2023",
        state: "active"
    },
]

const TABLE_DATA = [
    {
        id: 1,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-07-2023",
        state: "active"
    },
    {
        id: 2,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-07-2023",
        state: "inactive"
    },
    {
        id: 3,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-07-2023",
        state: "inactive"
    },
    {
        id: 4,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-07-2023",
        state: "active"
    },
    {
        id: 5,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-07-2023",
        state: "active"
    },
    {
        id: 6,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-07-2023",
        state: "inactive"
    },
    {
        id: 7,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-07-2023",
        state: "inactive"
    },
    {
        id: 8,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-07-2023",
        state: "active"
    },
    // Add more data as needed
];

function Home(props) {
    let container = classes.container;
    let x=1, y=8, z=9;

    //z = ir buscar valor da quantidade total de competicoes
    if (z < y) {
        y = z;
    }

    if (props.retracted === true) {
        container += ` ${classes.containerRetracted}`;
    }

    return (
        <div className={container}>
            <div className={classes.contentContainer}>
                <div className={classes.box}>
                    {/* Title*/}
                    <div className={classes.titleContainer}>
                        <h2>Próxima Competição</h2>
                    </div>

                    {/* Table */}
                    <div className={classes.table}>
                        {TABLE_DATA0.map((row) => (
                            <div key={row.id} className={classes.tableRow0}>
                                <div className={`${classes.tableCell} ${classes.organizerColumn}`}>{row.organizer}</div>
                                <div className={`${classes.tableCell} ${classes.nameColumn}`}>{row.name}</div>
                                <div className={`${classes.tableCell} ${classes.dateColumn}`}>{row.date}</div>
                                <div className={`${classes.tableCell} ${classes.stateColumn}`}>{row.state}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={classes.box}>
                    {/* Title and Buttons */}
                    <div className={classes.titleContainer}>
                        <h2>Competições Inscritas</h2>
                        <div className={classes.titleContainerButtons}>
                            <input className={classes.button} placeholder="Pesquisar"></input>      {/* falta adicionar a imagem */}
                            <button className={classes.button}>Ordenar por: Mais recente</button>   {/* falta adicionar o dropdown */}
                        </div>
                    </div>

                    {/* Table */}
                    <div className={classes.table}>
                        <div className={classes.tableRow + " " + classes.tableHeader}>
                            <div className={classes.tableRowHeader}>
                                <div className={`${classes.tableCellHeader} ${classes.organizerColumn}`}>ORGANIZADOR</div>
                                <div className={`${classes.tableCellHeader} ${classes.nameColumn}`}>NOME</div>
                                <div className={`${classes.tableCellHeader} ${classes.dateColumn}`}>DATA</div>
                                <div className={`${classes.tableCellHeader} ${classes.stateColumn}`}>ESTADO</div>
                            </div>
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

                    {/* Page Number and Buttons */}
                    <div className={classes.pageContainer}>
                        <span>Dados {x} a {y} de {z} entradas</span>
                        <div className={classes.pageContainerButtons}>
                            <button className={classes.buttonPages}>Pages</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;