import React from 'react'

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function obterCorpoDaRequisicao(marca) {
    return JSON.stringify({
        nome: marca
    })
}

export default class AtualizadorDeMarcas extends React.Component {
    async atualizarTabelaDeMarcas(marca) {
        await sleep(1000).then(async () => {
            return await fetch(
                'http://localhost:5000/atualizartabelademarcas',
                {
                    method: 'POST',
                    body: obterCorpoDaRequisicao(marca)
                }
            ).then(() => {
                console.log('esperou')
            }).catch(err => {
                console.log(err)
            })
        })
    }
}