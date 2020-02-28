const conexao = require('../infra/conexao');
const baseQuery = require('../models/baseQuery');

class Usuarios{
    
    insere(usuario){
        return  baseQuery("insert into usuarios set ?",usuario);
    }


    buscaPorEmail(email){
        return baseQuery("select * from usuarios where email = ?",email)
    }

}

module.exports = Usuarios;