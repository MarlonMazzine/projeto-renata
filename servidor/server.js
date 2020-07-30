const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./_criarconexao')
var cors = require('cors');

app.use(cors())
app.use(express.json())

app.get('/comprassemlicitacao', async (req, res) => {
  db.connect()
  var resultado = await db.query("SELECT * FROM public.comprassemlicitacao")
  res.json(resultado)
});

app.get('/todasasmarcas', async (req, res) => {
  db.connect()
  var resultado = await db.query("SELECT * FROM public.marcas ORDER BY nome ASC")
  res.json(resultado)
});

app.post('/atualizartabeladecomprassemlicitacao', async (req, res) => {
  db.connect()

  var requisicao = req.body
  var codigoDaCompra = requisicao.codigodacompra
  var nomeDaMarca = requisicao.nomedamarca
  var dataDaCompra = requisicao.datadacompra
  var modalidade = requisicao.modalidade
  var codigoCatmat = requisicao.codigocatmat
  var descricaoDoItem = requisicao.descricaodoitem
  var unidadeDeFornecimento = requisicao.unidadedefornecimento
  var quantidadeOfertada = requisicao.quantidadeofertada
  var valorUnitario = requisicao.valorunitario
  var nomeDoFornecedor = requisicao.nomedofornecedor
  var uasg = requisicao.uasg
  var uf = requisicao.uf

  var sql = `INSERT INTO comprassemlicitacao (codigodacompra, nomedamarca, datadacompra, modalidade, codigocatmat, descricaodoitem, unidadedefornecimento, quantidadeofertada, valorunitario, nomedofornecedor, uasg, uf)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`

  var parametros = [codigoDaCompra, nomeDaMarca, dataDaCompra, modalidade, codigoCatmat, descricaoDoItem, unidadeDeFornecimento, quantidadeOfertada, valorUnitario, nomeDoFornecedor, uasg, uf]

  await db.query(sql, parametros)
  .catch(err => {
    res.send(err)
  })
  res.send('Compra cadastrada com sucesso!')
})

app.listen(port, () => console.log(`Listening on port ${port}`));