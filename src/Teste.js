import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'

class Teste extends Component {
    constructor(props) {
        super(props);

        this.state = {
            texto: ''
        }
    }

    chandeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmitHandler = e => {
        e.preventDefault()
        console.log(this.state)

        //com esse axios eu consigo obter todos os códigos de insulinas

        axios.post(
            'https://siasgnet-consultas.siasgnet.estaleiro.serpro.gov.br/api/v1/search/treeitem',
            {
                text: 'insulina',
                tipoPesquisa: 'T',
                codigoNivelArvore: null,
                nivelArvore: 0,
                tipoRestricaoPalavraChave: 'OR'
            },
            {
                headers: {
                    'content-type': 'application/json'
                }
            }
        ).then(res => {
            for(var x in res.data.data) {
                console.log(x, res.data.data[x].codigo)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const { texto } = this.state

        return (
            <form onSubmit={this.onSubmitHandler}>
                <div className="form-group">
                    <input type="text" name="texto" className="form-control" value={texto} onChange={this.chandeHandler} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

export default Teste;