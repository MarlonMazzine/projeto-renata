import React from 'react'

export default class Itens extends React.Component {
    async obterItens(linkDoItem) {
        var respostaDaRequisicao

        do {
            respostaDaRequisicao = await fetch(
                linkDoItem
            ).then(async res => {
                if (res.status === 502) {
                    return res.status
                } else if (res.status !== 200) {
                    return linkDoItem
                } else {
                    const resposta = await res.json()
                    return resposta._embedded.compras
                }
            }).catch(() => {
                return linkDoItem
            })
        } while (respostaDaRequisicao === 502)

        return await respostaDaRequisicao
    }
}