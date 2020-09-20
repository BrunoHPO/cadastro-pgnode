const express = require('express');
const bodyParser = require('body-parser');

const db = require('./dbConnection/dbConfig');

const app = express();

let funcionariosParams = {
  rows:[],
  columns: [],
  types: []
};

app.set('view engine', 'ejs');
app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

/* ### Criação de rotas ### */

app.get('/', (_, res) => {
  db.query('SELECT * FROM funcionarios', (_, results) =>{
    //console.log(result.rows);
      let columns = [];
      for (let key in results.rows[0]) {
        columns.push(key);
      }

      let rows = results.rows;      

      funcionariosParams = {
        rows,
        columns
      };

      res.render('home', {funcionariosParams});
      /*db.query('SELECT DISTINCT profissao FROM funcionarios ORDER BY profissao ASC', (_, results2) => {
        let types = results2.rows;
        funcionariosParams = {
          (...),
          types
        };

        console.log(funcionariosParams);
        res.render('home', {funcionariosParams});
      }) */
  })    
})

app.get('/cadastro', (_, res) => {
  res.render('cadastro');
})

app.post('/cadastrar', (req, res) => {
  // Obtenha os dados do formulário de cadastro aqui utilizando o req.body
  //console.log(req.body);
  
  // DICA: utilize o console.log() para verificar se os dados estão
  // sendo recebidos corretamente.
  
  // Renderize a página inicial (home) com o cadastro incluso na tabela

  db.query(
    `INSERT INTO funcionarios (cpf, nome, genero, dataNasc, profissao) VALUES ('${req.body.cpf}','${req.body.name}','${req.body.gender}','${req.body.date}','${req.body.occupation}')`,
    (err, _) => {
      if (err) {
        console.log(err.stack);
      } else {
        res.redirect('/');
      }
    }
  );
})

db.connect().then(
  () => app.listen(3000, () => {
    console.log('Servidor rodando...');
  })
);
