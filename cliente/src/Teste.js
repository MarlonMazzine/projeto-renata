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
            showModal: false,
            listaDeMarcas: [],
        }

        this.carregarComprasSemLicitacao = this.carregarComprasSemLicitacao.bind(this)
        this.carregarComprasSemLicitacaoDoBanco = this.carregarComprasSemLicitacaoDoBanco.bind(this)
        this.carregarComprasPorAno = this.carregarComprasPorAno.bind(this)
    }

    async carregarComprasSemLicitacaoDoBanco() {
        this.setState({ showModal: true })
        const teste = await axios.get('http://localhost:5000/comprassemlicitacao')
        .catch(err => {
            this.setState({ showModal: false })
        })
        this.setState({ listaDeComprasSemLicitacao: teste.data.rows })
        this.carregarTodasAsMarcasCadastradas()
        this.setState({ showModal: false })
    }

    async carregarTodasAsMarcasCadastradas() {
        const teste = await axios.get('http://localhost:5000/todasasmarcas')
        this.setState({ listaDeMarcas: teste.data.rows })
    }

    async carregarComprasSemLicitacao() {
        this.setState({ showModal: true })
        var linkDoItem = []

        // for (var i = 0; i < qtdCodigosDosMateriais; i++) {
        const resposta = await axios.get(
            '/compraSemLicitacao/v1/itens_compras_slicitacao.json',
            {
                params: {
                    co_conjunto_materiais: '399010'//codigosDosMateirias[i]
                }
            }
        ).catch(error => {
            this.setState({ showModal: false })
            alert('Houve um erro ao obter compras sem licitação para o item "399010". Por favor, tente novamente. Erro: ' + error.data)
        })

        var listaDeComprasDe2015 = []
        var dataRecebida
        var comprasSemLicitacao = resposta.data._embedded.compras

        for (var x in comprasSemLicitacao) {
            dataRecebida = new Date(comprasSemLicitacao[x].dtDeclaracaoDispensa.toString())

            if (dataRecebida.getFullYear() >= '2015') {
                listaDeComprasDe2015.push(comprasSemLicitacao[x])
                linkDoItem.push(comprasSemLicitacao[x]._links.Itens.href)
            }
        }

        this.setState({ listaDeComprasSemLicitacao: listaDeComprasDe2015 })
        this.setState({ linksDoItem: linkDoItem })
        this.obterItensDeCompraSemLicitacao()
        // }
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
            } else {
                for (var x in res.data._embedded.compras) {
                    todasAsMarcas.push(res.data._embedded.compras[x].no_marca_material.toUpperCase())
                }
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
        this.atualizarTabelaDeComprasSemLicitacao()
        document.getElementById('listasDeMarcasDeComprasSLicitacao').hidden = false
        console.log('saindo')
    }

    async atualizarTabelaDeComprasSemLicitacao() {
        const resposta = await axios.post('http://localhost:5000/atualizartabeladecomprassemlicitacao', {
            codigodacompra: '123',
            nomedamarca: 'abc',
            datadacompra: '2015-01-01',//.slice(0, -14),
            modalidade: 'Indeciso',
            codigocatmat: 123456,
            descricaodoitem: 'abc',
            unidadedefornecimento: 'fdfdfd',
            quantidadeofertada: 456,
            valorunitario: 456,
            nomedofornecedor: 'abc',
            uasg: 123,
            uf: 'RJ'
        })
            .then(response => {
                if (response.data.severity === 'ERROR') {
                    return 'Não foi possível atualizar pois ocorreu um erro em: ' + response.data.routine
                }
                return response.data
            })

        alert(resposta)
    }

    listarMarcas() {
        for (var i in this.state.listaDeMarcas) {
            return <p>this.state.listaDeMarcas[i]</p>
        }
    }

    carregarComprasPorAno(ano, nomeDaMarca) {
        alert('Clicou no ano ' + ano + ' da marca ' + nomeDaMarca)
    }

    render() {
        const anos = ['2015', '2016', '2017', '2018', '2019', '2020']
        return (
            <Fragment>
                <Button onClick={this.carregarComprasSemLicitacaoDoBanco} variant="primary">
                    Carregar compras sem licitação
                </Button>
                <Button onClick={this.carregarComprasSemLicitacao} variant="primary">
                    Atualizar lista de compras sem licitação
                </Button>
                <Modal show={this.state.showModal} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
                    <Modal.Body>
                        <ProgressBar animated now={100} />
                        <p className="mt-2 mb-0 text-center">Carregando...</p>
                    </Modal.Body>
                </Modal>
                <div id="listasDeMarcasDeComprasSLicitacao">
                    <Accordion>
                        {this.state.listaDeMarcas.map((listaDeMarcas) => {
                            return <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={listaDeMarcas.id.toString()}>
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
                                                    onClick={() => this.carregarComprasPorAno(ano, listaDeMarcas.nome)}>
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

                {/* <Button onClick={this.obterComprasSemLicitacao}>
                    Atualizar
                </Button> */}
            </Fragment>
        );
    }
}

export default Teste;