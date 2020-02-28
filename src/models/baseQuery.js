const conexao = require('../infra/conexao');

module.exports = (sql,params) =>{
    return new Promise((resolve,reject)=>{
        console.log(sql + '---' + params)
        conexao.query(sql, params || "",(erro,retorno)=>{
            if(erro) 
                return reject('erro')
            else
                return resolve(retorno)    
        })
    })
}