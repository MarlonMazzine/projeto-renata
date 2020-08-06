import React from 'react'

var listaDeComprasDe2015Ate2020 = []

function obterComprasDe2015Ate2020(compras) {
    var dataRecebida

    for (var compra in compras) {
        dataRecebida = new Date(compras[compra].dtDeclaracaoDispensa)

        if (dataRecebida.getFullYear() >= '2015') {
            listaDeComprasDe2015Ate2020.push(compras[compra])
        }
    }
}

export default class Compras extends React.Component {
    async obterCompras(codigosDosMateriais) {
        var url = `/compraSemLicitacao/v1/itens_compras_slicitacao.json?co_conjunto_materiais=${codigosDosMateriais}&order_by=dtDeclaracaoDispensa`

        await fetch(
            url
        ).then(async res => {
            const resposta = await res.json()
            obterComprasDe2015Ate2020(resposta._embedded.compras)
        })

        return listaDeComprasDe2015Ate2020
    }
}