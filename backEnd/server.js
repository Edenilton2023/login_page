// Importa as bibliotecas
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

// Cria o app
const app = express();
const porta = 3000;

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Conexão com o banco
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admindev',       
  database: 'loginDB' 
});

// Testa a conexão
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err);
  } else {
    console.log('Conectado no MySQL!');
  }
});

// Rota de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
  db.query(sql, [email, senha], (err, resultados) => {
    if (err) {
      return res.status(500).json({ mensagem: 'Erro no servidor' });
    }

    if (resultados.length > 0) {
      res.json({ mensagem: 'Login bem-sucedido', usuario: resultados[0] });
    } else {
      res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
    }
  });
});

// Inicia o servidor
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});