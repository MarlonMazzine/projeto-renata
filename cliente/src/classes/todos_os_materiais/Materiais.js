import React from 'react'

export default class Materiais extends React.Component {
    obterTodosOsMateriais() {
        const materiais = new Map()

        materiais.set('271157', 'Insulina, origem: humana, tipo: nph, dosagem: 100u,ml, aplicação: injetável')
        materiais.set('442012', 'Insulina, tipo: nph, concentração: 100 ui,ml, forma farmaceutica: solução injetável, adicionais: c, sistema de aplicação')
        materiais.set('442011', 'Insulina, tipo: regular, concentração: 100 ui,ml, forma farmaceutica: solução injetável, adicionais: c, sistema de aplicação')
        materiais.set('271154', 'Insulina, origem: humana, tipo: regular, dosagem: 100u,ml, aplicação: injetável')
        materiais.set('405998', 'Insulina, tipo: lispro, concentração: 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: com aplicador')
        materiais.set('405965', 'Insulina, tipo: lispro associada à lispro protamina, concentração: 25% + 75% , 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: com aplicador')
        materiais.set('401325', 'Insulina, tipo: lispro associada à lispro protamina, concentração: 50% + 50%, 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: com aplicador')
        materiais.set('401324', 'Insulina, tipo: lispro associada à lispro protamina, concentração: 50% + 50%, 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: refil')
        materiais.set('276235', 'Insulina, origem: lispro associada à lispro protamina, dosagem: 25% + 75%, aplicação: injetável')
        materiais.set('276233', 'Insulina, origem: lispro, dosagem: 100u,ml, aplicação: injetável')
        materiais.set('383688', 'Insulina, origem: asparte associada à asparte protamina, concentração: 30% + 70%, 100 ui,ml, forma farmaceutica: solução injetável')
        materiais.set('403359', 'Insulina, tipo: glulisina, concentração: 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: refil')
        materiais.set('403358', 'Insulina, tipo: glulisina, concentração: 100 ui,ml, forma farmaceutica: solução injetável')
        materiais.set('380017', 'Insulina, origem: glulisina, tipo: ação rápida, concentração: 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: com aplicador')
        materiais.set('458670', 'Insulina, tipo: glargina associada à lixisenatida, concentração: 100 ui,ml + 33 mcg,ml, forma farmaceutica: solução injetável, adicionais: c, sistema de aplicação')
        materiais.set('452617', 'Insulina, tipo: glargina associada à lixisenatida, concentração: 100 ui,ml + 50 mcg,ml, forma farmaceutica: solução injetável, adicionais: c, sistema de aplicação')
        materiais.set('438153', 'Insulina, tipo: glargina, concentração: 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: refil')
        materiais.set('399010', 'Insulina, tipo: glargina, concentração: 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: com aplicador')
        materiais.set('273836', 'Insulina, origem: glargina, dosagem: 100ui,ml, aplicação: injetável')
        materiais.set('438433', 'Insulina, tipo: glargina, concentração: 300 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: com aplicador')
        materiais.set('452616', 'Insulina, tipo: degludeca associada à liraglutida, concentração: 100 u,ml + 3,6 mg,ml, forma farmaceutica: solução injetável, adicionais: c, sistema de aplicação')
        materiais.set('433218', 'Insulina, tipo: degludeca, concentração: 100 ui,ml, forma farmaceutica: solução injetável, caracteristica adicional: com aplicador')
        materiais.set('337473', 'Insulina, origem: detemir, dosagem: 100u,ml, forma farmacêutica: solução injetável')
        materiais.set('337472', 'Insulina, origem: detemir, dosagem: 100u,ml, forma farmacêutica: solução injetável, característica adicional: com sistema de aplicação')

        return materiais
    }
}