import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export default class ModalTabelaDeCompras extends React.Component {
    render() {
        debugger
        const compras = this.props.compras
        var estadoDoModal = this.props.modalState
        const modal = document.getElementById('modalTabelaDeCompras')

        if (compras.length === 0) {
            return null
        } else if (modal !== null) {
            modal.style.display = 'block'
        }

        return (
            <React.Fragment>
                <div id="modalTabelaDeCompras"
                    className="modal"
                    tabindex="-1"
                    style={{
                        display: estadoDoModal ? 'block' : 'none'
                    }}>

                    <div id="modal-backgound"></div>
                    <div className="modal-dialog modal-dialog-scrollable min-vw-100 pr-4 pl-4 m-0 h-100 mh-100" tabIndex="-1" role="dialog" aria-labelledby="modalCarregando" aria-modal="true">
                        <div className="modal-dialog mw-100 w-100 mt-1 mb-0">
                            <div className="modal-content h-100">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => document.getElementById('modalTabelaDeCompras').style.display = 'none'}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <table className="table table-striped table-bordered table-hover">
                                        <thead className="thead-dark text-center">
                                            <tr>
                                                <th className="align-middle" scope="col">#</th>
                                                <th className="align-middle" scope="col">Modalidade</th>
                                                <th className="align-middle" scope="col">CATMAT</th>
                                                <th className="align-middle" scope="col">Descrição</th>
                                                <th className="align-middle" scope="col">Unidade de fornecimento</th>
                                                <th className="align-middle" scope="col">Quantidade</th>
                                                <th className="align-middle" scope="col">Valor</th>
                                                <th className="align-middle" scope="col">Fabricante</th>
                                                <th className="align-middle" scope="col">UASG</th>
                                                <th className="align-middle" scope="col">UF</th>
                                                <th className="align-middle" scope="col">Ações</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {compras.map((compra, index) => {
                                                debugger
                                                return <tr key={index + 1}>
                                                    <th className="align-middle" scope="row">{index + 1}</th>
                                                    <td className="text-nowrap text-center align-middle">{compra.modalidade}</td>
                                                    <td className="text-nowrap text-center align-middle">{compra.codigocatmat}</td>
                                                    <td className="align-middle">{compra.descricaodoitem}</td>
                                                    <td className="align-middle">{compra.unidadedefornecimento}</td>
                                                    <td className="text-nowrap text-center align-middle">{compra.quantidadeofertada}</td>
                                                    <td className="text-nowrap text-center align-middle">R$ {compra.valorunitario}</td>
                                                    <td className="align-middle">{compra.nomedofornecedor}</td>
                                                    <td className="align-middle">{compra.uasg}</td>
                                                    <td className="text-nowrap text-center align-middle">{compra.uf}</td>
                                                    <td className="text-nowrap text-center align-middle">
                                                        <button type="button" className="btn btn-info btn-sm" title="Editar"><FontAwesomeIcon icon={faEdit}/></button>
                                                    </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => document.getElementById('modalTabelaDeCompras').style.display = 'none'}>Fechar</button>
                                    <button type="button" className="btn btn-info">Exportar paca XLS</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}