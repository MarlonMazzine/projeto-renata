import React from 'react'

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

export default class Itens extends React.Component {
    async obterItens(linkDoItem) {
        var respostaDaRequisicao

        do {
            respostaDaRequisicao = await fetch(
                'http://compras.dados.gov.br' + linkDoItem
            ).then(async res => {
                if (res.status === 502 || res.status === 503) {
                    await sleep(2000)
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
        } while (respostaDaRequisicao === 502 || respostaDaRequisicao === 503)

        return await respostaDaRequisicao
    }
}