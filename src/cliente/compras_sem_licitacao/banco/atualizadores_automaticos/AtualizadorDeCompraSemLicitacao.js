import React from 'react'
import Fornecedor from '../../api/Fornecedor'
import Uf from '../../api/Uf'
import Materiais from '../../../classes/todos_os_materiais/Materiais'

function obterValorUnitario(valorTotal, qtdDeMateriais) {
    return parseFloat(valorTotal / qtdDeMateriais).toFixed(2)
}

async function obterCorpoDaRequisicao(compraAtual, itemDaCompra, codigoDoMaterialAtual) {
    const materiais = new Materiais().obterTodosOsMateriais()
    const nomeDoFornecedor = await new Fornecedor().obterNomeDoFornecedor(itemDaCompra._links.fornecedor)
    const nomeDaUf = await new Uf().obterNomeDaUf(compraAtual.co_uasg)

    return JSON.stringify({
        codigodacompra: compraAtual._links.self.title.replace(/.+?(\d.+)/g, '$1'),
        nomedamarca: itemDaCompra.no_marca_material.toUpperCase(),
        datadacompra: compraAtual.dtDeclaracaoDispensa.slice(0, -9),
        modalidade: compraAtual._links.modalidade_licitacao.title.replace(/.+:\s(.+)/g, '$1'),
        codigocatmat: parseInt(codigoDoMaterialAtual),
        descricaodoitem: materiais.get(codigoDoMaterialAtual).replace(/(\s{2,})/g, ''),
        unidadedefornecimento: compraAtual.ds_objeto_licitacao.replace(/(\s{2,})/g, ''),
        quantidadeofertada: parseInt(itemDaCompra.qt_material_alt),
        valorunitario: obterValorUnitario(itemDaCompra.vr_estimado, parseInt(itemDaCompra.qt_material_alt)),
        nomedofornecedor: nomeDoFornecedor,
        uasg: compraAtual._links.uasg.title.toString().replace(/.+:\s(.+)/g, '$1'),
        uf: nomeDaUf
    })
}

export default class AtualizadorDeCompraSemLicitacao extends React.Component {
    async atualizarTabelaDeComprasSemLicitacao(compraAtual, itemDaCompra, codigoDoMaterialAtual) {
        const requestBody = await obterCorpoDaRequisicao(compraAtual, itemDaCompra, codigoDoMaterialAtual)
        
        return await fetch(
            process.env.DATABASE_URL_UTF8 + ':5000/atualizartabeladecomprassemlicitacao',
            {
                method: 'POST',
                body: requestBody,
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        ).then(async res => {
            const resposta = await res.json()
            
            if (res.status !== 200) {
                alert('Não foi possível atualizar pois ocorreu um erro em: ' + res.status)
            } else {
                return await resposta
            }
        }).catch(err => {
            alert('Houve um erro ao atualizar as compras. Erro: ' + err)
        })
    }
}