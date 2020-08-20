const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const db = require('./_criarconexao')
var cors = require('cors');

app.use(cors())
app.use(express.json())

app.get('/comprassemlicitacao', (req, res) => {
  const sql = "SELECT * FROM public.comprassemlicitacao"

  db.query(
    sql,
    (q_err, q_res) => {
      if (q_err === undefined) {
        res.json(q_res)
      } else {
        res.json('Erro ao cadastrar')
      }
    }
  )
});

app.get('/todasasmarcas', (req, res) => {
  const sql = "SELECT * FROM marcas ORDER BY nome ASC"

  db.query(
    sql,
    (q_err, q_res) => {
      if (q_err === undefined) {
        res.json(q_res)
      } else {
        res.json('Erro ao cadastrar')
      }
    }
  )
});

app.post('/atualizartabeladecomprassemlicitacao', (req, res) => {
  const requisicao = req.body
  const codigoDaCompra = requisicao.codigodacompra
  const nomeDaMarca = requisicao.nomedamarca
  const dataDaCompra = requisicao.datadacompra
  const modalidade = requisicao.modalidade
  const codigoCatmat = requisicao.codigocatmat
  const descricaoDoItem = requisicao.descricaodoitem
  const unidadeDeFornecimento = requisicao.unidadedefornecimento
  const quantidadeOfertada = requisicao.quantidadeofertada
  const valorUnitario = requisicao.valorunitario
  const nomeDoFornecedor = requisicao.nomedofornecedor
  const uasg = requisicao.uasg
  const uf = requisicao.uf
  const parametros = [codigoDaCompra, nomeDaMarca, dataDaCompra, modalidade, codigoCatmat, descricaoDoItem, unidadeDeFornecimento, quantidadeOfertada, valorUnitario, nomeDoFornecedor, uasg, uf]

  const sql = `INSERT INTO comprassemlicitacao (codigodacompra, nomedamarca, datadacompra, modalidade, codigocatmat, descricaodoitem, unidadedefornecimento, quantidadeofertada, valorunitario, nomedofornecedor, uasg, uf)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`

  db.query(
    sql,
    parametros,
    (q_err, q_res) => {
      if (q_err === undefined) {
        res.json('Cadastrado com sucesso')
      } else {
        res.json('Erro ao cadastrar')
      }
    }
  )
})

app.post('/atualizartabelademarcas', (req, res) => {
  const sql = 'INSERT INTO marcas(nome) VALUES ($1)'

  db.query(
    sql,
    [req.body.nome],
    (q_err, q_res) => {
      if (q_err === undefined) {
        res.json('Cadastrado com sucesso')
      } else {
        res.json('Erro ao cadastrar')
      }
    }
  )
})

app.post('/comprasporanoemarca', (req, res) => {
  const requisisao = req.body
  const marca = requisisao.nomeDaMarca
  const ano = requisisao.anoDaCompra + '%'
  const parametros = [marca, ano]

  const sql = `SELECT * FROM public.comprassemlicitacao 
    WHERE nomedamarca = $1 
    AND TO_CHAR(datadacompra, 'YYYY') LIKE $2 
    ORDER BY codigocatmat`

  db.query(
    sql,
    parametros,
    (q_err, q_res) => {
      if (q_err === undefined) {
        res.json(q_res)
      } else {
        console.log(q_err)
        res.json('Erro ao cadastrar')
      }
    }
  )
})

app.listen(port, () => console.log(`Listening on port ${port}`));