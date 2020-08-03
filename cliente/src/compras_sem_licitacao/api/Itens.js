import React from 'react'

export default class Itens extends React.Component {
    async obterItens(linkDoItem) {
        return await fetch(
            linkDoItem
        ).then(async res => {
            const resposta = await res.json()
            return resposta._embedded.compras
        })
    }
}