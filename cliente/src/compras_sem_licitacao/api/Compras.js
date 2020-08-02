import React from 'react'

var listaDeComprasDe2015Ate2020 = []

function obterComprasDe2015ate2020(compras) {
    var dataRecebida
    var iterator = 0
    for (var compra in compras) {
        dataRecebida = new Date(compras[compra].dtDeclaracaoDispensa)

        if (dataRecebida.getFullYear() >= '2015') {
            listaDeComprasDe2015Ate2020.push(compras[compra])
            iterator++
        }
    }
    console.log(iterator)
}

export default class Compras extends React.Component {
    async obterCompras(codigosDosMateriais) {
        const qtdCodigosDosMateriais = codigosDosMateriais.length
        var url

        for (var i = 0; i < qtdCodigosDosMateriais; i++) {
            url = `/compraSemLicitacao/v1/itens_compras_slicitacao.json?co_conjunto_materiais=${codigosDosMateriais[i]}&order_by=dtDeclaracaoDispensa`
            
            await fetch(
                url
            ).then(async res => {
                const resposta = await res.json()
                obterComprasDe2015ate2020(resposta._embedded.compras)
            })
            // .catch(error => {
            //     alert(`Houve um erro ao obter compras sem licitação para o item de código "${codigosDosMateriais[i]}". Por favor, tente novamente. Erro: ` + error)
            // })
        }

        return listaDeComprasDe2015Ate2020
    }
}