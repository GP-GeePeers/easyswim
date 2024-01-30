import React, { useState, useEffect } from "react";
import classes from "./CompetitionDetails.module.css";
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
        course_length: "25 meters (SCM)",
        register_limit_date: "13-07-2023 | 09:00",
        state: "active",
    },
];

function CompetitionDetails(props) {
    let data;
    if (props.create) {
        // data = props.createCompData;
        data = mockData;
    } else {
        console.log(props.filePreview);
        data = props.filePreview;
    }

    const keys = Object.keys(data[0]);

    const [contentHeights, setContentHeights] = useState(
        Array(keys.length).fill(0)
    );

    useEffect(() => {
        const newContentHeights = contentHeights.map((_, index) => {
            const contentRef = document.getElementById(`content-${index}`);
            return contentRef ? contentRef.clientHeight : 0;
        });

        setContentHeights(newContentHeights);
    }, [props.compDetailsModal, window.innerWidth]); // eslint-disable-line react-hooks/exhaustive-deps

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
                                <div className={classes.header}>
                                    <div className={classes.titleContainer}>
                                        <div className={classes.title}>
                                            Informações da Competição
                                        </div>
                                    </div>
                                    <div
                                        className={classes.buttonsContainer}
                                        onClick={handleCloseModal}
                                    >
                                        {props.create && (
                                            <Button
                                                text={"Cancelar prova"}
                                                onClick={
                                                    props.create
                                                        ? props.changeCreateCompModal
                                                        : props.handleSubmitOnPreview
                                                }
                                            />
                                        )}
                                        <Button
                                            type={"secondary"}
                                            text={"Fechar"}
                                            onClick={
                                                props.changeCreateCompModal
                                            }
                                        />
                                    </div>
                                </div>
                                <div className={classes.tableContainer}>
                                    {keys.map(
                                        (key, index) =>
                                            key !== "id" &&
                                            key !== "bucket_path" &&
                                            key !== "maxentriesathlete" &&
                                            key !== "number" &&
                                            key !== "reservecount" &&
                                            key !== "startmethod" &&
                                            key !== "timing" &&
                                            key !== "type" && (
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
                                                                {data.map(
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
                                                        (props.create
                                                            ? keys.length - 1
                                                            : keys.length -
                                                              2) && (
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

export default CompetitionDetails;
