let categoriaDao = require('../models/Categorias')

categoriaDao = new categoriaDao

module.exports = {
     async lista(req,res){
        const lista = await categoriaDao.lista()

        if(lista)
            return res.send(lista)
        res.status(404).send({erro:"lista vazia"})    
    },

    async insere(req,res){
       let categoria = req.body
       res.send(categoria)
       try{
           let retorno = await categoriaDao.insere(categoria)
           const insertedId = retorno.insertId
           categoria = {id:insertId, ...categoria}
           return res.status(201).send(categoria)
       }catch(erro){
           return res.status(500).send({"erro":erro})
       }
    },

    async buscaPorId(req,res){
        const id = req.params.id

        let categoria = await categoriaDao.buscaPorId(id)
        categoria = categoria[0]

        if(!categoria)
            return res.status(404).send("erro")
        return res.send(categoria)    
    },

    async atualiza(req,res){
        const id = req.params.id
        const categoria = categoria.body
        categoria.id = id

        const retorno = await categoriaDao.atualiza(categoria)

        if(!retorno)
            return res.status(404).send({erro:"categoria nao encontrada"})
        res.status(200).send(categoria)    
    }
}