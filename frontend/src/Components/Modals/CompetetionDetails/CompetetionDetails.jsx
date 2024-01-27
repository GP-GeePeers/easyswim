import React, { useState, useEffect, useRef } from "react";
import classes from "./CompetetionDetails.module.css";
import Button from "../../Buttons/Button";
import Card from "../../Cards/Card";

const mockData = [
    {
        id: 1,
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        local: "Coimbra",
        organizer: "Associação Académica de Coimbra",
        number: "230714",
        date: "14-07-2023",
        duration: "25m",
        register_limit_date: "13-07-2023 | 09:00",
        state: "active",
    },
];

function CompetetionDetails(props) {
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

    const handleCloseModal = () => {
        props.changeCompDetailsModal();
    };

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div>
            {props.compDetailsModal && (
                <div
                    className={classes.modalOverlay}
                    onClick={handleCloseModal}
                >
                    <div
                        className={classes.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={classes.cardContainer}>
                            <Card centered>
                                <div className={classes.titleContainer}>
                                    <div className={classes.title}>
                                        Informações da Competição
                                    </div>
                                </div>
                                <div className={classes.tableContainer}>
                                    {keys.map(
                                        (key, index) =>
                                            // Exclude "id" from rendering
                                            key !== "id" && (
                                                <React.Fragment key={key}>
                                                    <div
                                                        className={
                                                            classes.contentContainer
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                classes.contentTitleContainer
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    classes.category
                                                                }
                                                            >
                                                                {capitalizeFirstLetter(
                                                                    key.replace(
                                                                        /_/g,
                                                                        " "
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={
                                                                classes.verticalLine
                                                            }
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
                                                            <div
                                                                className={
                                                                    classes.details
                                                                }
                                                            >
                                                                {mockData.map(
                                                                    (data) => (
                                                                        <React.Fragment
                                                                            key={
                                                                                data[
                                                                                    key
                                                                                ]
                                                                            }
                                                                        >
                                                                            {
                                                                                data[
                                                                                    key
                                                                                ]
                                                                            }
                                                                        </React.Fragment>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {index <
                                                        keys.length - 1 && (
                                                        <div
                                                            className={
                                                                classes.horizontalLine
                                                            }
                                                        />
                                                    )}
                                                </React.Fragment>
                                            )
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CompetetionDetails;
