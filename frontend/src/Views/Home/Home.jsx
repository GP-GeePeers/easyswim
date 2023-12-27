import React, { useState } from "react";
import axios from "axios";
import classes from "./Home.module.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Button from "../../Components/Buttons/Button";

function Home(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [lxf_file, setLxfFile] = useState(null);
    let contentContainer;
    let headerContainer;

    contentContainer = classes.contentContainer;
    headerContainer = classes.headerContainer;
    if (props.retracted === true) {
        contentContainer += ` ${classes.contentContainerRetracted}`;
    }

    const handleChange = (e) => {
        if (e.target.id === "title") {
            setTitle(e.target.value);
        } else if (e.target.id === "description") {
            setDescription(e.target.value);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        // Check if the file has the .lxf extension
        if (selectedFile && selectedFile.name.endsWith(".lxf")) {
            setLxfFile(selectedFile);
        } else {
            alert("Por favor introduza um ficheiro .lxf válido.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let form_data = new FormData();
        form_data.append("lxf_file", lxf_file, lxf_file.name);
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

                alert("Ficheiro submetido com sucesso!");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className={classes.container}>
            <Sidebar
                retracted={props.retracted}
                setRetracted={props.setRetracted}
                clicked={false}
            />
            <div className={contentContainer}>
                <div className={headerContainer}>
                    <h1>Olá {props.organization} 👋</h1>

                    <Button
                        text={"Criar prova"}
                        onClick={() => {
                            /* TODO: openModal */
                        }}
                    />
                </div>
                <h1>Homepage</h1>
            </div>

            {/* <form onSubmit={handleSubmit}>
                <p>
                    <input
                        type="text"
                        placeholder="Title"
                        id="title"
                        value={title}
                        onChange={handleChange}
                        required
                    />
                </p>
                <p>
                    <input
                        type="text"
                        placeholder="Description"
                        id="description"
                        value={description}
                        onChange={handleChange}
                    />
                </p>
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
            </form> */}
        </div>
    );
}

export default Home;
