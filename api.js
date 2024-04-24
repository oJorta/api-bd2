const express = require('express')
const mysql = require('mysql');

const app = express();
const port = 3000;

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

// Rota para executar consulta
app.get('/consulta', (req, res) => {
  const query = 'SELECT * FROM aluno';
  
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Erro ao executar a consulta');
      throw err;
    }
    res.json(result);
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
