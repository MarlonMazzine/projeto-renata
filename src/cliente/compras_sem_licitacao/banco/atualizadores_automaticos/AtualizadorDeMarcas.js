import React from 'react'

function obterCorpoDaRequisicao(marca) {
    return JSON.stringify({
        nome: marca
    })
}

export default class AtualizadorDeMarcas extends React.Component {
    async atualizarTabelaDeMarcas(marca) {
        const requestBody = obterCorpoDaRequisicao(marca)

        return await fetch(
            'http://localhost:5000/atualizartabelademarcas',
            {
                method: 'POST',
                body: requestBody,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        ).then(async (res) => {
            const resposta = await res.json()
            return await resposta
        }).catch(err => {
            alert('Houve um erro ao atualizar as marcas. Erro: ' + err)
        })
    }
}