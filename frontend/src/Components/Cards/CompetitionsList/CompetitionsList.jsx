import React, { useEffect, useState } from "react";
import classes from "./CompetitionsList.module.css";
import Card from "../Card";
import Button from "../../Buttons/Button";

const ORDER_OPTIONS = ["Mais antigo", "Mais recente", "Nome"];
const TABLE_HEADERS = ["ORGANIZADOR", "NOME", "DATA", "ESTADO"];

function CompetitionsList(props) {
    // TODO - check string sizes and add "..." if too big, just like made in src/App.jsx
    const [searchInput, setSearchInput] = useState("");
    const [selectedOrder, setSelectedOrder] = useState("Mais antigo");

    const handleOrderOptionClick = (option) => {
        props.setTableData(
            props.tableData
                .filter(
                    (row) =>
                        row.organizer
                            .toLowerCase()
                            .includes(searchInput.toLowerCase()) ||
                        row.name
                            .toLowerCase()
                            .includes(searchInput.toLowerCase())
                )
                .sort((a, b) => {
                    console.log(option);
                    let returnDate;
                    if (option === "Mais antigo") {
                        if (a.date < b.date) {
                            returnDate = -1;
                        } else if (a.date > b.date) {
                            returnDate = 1;
                        } else {
                            returnDate = 0;
                        }
                        return returnDate;
                    } else if (option === "Nome") {
                        return a.name.localeCompare(b.name);
                    } else {
                        if (a.date < b.date) {
                            returnDate = 1;
                        } else if (a.date > b.date) {
                            returnDate = -1;
                        } else {
                            returnDate = 0;
                        }
                        return returnDate;
                    }
                })
        );
        setSelectedOrder(option);
    };

    return (
        <>
            <Card>
                <div className={classes.header}>
                    <div className={classes.titleContainer}>
                        <div className={classes.title}>
                            Informações da Competição
                        </div>
                    </div>
                    <div className={classes.buttonsContainer}>
                        <input
                            className={classes.buttonSearch}
                            placeholder="Pesquisar"
                        ></input>
                        <div className={classes.dropdown}>
                            <div className={classes.buttonDropdown}>
                                <div className={classes.text}>
                                    Ordenar por: {selectedOrder}
                                </div>
                            </div>
                            <div className={classes.listDropdown}>
                                {ORDER_OPTIONS.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() =>
                                            handleOrderOptionClick(option)
                                        }
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.table}>
                    <div
                        className={classes.tableRow + " " + classes.tableHeader}
                    >
                        <div className={classes.tableRowHeader}>
                            <div
                                className={
                                    classes.tableCellHeader +
                                    " " +
                                    classes.organizerColumn
                                }
                            >
                                ORGANIZADOR
                            </div>
                            <div
                                className={
                                    classes.tableCellHeader +
                                    " " +
                                    classes.nameColumn
                                }
                            >
                                NOME
                            </div>
                            <div
                                className={
                                    classes.tableCellHeader +
                                    " " +
                                    classes.dateColumn
                                }
                            >
                                DATA
                            </div>
                            <div
                                className={
                                    classes.tableCellHeader +
                                    " " +
                                    classes.stateColumn
                                }
                            >
                                ESTADO
                            </div>
                        </div>
                    </div>
                    {props.tableData?.map((row) => (
                        <div key={row.id} className={classes.tableRow}>
                            <div
                                className={
                                    classes.tableCell +
                                    " " +
                                    classes.organizerColumn
                                }
                            >
                                {row.organizer}
                            </div>
                            <div
                                className={
                                    classes.tableCell + " " + classes.nameColumn
                                }
                            >
                                {row.name}
                            </div>
                            <div
                                className={
                                    classes.tableCell + " " + classes.dateColumn
                                }
                            >
                                {row.date}
                            </div>
                            <div
                                className={
                                    classes.tableCell +
                                    " " +
                                    classes.stateColumn
                                }
                            >
                                {row.state === "active" ? (
                                    <Button text={row.state} disabled={true} />
                                ) : (
                                    <Button
                                        text={row.state}
                                        type="secondary"
                                        disabled={true}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </>
    );
}

export default CompetitionsList;
