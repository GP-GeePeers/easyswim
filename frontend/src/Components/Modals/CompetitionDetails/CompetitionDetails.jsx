import React, { useState, useEffect, useContext, useRef } from "react";
import classes from "./CompetitionDetails.module.css";
import Button from "../../Buttons/Button";
import Card from "../../Cards/Card";
import axios from "axios";
import { toast } from "react-toastify";
import { CompetitionDetailsContext } from "../../../contexts/competition-details";
import { EnrollTeamContext } from "../../../contexts/enroll-team";
import { ReloadHomepageContext } from "../../../contexts/reload-pages";

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
    const {
        fileInfo,
        competitionDetailsFlag: flag,
        competitionDetailsVisible: visible,
        setCompetitionDetailsModalVisible: setModalVisible,
    } = useContext(CompetitionDetailsContext);

    const { setMeetId, enrollTeamvisible, setEnrollTeamModalVisible } =
        useContext(EnrollTeamContext);

    const { setReload } = useContext(ReloadHomepageContext);

    let data;
    let keys;
    if (flag === "details") {
        data = fileInfo;
        keys = Object.keys(data);
        // console.log(keys.length);
    } else {
        data = props.filePreview;
        keys = Object.keys(data[0]);
        // console.log(keys.length);
    }

    const [contentHeights, setContentHeights] = useState(
        Array(keys.length).fill(0)
    );

    useEffect(() => {
        const newContentHeights = contentHeights.map((_, index) => {
            const contentRef = document.getElementById(`content-${index}`);
            return contentRef ? contentRef.clientHeight : 0;
        });

        setContentHeights(newContentHeights);
    }, [props.compDetailsModal, visible, window.innerWidth]); // eslint-disable-line react-hooks/exhaustive-deps

    // const teams = useRef([]);
    const [teams, setTeams] = useState();
    const [teamsHeights, setTeamsHeights] = useState();
    const teamsKeys = useRef([]);
    const [selectedClub, setSelectedClub] = useState(null);
    const [athleteDropdown, setAthleteDropdown] = useState(false);

    useEffect(() => {
        if (flag === "details") {
            const fetchTeams = async () => {
                try {
                    // Use data.id as the id parameter in the URL
                    let url = `http://localhost:8000/api/list-TeamManager-by-Meet/?id=${data.id}`;

                    const response = await axios.get(url, {
                        headers: {
                            "content-type": "multipart/form-data",
                            Authorization: `JWT ${localStorage.getItem(
                                "access"
                            )}`,
                        },
                        withCredentials: true,
                    });

                    // console.log(response.data);
                    // teams.current = response.data;
                    setTeams(response.data);
                } catch (err) {
                    console.log(err);
                    // console.log(err.response.data);
                    toast.error("Erro ao carregar equipas!");
                }
            };

            fetchTeams();
        }
    }, [data.id, flag, enrollTeamvisible]);

    useEffect(() => {
        if (teams) {
            // console.log(teams.club.map((key) => key));
            // console.log(teams.club[0].athletes.map((athlete) => athlete));
            // console.log(teams.club.map((key) => key.name));

            teamsKeys.current = teams.club.map((key) => key.name);
            // console.log(teamsKeys.current);
            setTeamsHeights(Array(teamsKeys.length).fill(0));
        }
    }, [teams]);

    useEffect(() => {
        const newContentHeights = teamsHeights?.map((_, index) => {
            const contentRef = document.getElementById(`content-${index}`);
            return contentRef ? contentRef.clientHeight : 0;
        });

        setTeamsHeights(newContentHeights);
    }, [props.compDetailsModal, visible, window.innerWidth, athleteDropdown]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleCloseModal = () => {
        if (
            props.compDetailsModal === true ||
            props.compDetailsModal === false
        ) {
            props.changeCompDetailsModal();
        } else {
            setModalVisible(!visible);
        }
        setAthleteDropdown(false);
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

    const downloadCompetition = () => {
        // const csrftoken = document.cookie.match(/csrftoken=([^;]*)/)[1];
        // console.log(csrftoken);
        let url = `http://localhost:8000/api/lxf-meet-confirmation/?download=true&id=${data.id}`;

        axios({
            method: "get",
            url: `http://localhost:8000/api/lxf-meet-confirmation/?download=true&id=${data.id}`,
            responseType: "blob",
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `JWT ${localStorage.getItem("access")}`,
            },
            withCredentials: true,
        })
            .then((res) => {
                const contentDisposition = res.headers["Content-Disposition"];
                const filename = contentDisposition
                    ? contentDisposition.split("filename=")[1]
                    : null;
                console.log(res);
                // Create a blob from the response data
                const blob = new Blob([res.data], {
                    type: res.headers["content-type"],
                });

                // Create a link element and set its href to a Blob URL
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = filename || "meetManager.lxf";

                // Append the link to the document, trigger a click, and remove the link
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((err) => {
                console.log(err);
                // console.log(err.response.data);
                toast.error("Erro ao fazer download da prova!");
            });
    };

    const uploadTeamManager = () => {
        setMeetId(data.id);
        setEnrollTeamModalVisible(!enrollTeamvisible);
    };

    const handleClubClick = (index) => {
        setSelectedClub(index);
        setAthleteDropdown(!athleteDropdown);
    };

    return (
        <div>
            {(props.compDetailsModal || visible) && (
                <div
                    className={
                        !enrollTeamvisible ? classes.modalOverlay : classes._
                    }
                    onClick={handleCloseModal}
                >
                    <div
                        className={classes.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={classes.cardContainer}>
                            <Card>
                                <div className={classes.header}>
                                    <div className={classes.titleContainer}>
                                        <div className={classes.title}>
                                            Informações da Competição
                                        </div>
                                    </div>
                                    <div className={classes.buttonsContainer}>
                                        {flag === "details" && (
                                            <>
                                                <Button
                                                    text={"Download Prova"}
                                                    onClick={() => {
                                                        downloadCompetition();
                                                    }}
                                                />
                                                {data.state === "Active" && (
                                                    <>
                                                        <Button
                                                            text={"Upload Team"}
                                                            onClick={() => {
                                                                uploadTeamManager();
                                                            }}
                                                        />
                                                        <Button
                                                            text={
                                                                "Cancelar Prova"
                                                            }
                                                            onClick={() => {
                                                                cancelCompetition();
                                                                setReload(true);
                                                            }}
                                                        />
                                                    </>
                                                )}
                                            </>
                                        )}
                                        <Button
                                            type={"secondary"}
                                            text={"Fechar"}
                                            onClick={handleCloseModal}
                                        />
                                    </div>
                                </div>
                                <div
                                    className={
                                        flag === "details"
                                            ? classes.tableContainerDetails
                                            : classes.tableContainer
                                    }
                                >
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
                                    {flag === "details" && (
                                        <>
                                            <div
                                                className={
                                                    classes.horizontalLine
                                                }
                                                style={{ marginTop: "2rem" }}
                                            />
                                            <div
                                                className={
                                                    classes.horizontalLine
                                                }
                                            />
                                            <div
                                                className={
                                                    classes.horizontalLine
                                                }
                                            />
                                            <div
                                                className={
                                                    classes.horizontalLine
                                                }
                                            />
                                            <div
                                                className={
                                                    classes.tableClubsDetails
                                                }
                                            >
                                                <div className={classes.header}>
                                                    <div
                                                        className={
                                                            classes.titleContainer
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                classes.title
                                                            }
                                                        >
                                                            Clubes e atletas
                                                            inscritos
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={
                                                            classes.buttonsContainer
                                                        }
                                                    ></div>
                                                </div>
                                                {teamsKeys.current.length ===
                                                    0 && (
                                                    <div
                                                        className={
                                                            classes.contentContainer
                                                        }
                                                        style={{
                                                            marginTop: "0.7rem",
                                                        }}
                                                    >
                                                        <div
                                                            className={
                                                                classes.text
                                                            }
                                                        >
                                                            Não há equipas
                                                            inscritas nesta
                                                            competição
                                                        </div>
                                                    </div>
                                                )}
                                                {teamsKeys.current.length !==
                                                    0 &&
                                                    teamsKeys.current.map(
                                                        (clubName, index) => (
                                                            <React.Fragment
                                                                key={clubName}
                                                            >
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
                                                                            {
                                                                                clubName
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            classes.verticalLine
                                                                        }
                                                                        style={{
                                                                            height: `${teamsHeights[index]}px`,
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
                                                                            <div
                                                                                className={
                                                                                    classes.athletesContainer
                                                                                }
                                                                            >
                                                                                <Button
                                                                                    text="Mostrar Atletas"
                                                                                    onClick={() =>
                                                                                        handleClubClick(
                                                                                            index
                                                                                        )
                                                                                    }
                                                                                />
                                                                                {selectedClub ===
                                                                                    index &&
                                                                                    athleteDropdown && (
                                                                                        <div
                                                                                            className={
                                                                                                classes.athleteDropdown
                                                                                            }
                                                                                        >
                                                                                            {teams.club[
                                                                                                index
                                                                                            ].athletes.map(
                                                                                                (
                                                                                                    athlete,
                                                                                                    athleteIndex
                                                                                                ) => (
                                                                                                    <React.Fragment
                                                                                                        key={
                                                                                                            athlete.id
                                                                                                        }
                                                                                                    >
                                                                                                        {
                                                                                                            athlete.name
                                                                                                        }
                                                                                                        {athleteIndex <
                                                                                                            teams
                                                                                                                .club[
                                                                                                                index
                                                                                                            ]
                                                                                                                .athletes
                                                                                                                .length -
                                                                                                                1 && (
                                                                                                            <div
                                                                                                                className={
                                                                                                                    classes.athleteSeparator
                                                                                                                }
                                                                                                            />
                                                                                                        )}
                                                                                                    </React.Fragment>
                                                                                                )
                                                                                            )}
                                                                                        </div>
                                                                                    )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {index <
                                                                    teamsKeys
                                                                        .current
                                                                        .length -
                                                                        1 && (
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
                                        </>
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
