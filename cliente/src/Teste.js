import React, { Component, Fragment } from 'react'
import { Accordion, Card, Button, Modal, ProgressBar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

var materiais = new Map()
materiais.set('276234', 'Insulina, origem: aspart, dosagem: 100u,ml, aplicação: injetável')
materiais.set('276233', 'Insulina, origem: lispro, dosagem: 100u,ml, aplicação: injetável')
materiais.set('273836', 'Insulina, origem: glargina, dosagem: 100ui,ml, aplicação: injetável')
materiais.set('433218', 'Insulina, tipo: degludeca, concentração: 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: com aplicador')
materiais.set('442011', 'Insulina, tipo: regular, concentração: 100 ui,ml, forma farmaceutica: solução injetável, adicionais: c, sistema de aplicação')
materiais.set('399010', 'Insulina, tipo: glargina, concentração: 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: com aplicador')

// const nomeDosMateriais = [
//     'Insulina, origem: aspart, dosagem: 100u,ml, aplicação: injetável',
//     'Insulina, origem: lispro, dosagem: 100u,ml, aplicação: injetável',
//     'Insulina, origem: glargina, dosagem: 100ui,ml, aplicação: injetável',
//     'Insulina, tipo: degludeca, concentração: 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: com aplicador',
//     'Insulina, tipo: regular, concentração: 100 ui,ml, forma farmaceutica: solução injetável, adicionais: c, sistema de aplicação',
//     'Insulina, tipo: glargina, concentração: 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: com aplicador'
// ]
// const codigosDosMateirias = ['276234', '276233', '273836', '433218', '442011', '399010']
// const qtdCodigosDosMateriais = codigosDosMateirias.length

class Teste extends Component {
    constructor(props) {
        super(props)

        this.state = {
            linksDoItem: [],
            listaDeComprasSemLicitacao: [],
            showModal: false,
            listaDeMarcas: [],
            codigoDoMaterialAtual: '',
            listaDeTodasAsMarcas: [],
            nomeDoFornecedor: '',
            UF: '',
            existeErros: false
        }

        this.carregarComprasSemLicitacao = this.carregarComprasSemLicitacao.bind(this)
        this.carregarComprasSemLicitacaoDoBanco = this.carregarComprasSemLicitacaoDoBanco.bind(this)
        this.carregarComprasPorAno = this.carregarComprasPorAno.bind(this)
    }

    async carregarComprasSemLicitacaoDoBanco() {
        this.setState({ showModal: true })

        await axios.get(
            'http://localhost:5000/comprassemlicitacao'
        ).then(resposta => {
            if (resposta.data.rowCount === 0) {
                alert('Não há nenhuma compra cadastrada no banco.')
            } else {
                this.setState({ listaDeComprasSemLicitacao: resposta.data.rows })
                this.carregarTodasAsMarcasCadastradas()
            }
        }).catch(err => {
            alert('Houve um erro ao obter as compras sem licitação do banco.')
        })
        this.fecharModal()
    }

    async fecharModal() {
        this.sleep(2000).then(() => {
            this.setState({ showModal: false })
        })
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async carregarTodasAsMarcasCadastradas() {
        await axios.get(
            'http://localhost:5000/todasasmarcas'
        ).then(resposta => {
            this.setState({ listaDeMarcas: resposta.data.rows })
        }).catch(err => {
            this.fecharModal()
            alert('Houve um erro ao obter as marcas cadastradas.')
        })
    }

    async carregarComprasSemLicitacao() {
        this.setState({ showModal: true })

        // for (var i = 0; i < qtdCodigosDosMateriais; i++) {
        await axios.get(
            '/compraSemLicitacao/v1/itens_compras_slicitacao.json',
            {
                params: {
                    co_conjunto_materiais: '399010',//codigosDosMateirias[i],
                    order_by: 'dtDeclaracaoDispensa'
                }
            }
        ).then(resposta => {
            var linkDoItem = []
            var listaDeComprasDe2015 = []
            var dataRecebida
            var compras = resposta.data._embedded.compras

            for (var x in compras) {
                dataRecebida = new Date(compras[x].dtDeclaracaoDispensa.toString())

                if (dataRecebida.getFullYear() >= '2015') {
                    listaDeComprasDe2015.push(compras[x])
                    linkDoItem.push(compras[x]._links.Itens.href)
                }
            }

            this.setState({ codigoDoMaterialAtual: '399010' })//codigosDosMateirias[i]})
            this.setState({ listaDeComprasSemLicitacao: listaDeComprasDe2015 })
            this.setState({ linksDoItem: linkDoItem })
            this.obterItensDeCompraSemLicitacao()
        }).catch(error => {
            this.fecharModal()
            alert('Houve um erro ao obter compras sem licitação para o item "399010". Por favor, tente novamente. Erro: ' + error.data)
        })
        // }
    }

    async obterItensDeCompraSemLicitacao() {
        const qtdDeLinks = this.state.linksDoItem.length
        var linkDoItem
        var hasErro = false

        for (var i = 0; i < qtdDeLinks; i++) {
            linkDoItem = this.state.linksDoItem[i].replace('/id/', '/doc/') + '.json'

            await axios.get(
                linkDoItem
            ).then(async (resposta) => {
                if (resposta.data.severity === 'ERROR') {
                    hasErro = true
                } else {
                    debugger
                    await this.atualizarTabelas(resposta, i)
                    hasErro = false
                }
            })

            if (hasErro) {
                i--
            }
        }

        this.fecharModal()
        document.getElementById('listasDeMarcasDeComprasSLicitacao').hidden = false
    }

    async atualizarTabelas(resposta, indexAtual) {
        const compras = resposta.data._embedded.compras
        const index = compras.findIndex(c => c.co_conjunto_materiais == 399010)
        const marcaAtual = compras[index].no_marca_material.toUpperCase()

        await this.atualizarTabelaDeMarcas(marcaAtual)
        await this.atualizarTabelaDeComprasSemLicitacao(this.state.listaDeComprasSemLicitacao[indexAtual], compras[index])
    }

    async atualizarTabelaDeMarcas(marca) {
        await this.sleep(1000).then(async () => {
            return await axios.post('http://localhost:5000/atualizartabelademarcas',
                {
                    nome: marca
                }
            ).then(() => {
                console.log('esperou')
            }).catch(err => {
                console.log(err)
            })
        })
    }

    async atualizarTabelaDeComprasSemLicitacao(compraAtual, itemDaCompra) {
        await this.obterUf(compraAtual.co_uasg)
        await this.obterNomeDoFornecedor(itemDaCompra._links.fornecedor.href)
        await this.enviarRequisicaoParaAtualizarTabelaDeCompras(compraAtual, itemDaCompra)
    }

    async enviarRequisicaoParaAtualizarTabelaDeCompras(compraAtual, itemDaCompra) {
        const resposta = await axios.post('http://localhost:5000/atualizartabeladecomprassemlicitacao', {
            codigodacompra: compraAtual._links.self.title.toString().replace(/.+?(\d.+)/g, '$1'),
            nomedamarca: itemDaCompra.no_marca_material.toUpperCase(),
            datadacompra: compraAtual.dtDeclaracaoDispensa.slice(0, -9),
            modalidade: compraAtual._links.modalidade_licitacao.title.toString().replace(/.+:\s(.+)/g, '$1'),
            codigocatmat: parseInt(this.state.codigoDoMaterialAtual.toString()),
            descricaodoitem: materiais.get(this.state.codigoDoMaterialAtual).replace(/(\s{2,})/g, ''),
            unidadedefornecimento: compraAtual.ds_objeto_licitacao.toString().replace(/(\s{2,})/g, ''),
            quantidadeofertada: parseInt(itemDaCompra.qt_material_alt.toString()),
            valorunitario: this.obterValorUnitario(itemDaCompra.qt_material_alt, itemDaCompra.vr_estimado),
            nomedofornecedor: this.state.nomeDoFornecedor,
            uasg: compraAtual._links.uasg.title.toString().replace(/.+:\s(.+)/g, '$1'),
            uf: this.state.UF
        })

        if (resposta.data.severity === 'ERROR') {
            alert('Não foi possível atualizar pois ocorreu um erro em: ' + resposta.data.routine)
        }
    }

    obterValorUnitario(qtdDeMateriais, valorTotal) {
        return parseFloat(parseFloat(valorTotal) / parseInt(qtdDeMateriais)).toFixed(2)
    }

    async obterNomeDoFornecedor(link) {
        var statusCode
        do {
            await axios.get(
                link.replace('/id/', '/doc/')
            ).then(resposta => {
                this.setState({ nomeDoFornecedor: resposta.data.razao_social })
                this.setState({ existeErros: false })
                statusCode = 0
            }).catch(erro => {
                statusCode = erro.response.status
            })
        } while (statusCode === 502)

        if (statusCode === 404) {
            this.setState({ nomeDoFornecedor: link.replace(/\D/g, '') })
        }
    }

    async obterUf(codigoUasg) {
        var statusCode
        do {
            await axios.get(
                '/licitacoes/doc/uasg/' + codigoUasg + '.json'
            ).then(resposta => {
                this.setState({ UF: resposta.data.sigla_uf.toUpperCase() })
                this.setState({ existeErros: false })
                statusCode = 0
            }).catch(erro => {
                statusCode = erro.response.status
            })
        } while (statusCode === 502)

        if (statusCode === 404) {
            this.setState({ UF: codigoUasg })
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