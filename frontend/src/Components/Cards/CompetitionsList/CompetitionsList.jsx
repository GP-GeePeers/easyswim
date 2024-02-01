import React, { useEffect, useState, useContext } from "react";
import classes from "./CompetitionsList.module.css";
import Card from "../Card";
import Button from "../../Buttons/Button";
import { CompetitionDetailsContext } from "../../../contexts/competition-details";
import { ReloadHomepageContext } from "../../../contexts/reload-pages";

const ORDER_OPTIONS = ["Data descendente", "Data ascendente", "Nome"];

function CompetitionsList(props) {
    // TODO - check string sizes and add "..." if too big, just like made in src/App.jsx
    const [searchInput, setSearchInput] = useState("");
    const [selectedOrder, setSelectedOrder] = useState("Data descendente");
    const [identifier, setIdentifier] = useState(0);
    const {
        setCompetitionInfo,
        competitionDetailsVisible: visible,
        setCompetitionDetailsModalVisible: setModalVisible,
    } = useContext(CompetitionDetailsContext);
    const { setReload } = useContext(ReloadHomepageContext);

    useEffect(() => {
        setCompetitionInfo(
            props.tableData.current.find((row) => row.id === identifier)
        );
    }, [identifier]);

    const handleOrderOptionClick = (option) => {
        props.tableData.current = props.tableData.current
            .filter(
                (row) =>
                    row.organizer
                        .toLowerCase()
                        .includes(searchInput.toLowerCase()) ||
                    row.name.toLowerCase().includes(searchInput.toLowerCase())
            )
            .sort((a, b) => {
                if (option === "Data ascendente") {
                    return new Date(a.date) - new Date(b.date);
                } else if (option === "Nome") {
                    return a.name.localeCompare(b.name);
                } else {
                    return new Date(b.date) - new Date(a.date);
                }
            });
        setSelectedOrder(option);
    };

    const handleSearchInput = (word) => {
        const wordsInput = word.target.value.toLowerCase();

        setSearchInput(wordsInput);

        if (wordsInput === "") {
            // props.setTableData(props.originalData);
            props.tableData.current = props.originalData;
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

            // props.setTableData(tableFilter);
            props.tableData.current = tableFilter;
        }
    };

    const handleShowInfo = () => {
        setModalVisible(!visible);
        // props.setReloadHomepage(visible);
        setReload(visible);
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
                    {props.tableData.current?.map((row) => (
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
                                {row.state === "Active" ? (
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
