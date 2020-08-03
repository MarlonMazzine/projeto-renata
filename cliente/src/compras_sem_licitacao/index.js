import React, { Component, Fragment } from 'react'
import { Accordion, Card, Button, Modal, ProgressBar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import BotaoCarregarComprasDoBanco from './interfaces/BotaoCarregarComprasDoBanco'
import ComprasApi from './api/Compras'
import Materiais from '../classes/todos_os_mateiriais/Materiais'
import AtualizadorDeTabelas from './banco/atualizadores/AtualizadorDeTabelas'

class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            listaDeMarcas: [] // Preciso colocar um valor aqui dentro
        }
    }

    // async carregarComprasSemLicitacaoDoBanco() {
    //     this.setState({ showModal: true })
    //     debugger
    //     const comprasDoBanco = await new ComprasDoBanco().carregarCompras()

    //     if (this.isComecaComTrecho(comprasDoBanco.toString(), ['Não há nenhuma', 'Houve um erro'])) {
    //         alert(comprasDoBanco)
    //     } else {
    //         const marcasDoBanco = await new MarcasDoBanco().carregarMarcas()
    //         this.verificarSeVaiAdicionarMarcas(marcasDoBanco)
    //     }

    //     this.fecharModal()
    // }

    // verificarSeVaiAdicionarMarcas(marcas) {
    //     if (this.isComecaComTrecho(marcas.toString(), ['Não há nenhuma', 'Houve um erro'])) {
    //         alert(marcas)
    //     } else {
    //         this.setState({ listaDeMarcas: marcas })
    //     }
    // }

    // isComecaComTrecho(texto, paramentros) {
    //     for (var string in paramentros) {
    //         if (texto.startsWith(string)) {
    //             return true
    //         }
    //     }

    //     return false
    // }

    // async fecharModal() {
    //     this.sleep(1000).then(() => {
    //         this.setState({ showModal: false })
    //     })
    // }

    // async sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }

    async carregarComprasSemLicitacao() {
        this.setState({ showModal: true })

        const materiais = new Materiais().obterTodosOsMateriais()
        const codigosDosMateriais = Array.from(materiais.keys())
        const qtdDeCodigosDosMateriais = codigosDosMateriais.length

        for (var i = 0; i < qtdDeCodigosDosMateriais; i++) {
            const codigoDoMaterialAtual = codigosDosMateriais[i]
            const comprasDe2015Ate2020 = await new ComprasApi().obterCompras(codigoDoMaterialAtual)
            await new AtualizadorDeTabelas().atualizarTabelas(comprasDe2015Ate2020, codigoDoMaterialAtual)
        }
    }

    // async atualizarTabelas(listaDeCompras, codigoDoMaterialAtual) {
    //     const qtdDeComprasDe2015Ate2020 = listaDeCompras.length

    //     for (var i = 0; i < qtdDeComprasDe2015Ate2020; i++) {
    //         const linkDoItem = listaDeCompras[i]._links.Itens.href.replace('/id/', '/doc/') + '.json'
    //         const compras = await new ItensApi().obterItens(linkDoItem)
    //         const indexDoMaterialAtual = compras.findIndex(c => c.co_conjunto_materiais === parseInt(codigoDoMaterialAtual))
    //         const marcaAtual = compras[indexDoMaterialAtual].no_marca_material.toUpperCase()
        
    //         await new AtualizadorDeMarcas().atualizarTabelaDeMarcas(marcaAtual)
    //         await new AtualizadorDeCompraSemLicitacao().atualizarTabelaDeComprasSemLicitacao(
    //             listaDeCompras[i],
    //             compras[indexDoMaterialAtual],
    //             codigoDoMaterialAtual
    //         )
    //     }
    // }

    // async atualizarTabelaDeMarcas(marca) {
    //     await this.sleep(1000).then(async () => {
    //         return await axios.post(
    //             'http://localhost:5000/atualizartabelademarcas',
    //             {
    //                 nome: marca
    //             }
    //         ).then(() => {
    //             console.log('esperou')
    //         }).catch(err => {
    //             console.log(err)
    //         })
    //     })
    // }

    // async atualizarTabelaDeComprasSemLicitacao(compraAtual, itemDaCompra, codigoDoMaterialAtual) {
    //     const nomeDoFornecedor = await new Fornecedor().obterNomeDoFornecedor(itemDaCompra._links.fornecedor.href)
    //     const nomeDaUf = await new Uf().obterNomeDaUf(compraAtual.co_uasg)

    //     const resposta = await axios.post(
    //         'http://localhost:5000/atualizartabeladecomprassemlicitacao',
    //         {
    //             codigodacompra: compraAtual._links.self.title.replace(/.+?(\d.+)/g, '$1'),
    //             nomedamarca: itemDaCompra.no_marca_material.toUpperCase(),
    //             datadacompra: compraAtual.dtDeclaracaoDispensa.slice(0, -9),
    //             modalidade: compraAtual._links.modalidade_licitacao.title.replace(/.+:\s(.+)/g, '$1'),
    //             codigocatmat: parseInt(codigoDoMaterialAtual),
    //             descricaodoitem: _materiais.get(codigoDoMaterialAtual).replace(/(\s{2,})/g, ''),
    //             unidadedefornecimento: compraAtual.ds_objeto_licitacao.replace(/(\s{2,})/g, ''),
    //             quantidadeofertada: parseInt(itemDaCompra.qt_material_alt),
    //             valorunitario: this.obterValorUnitario(itemDaCompra.vr_estimado, parseInt(itemDaCompra.qt_material_alt)),
    //             nomedofornecedor: nomeDoFornecedor,
    //             uasg: compraAtual._links.uasg.title.toString().replace(/.+:\s(.+)/g, '$1'),
    //             uf: nomeDaUf
    //         }
    //     )

    //     if (resposta.status !== 200) {
    //         alert('Não foi possível atualizar pois ocorreu um erro em: ' + resposta.status)
    //     }
    // }

    // obterValorUnitario(valorTotal, qtdDeMateriais) {
    //     return parseFloat(valorTotal / qtdDeMateriais).toFixed(2)
    // }

    carregarComprasPorAno(ano, nomeDaMarca) {
        alert('Clicou no ano ' + ano + ' da marca ' + nomeDaMarca)
    }

    render() {
        const anos = ['2015', '2016', '2017', '2018', '2019', '2020']

        return (
            <Fragment>
                <BotaoCarregarComprasDoBanco />
                {/* <Button onClick={this.carregarComprasSemLicitacaoDoBanco.bind(this)} variant="primary">
                    Carregar compras sem licitação
                </Button> */}
                <Button onClick={this.carregarComprasSemLicitacao.bind(this)} variant="primary">
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
            </Fragment>
        );
    }
}

export default index;