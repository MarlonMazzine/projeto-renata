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
        var tentarDeNovo = false

        do {
            tentarDeNovo = await fetch(
                url
            ).then(async res => {
                if (res.status !== 200) {
                    return true
                } else {
                    const resposta = await res.json()
                    listaDeComprasDe2015Ate2020.length = 0
                    obterComprasDe2015Ate2020(resposta._embedded.compras)
                    return false
                }
            })
        } while (tentarDeNovo)

        return listaDeComprasDe2015Ate2020
    }
}