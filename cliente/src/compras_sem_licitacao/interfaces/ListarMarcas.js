import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const ListarMarcas = ({ marcas }) => {
    if (marcas === '') {
        return null
    }

    function carregarComprasPorAno(ano, nomeDaMarca) {
        alert('Clicou no ano ' + ano + ' da marca ' + nomeDaMarca)
    }

    const anos = ['2015', '2016', '2017', '2018', '2019', '2020']

    return (
        <React.Fragment>
            <div id="listasDeMarcasDeComprasSLicitacao" style={{position: "absolute"}}>
                <Accordion>
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
                </Accordion>
            </div>
        </React.Fragment>
    )
}

export default ListarMarcas