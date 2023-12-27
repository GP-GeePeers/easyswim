import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./ListComps.module.css";
import Sidebar from "../../Components/Sidebar/Sidebar";

function ListComps(props) {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        const getTestsFromAPI = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/lxf/"
                );
                setTests(response.data);
            } catch (error) {
                console.error("Erro ao buscar provas:", error);
            }
        };

        getTestsFromAPI();
    }, []);

    let contentContainer;
    contentContainer = classes.contentContainer;
    if (props.retracted === true) {
        contentContainer += ` ${classes.contentContainerRetracted}`;
    }

    return (
        <div className={classes.container}>
            <Sidebar
                retracted={props.retracted}
                setRetracted={props.setRetracted}
                clicked={true}
            />
            <div className={contentContainer}>
                <h2>Lista de Provas</h2>
                {tests.length > 0 ? (
                    <ul>
                        {tests.map((test) => (
                            <li key={test.id}>
                                <p>Título: {test.title}</p>
                                <p>Descrição: {test.description}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhuma prova encontrada.</p>
                )}
            </div>
        </div>
    );
}

export default ListComps;
