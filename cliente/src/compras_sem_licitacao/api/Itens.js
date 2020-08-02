import React from 'react'

export default class Itens extends React.Component {
    async obterItens(linkDoItem) {
        // const qtdDeLinks = linksDoItem.length
        // var linkDoItem
        // var hasErro = false

        // for (var i = 0; i < qtdDeLinks; i++) {
        // linkDoItem = linkDoItem.replace('/id/', '/doc/') + '.json'

        return await fetch(
            linkDoItem
        ).then(async res => {
            const resposta = await res.json()
            return resposta._embedded.compras
        })

        // return respostaDaRequisicao

        // if (resposta.severity === 'ERROR') {
        //     hasErro = true
        // } else {
        //     await this.atualizarTabelas(resposta, i)
        //     hasErro = false
        // }

        // if (hasErro) {
        //     i--
        // }
        // }
    }
}