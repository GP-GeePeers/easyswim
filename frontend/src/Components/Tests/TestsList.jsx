import React, { useState, useEffect } from "react";
import axios from "axios";

function TestsList() {
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
    }, []); // The empty dependency array ensures this effect runs once on mount

    return (
        <div className="ListaProvas">
            <h2>Lista de Provas</h2>
            {tests.length > 0 ? (
                <ul>
                    {tests.map((test) => (
                        <li key={test.id}>
                            <p>Título: {test.title}</p>
                            <p>Descrição: {test.description}</p>
                            {/* Outros detalhes da prova */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhuma prova encontrada.</p>
            )}
        </div>
    );
}

export default TestsList;
