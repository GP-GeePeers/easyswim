import React, { useState, useEffect } from "react";
import classes from "./Home.module.css";
import NextCompetition from "../../Components/Cards/NextCompetition/NextCompetition";
import CompetitionsList from "../../Components/Cards/CompetitionsList/CompetitionsList";
import axios from "axios";

const mockDataList = [
    {
        id: 1,
        organizer: "Associação Académica de Coimbra",
        name: "Campeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "15-07-2024",
        state: "active",
    },
    {
        id: 2,
        organizer: "Associação Académica de Coimbra",
        name: "ACampeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "14-06-2024",
        state: "inactive",
    },
    {
        id: 3,
        organizer: "Associação Académica de Coimbra",
        name: "RCampeonato interdistrital de Juvenis, Juniores e Seniores PL",
        date: "16-05-2024",
        state: "active",
    },
];

function Home(props) {
    const [nextCompetitionData, setNextCompetitionData] = useState();
    const [tableData, setTableData] = useState();
    //mockdata
    const [mockTableDataList, setMockTableDataList] = useState(mockDataList);
    // console.log(mockTableDataList);
    const [mockNextCompetition, setMockNextCompetition] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/meets-data/"
                );
                const data = await response.json();
                const currentDate = new Date();

                const updatedTableData = data.meets.map((meet) => {
                    const meetDate = new Date(meet.deadline);
                    const isActive = meetDate >= currentDate;

                    return {
                        id: meet.id,
                        organizer: meet.organizer,
                        name: meet.name,
                        date: meet.deadline,
                        state: isActive ? "active" : "inactive",
                    };
                });

                setTableData(updatedTableData);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        // fetchData();
    }, []);

    // useEffect(() => {
    const getNextCompetition = () => {
        console.log(1);
        if (!mockTableDataList || !Array.isArray(mockTableDataList)) {
            console.log(2);

            setMockNextCompetition(null);
            // setNextCompetitionData(null);
        }

        const currentDate = new Date();

        for (const meet of mockTableDataList) {
            console.log(meet);
            if (!meet || typeof meet !== "object" || !meet.date) {
                console.log(3);
                continue;
            }

            const [day, month, year] = meet.date.split("-").map(Number);

            const meetDate = new Date(year, month - 1, day);
            console.log(meetDate);

            if (meet.state === "active" && meetDate >= currentDate) {
                console.log(4);

                setMockNextCompetition(meet);
                // setNextCompetitionData(meet);
            }
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    useEffect(() => {
        getNextCompetition();
    }, []);

    useEffect(() => {
        console.log(mockNextCompetition);
    }, [mockNextCompetition]); // Adding mockNextCompetition as a dependency

    return (
        <div className={classes.topCardContainer}>
            <NextCompetition
                changeCompDetailsModal={props.changeCompDetailsModal}
                // nextCompetitionData={nextCompetitionData}
                mockNextCompetition={mockNextCompetition}
            />
            <CompetitionsList
                mockDataList={mockTableDataList}
                setMockTableDataList={setMockTableDataList}
            />
        </div>
    );
}

export default Home;
