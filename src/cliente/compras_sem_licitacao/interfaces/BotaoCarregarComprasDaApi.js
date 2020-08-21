import React from 'react'
import ComprasDaApi from '../api/Compras'
import ComprasDoBanco from '../banco/buscar_no_banco/Compras'
import Materiais from '../../classes/todos_os_materiais/Materiais'
import AtualizadorDeTabelas from '../banco/atualizadores_automaticos/AtualizadorDeTabelas'
import Modal from './Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.css'

export default class BotaoCarregarComprasDaApi extends React.Component {
    async carregarComprasSemLicitacao() {
        new Modal().setModalState('modalCarregando')

        const materiais = new Materiais().obterTodosOsMateriais()
        const codigosDosMateriais = Array.from(materiais.keys())
        const qtdDeCodigosDosMateriais = codigosDosMateriais.length
        var totalDeErros = 0
        var comprasDe2015Ate2020 = []
        var comprasCadastradasNoBanco = await new ComprasDoBanco().carregarCompras()

        for (var i = 0; i < qtdDeCodigosDosMateriais; i++) {
            const codigoDoMaterialAtual = codigosDosMateriais[i]
            comprasDe2015Ate2020 =
                await this.obterComprasQueSeraoCadastradas(codigoDoMaterialAtual, comprasCadastradasNoBanco)
            totalDeErros +=
                await new AtualizadorDeTabelas().atualizarTabelas(comprasDe2015Ate2020, codigoDoMaterialAtual)
            comprasDe2015Ate2020.length = 0
        }

        if (totalDeErros > 0) {
            alert(`Foram encontrados ${totalDeErros} erros durante a atualização. Convém atualizar novamente.`)
        }

        new Modal().setModalState('modalCarregando')
    }

    async obterComprasQueSeraoCadastradas(codigoDoMaterialAtual, comprasCadastradasNoBanco) {
        var comprasDaApi = await new ComprasDaApi().obterCompras(codigoDoMaterialAtual)
        var qtdComprasDaApi = comprasDaApi.length
        var comprasDe2015Ate2020 = []

        for (var i = 0; i < qtdComprasDaApi; i++) {
            var codigoDaCompraApi = comprasDaApi[i]._links.self.title.replace(/.+?(\d.+)/g, '$1')
            var indexDaCompraCadastradaNoBanco =
                comprasCadastradasNoBanco.findIndex(x =>
                    x.codigocatmat === parseInt(codigoDoMaterialAtual) && x.codigodacompra === codigoDaCompraApi
                )
            
            if (indexDaCompraCadastradaNoBanco !== -1) {
                continue
            }

            comprasDe2015Ate2020.push(comprasDaApi[i])
        }

        return comprasDe2015Ate2020
    }

    render() {
        return (
            <React.Fragment>
                <li type="button"
                    className="text-center minha-cor w-100 h-50p pt-3"
                    onClick={this.carregarComprasSemLicitacao.bind(this)}>
                    <FontAwesomeIcon className="mr-3" icon={faSyncAlt} />
                    Atualizar compras
                </li>
            </React.Fragment>
        )
    }
}