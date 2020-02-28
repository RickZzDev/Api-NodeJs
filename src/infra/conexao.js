//Importando a classe
const mysql = require('mysql');
//Ativando a conexao e guardando em uma variavel
const conexao = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'bcd127',
    database:'seriesApi'
});


module.exports = conexao;