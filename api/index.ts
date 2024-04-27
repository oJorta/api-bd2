const express = require('express')
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'sql10.freesqldatabase.com',
  user: 'sql10700912',
  password: 'IAUnF37gkg',
  database: 'sql10700912'
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL');
});

app.use(cors({
  origin: '*'
}));

app.get("/", (req, res) => res.send("APIzinha de Banco de Dados II"));

// Rota para obter os nomes de todas as tabelas
app.get('/tabelas', (req, res) => {
  db.query('SHOW TABLES', (err, result) => {
    if (err) {
      res.status(500).send('Erro ao obter nomes das tabelas');
      throw err;
    }
    const tables = result.map(row => row[`Tables_in_${db.config.database}`]);
    res.json(tables);
  });
});

// Rota para consultar todos os registros de uma tabela específica
app.get('/consulta/:tabela', (req, res) => {
  const tabela = req.params.tabela;
  const query = `SELECT * FROM ${tabela}`;
  
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Erro ao executar a consulta');
      throw err;
    }
    res.json(result);
  });
});

// Rota para consultar todos os registros de uma view específica
app.get('/view/:nome_view', (req, res) => {
  const view = req.params.nome_view;
  const query = `SELECT * FROM ${view}`;
  
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Erro ao executar a consulta');
      throw err;
    }
    res.json(result);
  });
});

// Rota para chamar uma procedure
app.get('/procedure/:procedure/:param', (req, res) => {
  const procedureName = req.params.procedure;
  const param = req.params.param;

  db.query(`CALL ${procedureName}(${param})`, (err, results, fields) => {
    if (err) {
      res.status(500).send('Erro ao executar a procedure');
      throw err;
    }
    res.json(results);
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
