import React, { useState, useEffect } from "react";
import axios from "axios";

function ListComps() {
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

    return (
        <div className="ListaProvas">
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
    );
}

export default ListComps;
