import React from 'react'
import Compras from '../banco/buscar_no_banco/Compras'
import Marcas from '../banco/buscar_no_banco/Marcas'
import Modal from './Modal'
import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase } from '@fortawesome/free-solid-svg-icons'

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
            this.props.setListaDeMarcas(this.state.listaDeMarcas)
        }
    }

    isComecaComTrecho(texto, paramentros) {
        for (var i in paramentros) {
            if (texto.startsWith(paramentros[i])) {
                return true
            }
        }

        return false
    }

    render() {
        return (
            <React.Fragment>
                <li type="button"
                    className="text-center minha-cor w-100 h-50p pt-3"
                    onClick={this.carregarComprasSemLicitacaoDoBanco.bind(this)}
                    data-id="1">
                    <FontAwesomeIcon className="mr-3" icon={faDatabase} />
                    Carregar compras
                </li>
            </React.Fragment>
        )
    }
}