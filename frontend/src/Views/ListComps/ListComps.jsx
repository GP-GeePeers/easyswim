import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./ListComps.module.css";

function ListComps(props) {
    const [tests, setTests] = useState([]);
    let container = classes.container;

    if (props.retracted === true) {
        container += ` ${classes.containerRetracted}`;
    }

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

    return (
        <div className={container}>
            <div className={classes.contentContainer}>
                <h1>Lista de Provas</h1>
                {/* {tests.length > 0 ? (
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
                )} */}
            </div>
        </div>
    );
}

export default ListComps;