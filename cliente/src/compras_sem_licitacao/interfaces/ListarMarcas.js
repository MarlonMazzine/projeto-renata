import React from 'react'
// import { Accordion, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const ListarMarcas = ({ marcas, qtdDeComprasPorMarca }) => {
    if (marcas === '') {
        return null
    }

    function carregarComprasPorAno(ano, nomeDaMarca) {
        alert('Clicou no ano ' + ano + ' da marca ' + nomeDaMarca)
    }

    const anos = ['2015', '2016', '2017', '2018', '2019', '2020']

    return (
        <div id="listasDeMarcasDeComprasSLicitacao" className="w-50 ml-450px">
            <ul className="list-group">
                {marcas.map((listaDeMarcas) => {
                    return <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="badge badge-primary badge-pill">14</span>
                        {listaDeMarcas.nome}
                        <div className="btn-group">
                            {anos.map((ano) => {
                                return <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => carregarComprasPorAno(ano, listaDeMarcas.nome)}>
                                    {ano}
                                </button>
                            })}
                        </div>
                    </li>
                })}
            </ul>

            {/* <Accordion>
                {marcas.map((listaDeMarcas) => {
                    return <Card>
                        <Card.Header>
                            <Accordion.Toggle className="btn btn-link" eventKey={listaDeMarcas.id.toString()}>
                                {listaDeMarcas.nome}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={listaDeMarcas.id.toString()}>
                            <Card.Body>
                                <div className="btn-group">
                                    {anos.map((ano) => {
                                        return <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => carregarComprasPorAno(ano, listaDeMarcas.nome)}>
                                            {ano}
                                        </button>
                                    })}
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                })}
            </Accordion> */}
        </div>
    )
}

export default ListarMarcas