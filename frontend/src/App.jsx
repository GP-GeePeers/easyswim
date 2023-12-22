import React, { useState } from "react";
import axios from "axios";
import TestsList from "./Components/Tests/TestsList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [lxf_file, setLxfFile] = useState(null);

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
        console.log(this.state);

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
        <Router>
            <Routes>
                <Route path="/TestsList" element={<TestsList />} />
                <Route
                    path="/"
                    element={
                        <div className="App">
                            <form onSubmit={handleSubmit}>
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
                            </form>
                        </div>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
