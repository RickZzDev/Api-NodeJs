const conexao = require('../infra/conexao')
const baseQuery = require('../models/baseQuery')

class Categorias {
    lista(){
        return baseQuery('select * from categorias')
    }

    insere(categoria){
        return baseQuery('insert into categorias set ?',categoria)
    }

    buscaPorId(id){
        return baseQuery('select * from categorias where id_categoria = ?', id)
    }

    delete(id){
        return baseQuery("delete from categorias where id_categoria = ? ", id)
    }

    atualiza(categoria){
        return baseQuery('update categorias set ? where id_categoria = ?', [categoria,categoria.id])
    }
}

module.exports = Categorias