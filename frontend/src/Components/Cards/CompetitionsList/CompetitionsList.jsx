import React, { useEffect, useState } from "react";
import classes from "./CompetitionsList.module.css";
import Card from "../Card";

const mockData = [
    {
        id: 1,
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        local: "Coimbra",
        organizer: "Associação Académica de Coimbra",
        number: "230714",
        date: "14-07-2023",
        course_length: "25 meters (SCM)",
        register_limit_date: "13-07-2023 | 09:00",
        state: "active",
    },
];

const ORDER_OPTIONS = ["Mais recente", "Mais antigo", "Nome", "Data"];

function CompetitionsList(props) {
    // TODO - check string sizes and add "..." if too big, just like made in src/App.jsx
    const [selectedOrder, setSelectedOrder] = useState("Mais recente");
    const keys = Object.keys(mockData[0]);

    const [contentHeights, setContentHeights] = useState(
        Array(keys.length).fill(0)
    );

    useEffect(() => {
        const newContentHeights = contentHeights.map((_, index) => {
            const contentRef = document.getElementById(`content-${index}`);
            return contentRef ? contentRef.clientHeight : 0;
        });

        setContentHeights(newContentHeights);
    }, [props.compDetailsModal]); // eslint-disable-line react-hooks/exhaustive-deps

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleOrderOptionClick = (option) => {
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
                        <div className={classes.dropdown}>
                            <div className={classes.buttonDropdown}>
                                Ordenar por: {selectedOrder}
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
                        <input
                            className={classes.buttonSearch}
                            placeholder="Pesquisar"
                        ></input>
                    </div>
                </div>
                <div className={classes.tableContainer}>
                    {keys.map(
                        (key, index) =>
                            // Exclude "id" from rendering
                            key !== "id" && (
                                <React.Fragment key={key}>
                                    <div className={classes.contentContainer}>
                                        <div
                                            className={
                                                classes.contentTitleContainer
                                            }
                                        >
                                            <div className={classes.category}>
                                                {capitalizeFirstLetter(
                                                    key.replace(/_/g, " ")
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={classes.verticalLine}
                                            style={{
                                                height: `${contentHeights[index]}px`,
                                            }}
                                        />
                                        <div
                                            className={
                                                classes.contentDetailsContainer
                                            }
                                            id={`content-${index}`}
                                        >
                                            <div className={classes.details}>
                                                {mockData.map((data) => (
                                                    <React.Fragment
                                                        key={data[key]}
                                                    >
                                                        {data[key]}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {index < keys.length - 1 && (
                                        <div
                                            className={classes.horizontalLine}
                                        />
                                    )}
                                </React.Fragment>
                            )
                    )}
                </div>
            </Card>
        </>
    );
}

export default CompetitionsList;
