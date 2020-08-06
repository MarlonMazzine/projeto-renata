import React, { Component, Fragment } from 'react'
// import { Accordion, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import BotaoCarregarComprasDoBanco from './interfaces/BotaoCarregarComprasDoBanco'
import BotaoCarregarComprasDaApi from './interfaces/BotaoCarregarComprasDaApi'
import Modal from './interfaces/Modal'

class index extends Component {
    render() {
        return (
            <Fragment>
                <BotaoCarregarComprasDoBanco />
                <BotaoCarregarComprasDaApi />
                <Modal />
            </Fragment>
        );
    }
}

export default index;