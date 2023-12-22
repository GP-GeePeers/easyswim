import React, {Component} from 'react';
import axios from 'axios';
import TestsList from './Components/Tests/TestsList';
import { BrowserRouter  as Router, Route, Routes} from "react-router-dom";

class App extends Component {
  
  state = {
    title: '',
    description: '',
    lxf_file: null
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Verificar se o ficheiro tem a extensao .lxf
    if (selectedFile && selectedFile.name.endsWith('.lxf')) {
      this.setState({
        lxf_file: selectedFile
      });
    } else {
      alert('Por favor introduza um ficheiro .lxf válido.')
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);

    let form_data = new FormData();
    form_data.append('lxf_file', this.state.lxf_file, this.state.lxf_file.name);
    form_data.append('title', this.state.title);
    form_data.append('description', this.state.description);

    let url = 'http://localhost:8000/api/lxf/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
      .then(res => {
        console.log(res.data);

        // Limpar os campos do formulario apos uma submissao com sucesso
        this.setState({
          title: '',
          description: '',
          lxf_file: null
        });
  
        alert('Ficheiro submetido com sucesso!');
      })
      .catch(err => console.log(err))
  };


  render() {
    return (
      <Router>
        <Routes>
        <Route path="/TestsList" element={<TestsList />} />
        <Route path="/" element={
        <div className="App">
          <form onSubmit={this.handleSubmit}>
            <p>
              <input type="text" placeholder='Title' id='title' value={this.state.title} onChange={this.handleChange} required/>
            </p>
            <p>
              <input type="text" placeholder='Description' id='description' value={this.state.description} onChange={this.handleChange} />
            </p>
            <p>
              <input type="file" id='lxf_file' accept='.lxf' onChange={this.handleFileChange} required/>
            </p>
            <input type="submit"/>
          </form>
          
          
        </div>
        }/>
      </Routes>
      </Router>
    );
  }
}


export default App;
