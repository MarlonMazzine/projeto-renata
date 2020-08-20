import React from 'react'
import ModalTabelaDeCompras from './ModalTabelaDeCompras'
import 'bootstrap/dist/css/bootstrap.min.css'

function obterCorpoDaRequisicao(ano, nomeDaMarca) {
    return JSON.stringify({
        nomeDaMarca: nomeDaMarca,
        anoDaCompra: ano
    })
}

export default class ListarMarcas extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            compras: [],
            modalState: false
        }
    }
    async carregarTabelaDeCompras(ano, nomeDaMarca) {
        ano = ano === 'Todas' ? '20' : ano
        const corpoDaRequisicao = obterCorpoDaRequisicao(ano, nomeDaMarca)
        const resposta = await fetch(
            'http://localhost:5000/comprasporanoemarca',
            {
                method: 'POST',
                body: corpoDaRequisicao,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        ).then(async (res) => {
            const resp = await res.json()
            return await resp.rows
        })

        await this.setState({ compras: resposta })

        if (this.state.compras.length !== 0) {
            await this.setState({ modalState: true })
        } else {
            alert(`Não há nenhuma compra para exibir no ano de ${ano} da marca ${nomeDaMarca}.`)
        }
    }

    render() {
        if (this.props.marcas === '') {
            return null
        }

        const anos = ['2015', '2016', '2017', '2018', '2019', '2020']

        return (
            <React.Fragment>
                <div id="listasDeMarcasDeComprasSLicitacao" className="w-50 ml-450px">
                    <ul className="list-group">
                        {this.props.marcas.map((marca, i) => {
                            return <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                {marca.nome}
                                <div className="btn-group">
                                    {anos.map((ano, j) => {
                                        return <button
                                            key={j}
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={this.carregarTabelaDeCompras.bind(this, ano, marca.nome)}>
                                            {ano}
                                        </button>
                                    })}
                                    <button type="button" className="btn minha-cor text-light" onClick={this.carregarTabelaDeCompras.bind(this, 'Todas', marca.nome)}>
                                        Todas
                                </button>
                                </div>
                            </li>
                        })}
                    </ul>
                </div>

                <ModalTabelaDeCompras compras={this.state.compras} modalState={this.state.modalState} />
            </React.Fragment>
        )
    }
}
