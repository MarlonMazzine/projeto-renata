import React from 'react'
import Compras from '../banco/Compras'
import Marcas from '../banco/Marcas'
import Modal from './Modal'
import ListarMarcas from '../interfaces/ListarMarcas'
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css'

ListarMarcas.propTypes = {
    marcas: PropTypes.array.isRequired
}

export default class BotaoCarregarComprasDoBanco extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            listaDeMarcas: []
        }
    }
    
    async carregarComprasSemLicitacaoDoBanco() {
        new Modal().setModalState('modalCarregando')

        const comprasDoBanco = await new Compras().carregarCompras()

        if (this.isComecaComTrecho(comprasDoBanco.toString(), ['Não há nenhuma', 'Houve um erro'])) {
            alert(comprasDoBanco)
        } else {
            const marcasDoBanco = await new Marcas().carregarMarcas()
            this.verificarSeVaiAdicionarMarcas(marcasDoBanco)
        }

        new Modal().setModalState('modalCarregando')
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

    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-primary" onClick={this.carregarComprasSemLicitacaoDoBanco.bind(this)}>
                    Carregar compras<br />sem licitação
                </button>

                <ListarMarcas marcas={this.state.listaDeMarcas}/>
            </React.Fragment>
        )
    }
}