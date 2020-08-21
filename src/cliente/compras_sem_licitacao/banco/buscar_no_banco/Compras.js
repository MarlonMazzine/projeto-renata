import React from 'react'

export default class Compras extends React.Component {
    async carregarCompras() {
        return await fetch(
            'http://localhost:5000/comprassemlicitacao'
        ).then(async res => {
            console.log('consegui a resposta vou pegá-la')
            const resposta = await res.json()

            if (resposta.rowCount === 0) {
                return 'Não há nenhuma compra cadastrada no banco.'
            }

            return resposta.rows
        }).catch(err => {
            console.log('não consegui a resposta restornando o erro ' + err)
            return 'Houve um erro ao obter as compras sem licitação do banco. Erro: ' + err.message
        })
    }
}