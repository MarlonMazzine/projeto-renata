import React from 'react'

export default class Materiais extends React.Component {
    obterTodosOsMateriais() {
        const materiais = new Map()

        materiais.set('276234', 'Insulina, origem: aspart, dosagem: 100u,ml, aplicação: injetável')
        materiais.set('276233', 'Insulina, origem: lispro, dosagem: 100u,ml, aplicação: injetável')
        materiais.set('273836', 'Insulina, origem: glargina, dosagem: 100ui,ml, aplicação: injetável')
        materiais.set('433218', 'Insulina, tipo: degludeca, concentração: 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: com aplicador')
        materiais.set('442011', 'Insulina, tipo: regular, concentração: 100 ui,ml, forma farmaceutica: solução injetável, adicionais: c, sistema de aplicação')
        materiais.set('399010', 'Insulina, tipo: glargina, concentração: 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: com aplicador')

        return materiais
    }
}