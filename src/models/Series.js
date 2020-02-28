const conexao = require('../infra/conexao');
const baseQuery = require('../models/baseQuery')


class Series {

  lista()
  {
    return  baseQuery("select * from series")
  }

  //FUNCAO PARA INSERIR UM REGISTRO NO BACNO
  insere(serie)
  {
    return  baseQuery("insert into series set ?",serie);
  }

  buscaPorId(id)
  {
    return baseQuery('select * from series where id = ?',id)
  }


  delete(id)
  {
    return baseQuery("delete from series where id = ?",id)
  }


   //FUNCAO PARA INSERIR UM REGISTRO NO BACNO
   atualiza(serie)
   {
    return baseQuery("update series set ? where id = ?", [serie,serie.id]);
  }
}

module.exports =  Series;