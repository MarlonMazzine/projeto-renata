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
      res.json(q_res)
      console.log(q_err)
    }
  )
});

app.get('/todasasmarcas', (req, res) => {
  const sql = "SELECT * FROM marcas ORDER BY nome ASC"

  db.query(
    sql,
    (q_err, q_res) => {
      res.json(q_res)
      console.log(q_err)
    }
  )
});

app.get('/todasasmarcas?nomeDaMarca:marca', (req, res) => {
  console.log('novo teste' + req)
  // const sql = "SELECT * FROM marcas ORDER BY nome ASC"

  // db.query(
  //   sql,
  //   (q_err, q_res) => {
  //     res.json(q_res)
  //     console.log(q_err)
  //   }
  // )
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

  const sql = `INSERT INTO comprassemlicitacao (codigodacompra, nomedamarca, datadacompra, modalidade, codigocatmat, descricaodoitem, unidadedefornecimento, quantidadeofertada, valorunitario, nomedofornecedor, uasg, uf)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`

  const parametros = [codigoDaCompra, nomeDaMarca, dataDaCompra, modalidade, codigoCatmat, descricaoDoItem, unidadeDeFornecimento, quantidadeOfertada, valorUnitario, nomeDoFornecedor, uasg, uf]

  db.query(
    sql,
    parametros,
    (q_err, q_res) => {
      if (q_err === undefined) {
        res.json('Erro ao cadastrar')
      } else {
        res.json('Cadastrado com sucesso')
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
        res.json('Erro ao cadastrar')
      } else {
        res.json('Cadastrado com sucesso')
      }
    }
  )
})

app.listen(port, () => console.log(`Listening on port ${port}`));