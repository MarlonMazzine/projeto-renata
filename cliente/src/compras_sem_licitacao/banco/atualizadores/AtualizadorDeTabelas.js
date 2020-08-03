import React from 'react'
import Itens from '../../api/Itens'
import AtualizadorDeMarcas from './AtualizadosDeMarcas'
import AtualizadorDeCompraSemLicitacao from './AtualizadorDeCompraSemLicitacao'

export default class AtualizadorDeTabelas extends React.Component {
    async atualizarTabelas(listaDeCompras, codigoDoMaterialAtual) {
        const qtdDeComprasDe2015Ate2020 = listaDeCompras.length

        for (var i = 0; i < qtdDeComprasDe2015Ate2020; i++) {
            const linkDoItem = listaDeCompras[i]._links.Itens.href.replace('/id/', '/doc/') + '.json'
            const compras = await new Itens().obterItens(linkDoItem)
            const indexDoMaterialAtual = compras.findIndex(c => c.co_conjunto_materiais === parseInt(codigoDoMaterialAtual))
            const marcaAtual = compras[indexDoMaterialAtual].no_marca_material.toUpperCase()
        
            await new AtualizadorDeMarcas().atualizarTabelaDeMarcas(marcaAtual)
            await new AtualizadorDeCompraSemLicitacao().atualizarTabelaDeComprasSemLicitacao(
                listaDeCompras[i],
                compras[indexDoMaterialAtual],
                codigoDoMaterialAtual
            )
        }
    }
}