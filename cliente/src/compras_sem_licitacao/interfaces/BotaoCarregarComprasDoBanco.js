import React from 'react'
import Compras from '../banco/Compras'
import Marcas from '../banco/Marcas'
import 'bootstrap/dist/css/bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'

export default class BotaoCarregarComprasDoBanco extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            listaDeMarcas: []
        }
    }
    
    async carregarComprasSemLicitacaoDoBanco() {
        this.setState({ showModal: true })
        debugger
        const comprasDoBanco = await new Compras().carregarCompras()

        if (this.isComecaComTrecho(comprasDoBanco.toString(), ['Não há nenhuma', 'Houve um erro'])) {
            alert(comprasDoBanco)
        } else {
            const marcasDoBanco = await new Marcas().carregarMarcas()
            this.verificarSeVaiAdicionarMarcas(marcasDoBanco)
        }

        this.fecharModal()
    }

    verificarSeVaiAdicionarMarcas(marcas) {
        if (this.isComecaComTrecho(marcas.toString(), ['Não há nenhuma', 'Houve um erro'])) {
            alert(marcas)
        } else {
            this.setState({ listaDeMarcas: marcas })
        }
    }

    isComecaComTrecho(texto, paramentros) {
        for (var string in paramentros) {
            if (texto.startsWith(string)) {
                return true
            }
        }

        return false
    }

    async fecharModal() {
        this.sleep(1000).then(() => {
            this.setState({ showModal: false })
        })
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    render () {
        return (
            <React.Fragment>
                <button className="primary" onClick={this.carregarComprasSemLicitacaoDoBanco.bind(this)}>
                    Carregar compras sem licitação
                </button>
            </React.Fragment>
        )
    }
}