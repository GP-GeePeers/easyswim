import React, { useState, useEffect, useContext } from "react";
import classes from "./CompetitionDetails.module.css";
import Button from "../../Buttons/Button";
import Card from "../../Cards/Card";
import axios from "axios";
import { toast } from "react-toastify";
import { CompetitionDetailsContext } from "../../../contexts/competition-details";

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
    const { fileInfo, flag, visible, setModalVisible } = useContext(
        CompetitionDetailsContext
    );

    let data;
    let keys;
    if (flag === "details") {
        data = fileInfo;
        keys = Object.keys(data);
        console.log(keys.length);
    } else {
        data = props.filePreview;
        keys = Object.keys(data[0]);
        console.log(keys.length);
    }

    const [contentHeights, setContentHeights] = useState(
        Array(keys.length).fill(0)
    );

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        if (flag === "details") {
            const fetchTeams = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:8000/api/list-TeamManager-by-Meet/${data.id}`
                    );

                    setTeams(response.data.teams);
                } catch (error) {
                    console.error("Error fetching teams:", error);
                }
            };

            fetchTeams();
        }
    }, [data.id, flag]);

    useEffect(() => {
        const newContentHeights = contentHeights.map((_, index) => {
            const contentRef = document.getElementById(`content-${index}`);
            return contentRef ? contentRef.clientHeight : 0;
        });

        setContentHeights(newContentHeights);
    }, [props.compDetailsModal, visible, window.innerWidth]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleCloseModal = () => {
        if (
            props.compDetailsModal === true ||
            props.compDetailsModal === false
        ) {
            props.changeCompDetailsModal();
        } else {
            setModalVisible(!visible);
        }
    };

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const cancelCompetition = () => {
        let form_data = new FormData();

        // console.log(data);
        // console.log(data.id);
        if (data.id) {
            // console.log("id");
            form_data.append("id", data.id);
            // console.log(form_data);
        }

        // console.log(form_data);
        let body = JSON.stringify({ id: data.id });

        // const csrftoken = document.cookie.match(/csrftoken=([^;]*)/)[1];
        // console.log(csrftoken);
        let url = `http://localhost:8000/api/lxf-delete/`;
        // console.log(url);
        axios
            .patch(url, form_data, {
                headers: {
                    "content-type": "multipart/form-data",
                    Authorization: `JWT ${localStorage.getItem("access")}`,
                    // "X-CSRFToken": `${csrftoken}`,
                },
                withCredentials: true,
            })
            .then((res) => {
                toast.success("Prova cancelada com sucesso!");
                handleCloseModal();
            })
            .catch((err) => {
                console.log(err);
                toast.error("Erro ao cancelar prova!");
            });
    };

    return (
        <div>
            {(props.compDetailsModal || visible) && (
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
                                    <div className={classes.buttonsContainer}>
                                        {flag === "details" && (
                                            <Button
                                                text={"Cancelar prova"}
                                                onClick={() => {
                                                    cancelCompetition();
                                                }}
                                            />
                                        )}
                                        <Button
                                            type={"secondary"}
                                            text={"Fechar"}
                                            onClick={handleCloseModal}
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
                                                                {flag ===
                                                                "details" ? (
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
                                                                ) : (
                                                                    data.map(
                                                                        (
                                                                            data
                                                                        ) => (
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
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {index <
                                                        (flag === "details"
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
