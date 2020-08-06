import React from 'react'
import Compras from '../api/Compras'
import Materiais from '../../classes/todos_os_materiais/Materiais'
import AtualizadorDeTabelas from '../banco/atualizadores/AtualizadorDeTabelas'
import Modal from './Modal'
import 'bootstrap/dist/css/bootstrap.css'

export default class BotaoCarregarComprasDaApi extends React.Component {
    async carregarComprasSemLicitacao() {
        new Modal().setModalState('modalCarregando')

        const materiais = new Materiais().obterTodosOsMateriais()
        const codigosDosMateriais = Array.from(materiais.keys())
        const qtdDeCodigosDosMateriais = codigosDosMateriais.length
        var totalDeErros = 0

        for (var i = 0; i < qtdDeCodigosDosMateriais; i++) {
            const codigoDoMaterialAtual = codigosDosMateriais[i]
            const comprasDe2015Ate2020 = await new Compras().obterCompras(codigoDoMaterialAtual)
            
            totalDeErros += await new AtualizadorDeTabelas().atualizarTabelas(comprasDe2015Ate2020, codigoDoMaterialAtual)
        }
        debugger

        if (totalDeErros > 0) {
            alert(`Foram encontrados ${totalDeErros} erros durante a atualização. Convém atualizar novamente.`)
        }

        new Modal().setModalState('modalCarregando')
    }
    
    render () {
        return (
            <button type="button" className="btn btn-primary" onClick={this.carregarComprasSemLicitacao.bind(this)}>
                Atualizar lista de<br/>compras sem licitação
            </button>
        )
    }
}