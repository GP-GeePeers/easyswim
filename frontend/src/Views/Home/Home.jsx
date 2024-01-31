import React, { useState, useEffect } from "react";
import classes from "./Home.module.css";
import NextCompetition from "../../Components/Cards/NextCompetition/NextCompetition";
import CompetitionsList from "../../Components/Cards/CompetitionsList/CompetitionsList";
import axios from "axios";

// const mockDataList = [
//     {
//         id: 1,
//         organizer: "Associação Académica de Coimbra",
//         name: "A - Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
//         date: "15-07-2024",
//         state: "active",
//     },
//     {
//         id: 2,
//         organizer: "Associação Académica de Coimbra",
//         name: "B - Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
//         date: "14-06-2024",
//         state: "inactive",
//     },
//     {
//         id: 3,
//         organizer: "Associação Académica de Coimbra",
//         name: "C - Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
//         date: "16-05-2024",
//         state: "active",
//     },
// ];

function Home(props) {
    const [nextCompetitionData, setNextCompetitionData] = useState();
    const [tableData, setTableData] = useState([]);
    const [originalData, setOriginalData] = useState([]);

    const getNextCompetition = () => {
        if (!tableData || !Array.isArray(tableData)) {
            setNextCompetitionData(null);
        }
        const currentDate = new Date();
        for (const meet of tableData) {
            if (!meet || typeof meet !== "object" || !meet.date) {
                continue;
            }
            const meetDate = new Date();
            if (meet.state === "active" && meetDate >= currentDate) {
                setNextCompetitionData(meet);
            }
        }
    };

    const fetchData = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.getItem("access")}`,
                },
            };
            const response = await axios.get(
                "http://127.0.0.1:8000/api/",
                config
            );
            const data = response.data; // Use response.data instead of response.json()

            const currentDate = new Date();

            const updatedTableData = data.meets.map((meet) => {
                const meetDate = new Date(meet.deadline);
                const isActive = meetDate >= currentDate;

                // console.log("meet", meet);

                return {
                    id: meet.id,
                    organizer: meet.organizer,
                    name: meet.name,
                    date: meet.deadline,
                    state:
                        meet.is_active === 0
                            ? "Inactive"
                            : meet.is_active === 1
                            ? "Active"
                            : "Canceled",
                };
            });

            setTableData(updatedTableData);
            setOriginalData(updatedTableData);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchData();
        console.log("1" + nextCompetitionData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (props.reloadHomepage) {
            fetchData();
        }
    }, [props.reloadHomepage]);

    useEffect(() => {
        getNextCompetition();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableData]);

    return (
        <div className={classes.topCardContainer}>
            <NextCompetition
                changeCompDetailsModal={props.changeCompDetailsModal}
                nextCompetitionData={nextCompetitionData}
                setReloadHomepage={props.setReloadHomepage}
                // mockNextCompetition={mockNextCompetition}
            />
            <CompetitionsList
                changeCompDetailsModal={props.changeCompDetailsModal}
                setTableData={setTableData}
                tableData={tableData}
                originalData={originalData}
                setReloadHomepage={props.setReloadHomepage}
                // mockDataList={mockTableDataList}
                // setMockTableDataList={setMockTableDataList}
            />
        </div>
    );
}

export default Home;
