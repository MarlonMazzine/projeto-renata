import React, { Component, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ListarMarcas from './interfaces/ListarMarcas'
import BotaoCarregarComprasDoBanco from './interfaces/BotaoCarregarComprasDoBanco'
// import BotaoCarregarComprasDaApi from './interfaces/BotaoCarregarComprasDaApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt, faDatabase } from '@fortawesome/free-solid-svg-icons'
import Modal from './interfaces/Modal'

class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listaDeMarcas: []
        }
    }

    setListaDeMarcas = (marcas) => {
        this.setState({ listaDeMarcas: marcas })
    }

    render() {
        return (
            <Fragment>
                <div id="sidebar" className="minha-cor text-white vh-100 w-25 position-fixed">
                    <div className="mb-4">
                        <p className="h2 pl-3 pt-3 pb-4">Compras sem licitação</p>
                        <div className="w-100 minha-cor">
                            <ol className="list-group">
                                <BotaoCarregarComprasDoBanco setListaDeMarcas={this.setListaDeMarcas} />
                                <li type="button" className="text-center minha-cor w-100 h-50p pt-3">
                                    <FontAwesomeIcon className="mr-3" icon={faSyncAlt} />
                                    Atualiza compras
                                </li>
                            </ol>
                        </div>
                    </div>
                    <p className="h2 pl-3 pt-3 pb-4">Licitações pregões</p>
                    <div className="w-100 minha-cor">
                        <ol className="list-group">
                            <li type="button" className="text-center minha-cor w-100 h-50p pt-3">
                                <FontAwesomeIcon className="mr-3" icon={faDatabase} />
                                Carregar compras
                            </li>
                            <li type="button" className="text-center minha-cor w-100 h-50p pt-3">
                                <FontAwesomeIcon className="mr-3" icon={faSyncAlt} />
                                Atualiza compras
                            </li>
                        </ol>
                    </div>
                    {/*<BotaoCarregarComprasDaApi />
                    <BotaoCarregarComprasDoBanco /> */}
                </div>
                {/* <hr className="border-dark"></hr> */}
                <ListarMarcas marcas={this.state.listaDeMarcas} />
                <Modal />
            </Fragment>
        );
    }
}

export default index;