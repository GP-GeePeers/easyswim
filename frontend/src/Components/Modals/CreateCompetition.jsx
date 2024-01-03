import React, { useState } from "react";
import axios from "axios";
import classes from "./CreateCompetition.module.css";

function CreateCompetition(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [lxfFile, setLxfFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState(""); // New state for error message

    const handleCloseModal = () => {
        // Call the changeCreateCompModal function to close the modal
        props.changeCreateCompModal();
    };

    const handleChange = (e) => {
        if (e.target.id === "title") {
            setTitle(e.target.value);
        } else if (e.target.id === "description") {
            setDescription(e.target.value);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setErrorMessage("");
        // Check if the file has the .lxf extension

        if (selectedFile && selectedFile.name.endsWith(".lxf")) {
            setLxfFile(selectedFile);
            setErrorMessage(""); // Clear error message on valid file
        } // else {
        //     setErrorMessage("Por favor introduza um ficheiro .lxf válido.");
        // }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (errorMessage) {
            // Do not submit if there is an error
            return;
        }

        let form_data = new FormData();
        form_data.append("lxf_file", lxfFile, lxfFile.name);
        form_data.append("title", title);
        form_data.append("description", description);

        let url = "http://localhost:8000/api/lxf/";
        axios
            .post(url, form_data, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res.data);

                // Clear the form fields after a successful submission
                setTitle("");
                setDescription("");
                setLxfFile(null);

                // Show success message
                setErrorMessage("Ficheiro submetido com sucesso!");
            })
            .catch((err) => console.log(err));
    };

    // TODO - fazer uma animação para, onSuccess do request mudar uma variável que muda a visibilidade do conteudo, mostra a mensagem de sucesso e, depois de 3 segundos, fecha o modal

    return (
        <div>
            {props.createCompModal && (
                <div
                    className={classes.createCompModalOverlay}
                    onClick={handleCloseModal}
                >
                    <div
                        className={classes.createCompModal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1>Upload ficheiro</h1>
                        <p>
                            Arraste um ficheiro para esta janela ou escolha um
                            ficheiro
                        </p>
                        <form onSubmit={handleSubmit}>
                            <p>
                                <input
                                    type="file"
                                    id="lxf_file"
                                    accept=".lxf"
                                    onChange={handleFileChange}
                                    required
                                />
                            </p>
                            <input type="submit" />
                        </form>
                        <button /*onClick={props.changeCreateCompModal}*/>
                            Submeter
                        </button>
                        <button /*onClick={props.changeCreateCompModal}*/>
                            Ver ficheiro
                        </button>
                        <button onClick={props.changeCreateCompModal}>
                            Cancelar
                        </button>

                        {errorMessage && (
                            <p className={classes.error}>{errorMessage}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateCompetition;
