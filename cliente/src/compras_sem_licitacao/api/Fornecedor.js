import React from 'react'

export default class Fornecedor extends React.Component {
    async obterNomeDoFornecedor(link) {
        var respostaDaRequisicao

        do {
            respostaDaRequisicao = await fetch(
                link.replace('/id/', '/doc/') + '.json'
            ).then(async res => {
                if (res.status === 502) {
                    return res.status
                } else if (res.status !== 200) {
                    return link.replace(/\D/g, '')
                } else {
                    const resposta = await res.json()
                    return resposta.razao_social
                }
            }).catch(erro => {
                return erro.message
            })
        } while (respostaDaRequisicao === 502)

        return await respostaDaRequisicao
    }
}