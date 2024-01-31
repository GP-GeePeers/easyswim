import React, { useEffect, useState } from "react";
import classes from "./CompetitionsList.module.css";
import Card from "../Card";
import Button from "../../Buttons/Button";
import CompetitionDetails from "../../Modals/CompetitionDetails/CompetitionDetails";

const ORDER_OPTIONS = ["Mais antigo", "Mais recente", "Nome"];

function CompetitionsList(props) {
    // TODO - check string sizes and add "..." if too big, just like made in src/App.jsx
    const [searchInput, setSearchInput] = useState("");
    const [selectedOrder, setSelectedOrder] = useState("Mais antigo");
    const [showInfo, setShowInfo] = useState(false);
    const [identifier, setIdentifier] = useState(0);
    const [competitionToShow, setCompetitionToShow] = useState([]);

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

    const handleSearchInput = (word) => {
        const wordsInput = word.target.value.toLowerCase();

        setSearchInput(wordsInput);

        if (wordsInput === "") {
            props.setTableData(props.originalData);
        } else {
            const tableFilter = props.originalData.filter(
                (competitionFilter) => {
                    const compName = competitionFilter.name.toLowerCase();
                    const compOrganizer =
                        competitionFilter.organizer.toLowerCase();
                    const compDate = competitionFilter.date.toLowerCase();
                    return (
                        compName.includes(wordsInput) ||
                        compOrganizer.includes(wordsInput) ||
                        compDate.includes(wordsInput)
                    );
                }
            );

            props.setTableData(tableFilter);
        }
    };

    const handleShowInfo = () => {
        setShowInfo(!showInfo);
        props.setReloadHomepage(showInfo);
    };

    useEffect(() => {
        setCompetitionToShow(
            props.tableData.find((row) => row.id === identifier)
        );
    }, [identifier]);

    // console.log(props.tableData);

    return (
        <>
            {showInfo && competitionToShow && (
                <CompetitionDetails
                    compDetailsModal={showInfo}
                    changeCompDetailsModal={handleShowInfo}
                    compInfo={competitionToShow}
                    details
                />
            )}
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
                            value={searchInput}
                            onChange={handleSearchInput}
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
                                <div className={classes.text}>
                                    {row.organizer}
                                </div>
                            </div>
                            <div
                                className={
                                    classes.tableCell + " " + classes.nameColumn
                                }
                            >
                                <button
                                    className={classes.competitionContainer}
                                    onClick={() => {
                                        setIdentifier(row.id);
                                        handleShowInfo();
                                    }}
                                >
                                    <div className={classes.competitionText}>
                                        {row.name}
                                    </div>
                                </button>
                            </div>
                            <div
                                className={
                                    classes.tableCell + " " + classes.dateColumn
                                }
                            >
                                <div className={classes.text}>{row.date}</div>
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
