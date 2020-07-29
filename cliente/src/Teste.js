import React, { Component, Fragment } from 'react'
import { Accordion, Card, Button, Modal, ProgressBar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

const codigosDosMateirias = ['276234', '276233', '273836', '433218', '442011', '399010']
const qtdCodigosDosMateriais = codigosDosMateirias.length

class Teste extends Component {
    constructor(props) {
        super(props)

        this.state = {
            linksDoItem: [],
            listaDeComprasSemLicitacao: [],
            textoBotaoComprasSemLicitacao: 'Carregar compras sem licitação',
            showModal: false,
            listaDeMarcas: [],
        }

        this.obterComprasSemLicitacao = this.obterComprasSemLicitacao.bind(this)
    }

    async obterComprasSemLicitacao() {
        const teste = await axios.get('/teste')
        console.log(teste);

        // this.setState({ showModal: true })
        // var linkDoItem = []

        // // for (var i = 0; i < qtdCodigosDosMateriais; i++) {
        //     const resposta = await axios.get(
        //         '/compraSemLicitacao/v1/itens_compras_slicitacao.json',
        //         {
        //             params: {
        //                 co_conjunto_materiais: '399010'//codigosDosMateirias[i]
        //             }
        //         }
        //     ).catch(error => {
        //         alert('Houve um erro ao obter compras sem licitação para o item "399010". Por favor, tente novamente.')
        //         this.setState({ showModal: false })
        //     })

        //     var listaDeComprasDe2015 = []
        //     var dataRecebida
        //     var comprasSemLicitacao = resposta.data._embedded.compras

        //     for (var x in comprasSemLicitacao) {
        //         dataRecebida = new Date(comprasSemLicitacao[x].dtDeclaracaoDispensa.toString())

        //         if (dataRecebida.getFullYear() >= '2015') {
        //             listaDeComprasDe2015.push(comprasSemLicitacao[x])
        //             linkDoItem.push(comprasSemLicitacao[x]._links.Itens.href)
        //         }
        //     }
        //     debugger
        //     this.setState({ listaDeComprasSemLicitacao: listaDeComprasDe2015 })
        //     this.setState({ linksDoItem: linkDoItem })
        //     this.obterItensDeCompraSemLicitacao()
        // // }
    }

    async obterItensDeCompraSemLicitacao() {
        var linkDoItem
        var todasAsMarcas = []
        var marcas = []
        var hasError
        var qtdDeLinks = this.state.linksDoItem.length

        for (var link = 0; link < qtdDeLinks; link++) {
            linkDoItem = (this.state.linksDoItem[link.toString()].toString().replace('/id/', '/doc/') + '.json').toString()
            hasError = false

            const res = await axios.get(
                linkDoItem
            ).catch(err => {
                hasError = true
            })

            if (hasError) {
                link--
                continue
            }

            for (var x in res.data._embedded.compras) {
                todasAsMarcas.push(res.data._embedded.compras[x].no_marca_material.toUpperCase())
            }

            console.log('dentro do for')
        }

        todasAsMarcas.forEach(function (value) {
            if (marcas.indexOf(value) === -1) {
                marcas.push(value)
            }
        });

        console.log(marcas)
        this.setState({ showModal: false })
        this.setState({ listaDeMarcas: marcas })
        document.getElementById('listasDeMarcasDeComprasSLicitacao').hidden = false
        console.log('saindo')
    }

    listarMarcas() {
        for (var i in this.state.listaDeMarcas) {
            return <p>this.state.listaDeMarcas[i]</p>
        }
    }

    render() {
        return (
            <Fragment>
                <Button onClick={this.obterComprasSemLicitacao} variant="primary">
                    {this.state.textoBotaoComprasSemLicitacao}
                </Button>
                {/* <Button onClick={this.exibirModal.bind(this)}>Abrir modal</Button> */}
                <Modal show={this.state.showModal} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
                    {/* <Modal.Header closeButton onClick={this.fecharModal.bind(this)}>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header> */}

                    <Modal.Body>
                        <ProgressBar animated now={100} />
                        <p className="mt-2 mb-0 text-center">Carregando...</p>
                    </Modal.Body>

                    {/* <Modal.Footer>
                        <Button variant="secondary">Close</Button>
                        <Button variant="primary">Save changes</Button>
                    </Modal.Footer> */}
                </Modal>
                {/* <div id="divDeTeste" style={{ width: 'auto', height: 'auto' }} className="container text-white bg-dark" hidden>
                    {this.state.listaDeMarcas.map((listaDeMarcas, index) => {
                        return <p>{listaDeMarcas}</p>
                    })}
                </div> */}
                <div id="listasDeMarcasDeComprasSLicitacao" hidden>
                    <Accordion>
                        {this.state.listaDeMarcas.map((listaDeMarcas, i) => {
                            return <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={i.toString()}>
                                        {listaDeMarcas}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={i.toString()}>
                                    <Card.Body>
                                        <p>
                                            <a href="/">2015</a>
                                        </p>
                                        <p>
                                            <a href="/">2016</a>
                                        </p>
                                        <p>
                                            <a href="/">2017</a>
                                        </p>
                                        <p>
                                            <a href="/">2018</a>
                                        </p>
                                        <p>
                                            <a href="/">2019</a>
                                        </p>
                                        <p>
                                            <a href="/">2020</a>
                                        </p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        })}
                    </Accordion>
                </div>

                {/* <Button onClick={this.obterComprasSemLicitacao}>
                    Atualizar
                </Button> */}
            </Fragment>
        );
    }
}

export default Teste;