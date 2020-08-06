import React from 'react'

export default class Fornecedor extends React.Component {
    async obterNomeDoFornecedor(fornecedor) {
        if (fornecedor === undefined) {
            return "ESTRANGEIRO"
        }
        
        const linkDoFornecedor = fornecedor.href
        const cpfCnpj = 'CPF / CNPJ: ' + linkDoFornecedor.replace(/\D/g, '')
        var respostaDaRequisicao

        do {
            respostaDaRequisicao = await fetch(
                linkDoFornecedor.replace('/id/', '/doc/') + '.json'
            ).then(async res => {
                if (res.status === 502) {
                    return res.status
                } else if (res.status !== 200) {
                    return cpfCnpj
                } else {
                    const resposta = await res.json()
                    return resposta.razao_social
                }
            }).catch(() => {
                return cpfCnpj
            })
        } while (respostaDaRequisicao === 502)

        return await respostaDaRequisicao
    }
}