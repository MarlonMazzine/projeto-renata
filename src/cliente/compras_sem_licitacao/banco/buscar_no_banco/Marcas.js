import React from 'react'

export default class Marcas extends React.Component {
    async carregarMarcas() {
        return await fetch(
            '/todasasmarcas'
        ).then(async res => {
            const resposta = await res.json()

            if (resposta.rowCount === 0) {
                return 'Não há nenhuma marca cadastrada no banco.'
            }
            console.log(resposta.rows)
            return resposta.rows
        }).catch(err => {
            console.log(err)
            return 'Houve um erro ao obter as marcas cadastradas. Tente novamente, por favor. Erro: ' + err.message
        })
    }
}