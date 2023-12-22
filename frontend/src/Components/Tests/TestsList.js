import React, { Component } from 'react';
import axios from 'axios';

class TestsList extends Component {
  state = {
    tests: []
  };

  componentDidMount() {
    this.getProvasFromAPI();
  }

  getProvasFromAPI = () => {
    axios.get('http://localhost:8000/api/lxf/') 
      .then(response => {
        this.setState({
            tests: response.data 
        });
      })
      .catch(error => {
        console.error('Erro ao buscar provas:', error);
      });
  };

  render() {
    const { tests } = this.state;

    return (
      <div className="ListaProvas">
        <h2>Lista de Provas</h2>
        {tests.length > 0 ? (
          <ul>
            {tests.map(test => (
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
}

export default TestsList;
