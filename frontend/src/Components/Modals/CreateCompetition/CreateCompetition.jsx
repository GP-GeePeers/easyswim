import React, { useState, createRef, useEffect } from "react";
import axios from "axios";
import classes from "./CreateCompetition.module.css";
import Button from "../../Buttons/Button";
import Card from "../../Cards/Card";
import addDocument from "../Assets/addDocument.png";
import document_ from "../Assets/document.png";
import CompetitionDetails from "../CompetitionDetails/CompetitionDetails";

function CreateCompetition(props) {
    const [lxfFile, setLxfFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showFile, setShowFile] = useState(false);
    const [filePreview, setFilePreview] = useState();
    const fileInputRef = createRef();

    useEffect(() => {
        // Clear the error message if the modal is closed
        setErrorMessage("");
        setSuccessMessage("");
        setLxfFile(null);
    }, [props.createCompModal]);

    useEffect(() => {
        if (errorMessage) {
            setSuccessMessage("");
        } else if (successMessage) {
            setErrorMessage("");
        }
    }, [errorMessage, successMessage]);

    const handleCloseModal = () => {
        props.changeCreateCompModal();
    };

    const handleSelectedFile = () => {
        const selectedFile = fileInputRef.current.files[0];

        // Check if a file is selected
        if (!selectedFile) {
            setErrorMessage("Por favor, selecione um ficheiro.");
            return;
        }

        // Check if the file has the .lxf extension
        if (selectedFile.name.endsWith(".lxf")) {
            setLxfFile(selectedFile);
            setErrorMessage(""); // Clear error message on a valid file
        } else {
            setErrorMessage("Por favor, introduza um ficheiro .lxf válido.");
        }
    };

    const handleDroppedFile = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];

        if (droppedFile && droppedFile.name.endsWith(".lxf")) {
            setLxfFile(droppedFile);
            setErrorMessage(""); // Clear error message on valid file
        } else {
            setErrorMessage("Por favor, introduza um ficheiro .lxf válido.");
        }
    };

    const handleSubmit = (e) => {
        // e.preventDefault();

        if (errorMessage) {
            // Do not submit if there is an error
            return;
        }

        let form_data = new FormData();
        if (lxfFile) {
            form_data.append("lxf_file", lxfFile, lxfFile.name);
            form_data.append("title", lxfFile.name);
            //form_data.append("id", 1);
            console.log(123);
        } else {
            setErrorMessage("Por favor, selecione um ficheiro.");
        }

        //const csrftoken = document.cookie.match(/csrftoken=([^;]*)/)[1];
        //console.log(csrftoken);
        let url = "http://localhost:8000/api/lxf-meet-confirmation/";
        axios
            .post(url, form_data, {
                headers: {
                    "content-type": "multipart/form-data",
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    //'X-CSRFToken': `${csrftoken}`,
                },
                withCredentials: true, // Include this line in the configuration object
            })
            .then((res) => {
                console.log(res.data);

                // Clear the form fields after a successful submission
                setLxfFile(null);

                setErrorMessage("");
                setSuccessMessage("Ficheiro submetido com sucesso!");
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response.data);
                setErrorMessage("ERRO: " + err.message);
            });
    };

    const formatFileSize = (bytes) => {
        const units = ["Bytes", "KB", "MB", "GB", "TB"];
        let i = 0;

        while (bytes >= 1024 && i < units.length - 1) {
            bytes /= 1024;
            i++;
        }

        return `${bytes.toFixed(2)} ${units[i]}`;
    };

    const handleFilePreview = async () => {
        if (lxfFile) {
            if (errorMessage) {
                // Do not submit if there is an error
                return;
            }

            let form_data = new FormData();
            if (lxfFile) {
                form_data.append("lxf_file", lxfFile, lxfFile.name);
                form_data.append("title", lxfFile.name);
            } else {
                setErrorMessage("Por favor, selecione um ficheiro.");
            }

            let url = "http://localhost:8000/api/lxf-meet-preview/";
            axios
                .post(url, form_data, {
                    headers: {
                        "content-type": "multipart/form-data",
                        'Authorization': `JWT ${localStorage.getItem('access')}`
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    setFilePreview(res.data);
                })
                .catch((err) => {
                    console.log(err);
                    setErrorMessage("ERRO: " + err.message);
                });
        }
    };

    const handleShowFile = () => {
        if (lxfFile) {
            setShowFile(!showFile);
            handleFilePreview();
        } else {
            setErrorMessage("Por favor, selecione um ficheiro.");
        }

        if (showFile) {
            setShowFile(!showFile);
        }
    };

    const handleSubmitOnPreview = () => {
        handleSubmit();
        setShowFile(!showFile);
    };

    return (
        <div>
            {showFile && filePreview && (
                <CompetitionDetails
                    compDetailsModal={showFile}
                    changeCompDetailsModal={handleShowFile}
                    handleSubmitOnPreview={handleSubmitOnPreview}
                    filePreview={filePreview}
                />
            )}
            {props.createCompModal && (
                <div
                    className={
                        !showFile ? classes.createCompModalOverlay : classes._
                    }
                    onClick={handleCloseModal}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => e.preventDefault()}
                    onDrop={handleDroppedFile}
                >
                    <div
                        className={classes.createCompModal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={classes.headerContainer}>
                            <div className={classes.title}>Upload ficheiro</div>
                            <Button
                                type={"secondary"}
                                text={"Cancelar"}
                                onClick={props.changeCreateCompModal}
                            />
                        </div>
                        <div className={classes.topCardContainer}>
                            <Card centered>
                                <img
                                    src={addDocument}
                                    style={{
                                        backgroundColor: "transparent",
                                        borderRadius: "8px",
                                    }}
                                    alt="Add Document"
                                    className={classes.Logo}
                                />
                                <div className={classes.textCombo}>
                                    <p>
                                        Arraste um ficheiro para esta janela ou
                                    </p>
                                    <input
                                        type="file"
                                        accept=".lxf"
                                        onInput={handleSelectedFile}
                                        style={{ display: "none" }}
                                        ref={fileInputRef}
                                        id="fileInput"
                                    />
                                    <label
                                        htmlFor="fileInput"
                                        style={{
                                            color: "#72D5C8",
                                            marginLeft: "6px",
                                            cursor: "pointer",
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevents the label from triggering the file input click
                                        }}
                                        onMouseDown={() => {
                                            fileInputRef.current.click();
                                        }}
                                    >
                                        escolha um ficheiro
                                    </label>
                                </div>
                                {errorMessage && (
                                    <p className={`${classes.errorText}`}>
                                        {errorMessage}
                                    </p>
                                )}
                                {successMessage && (
                                    <p className={`${classes.successText}`}>
                                        {successMessage}
                                    </p>
                                )}
                            </Card>
                        </div>
                        <div className={classes.bottomCardContainer}>
                            <Card>
                                <div className={classes.inputFile}>
                                    <img
                                        src={document_}
                                        alt="Document"
                                        className={classes.Logo}
                                    />
                                    <p>
                                        {lxfFile
                                            ? lxfFile.name
                                            : "Introduza um ficheiro"}
                                    </p>
                                    <p>
                                        {lxfFile &&
                                            formatFileSize(lxfFile.size)}
                                    </p>
                                </div>
                            </Card>
                        </div>
                        <div className={classes.buttonsContainer}>
                            <Button text={"Submeter"} onClick={handleSubmit} />
                            <Button
                                type={"secondary"}
                                text={"Ver Ficheiro"}
                                onClick={handleShowFile}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateCompetition;
