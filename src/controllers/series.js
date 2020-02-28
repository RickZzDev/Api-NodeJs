let serieDAO =  require('../models/Series');

serieDAO = new serieDAO;

module.exports = {



    async listar(req,res){
      
            const lista =  await serieDAO.lista();

            if(lista)
                return res.send(lista)
            res.status(404).send({erro: 'Lista vazia'})    
    },

    async insere(req,res){
        let serie = req.body;
        try{
            let resultado = await serieDAO.insere(serie)
            const insertId = resultado.insertId;
            serie = { id:insertId, ...serie};
            return res.status(201).send(serie)
        }catch(erro){
            return res.status(500).send({"erro":erro});
        }

    },

    async buscarPorId(req,res){
        const id = req.params.id;

        let serie  = await serieDAO.buscaPorId(id);
        serie = serie[0]

        if(!serie)
            return res.status(404).send('erro')
        return res.send(serie)    

    },

    async atualiza(req,res){
        const id = req.params.id;
        const serie = req.body;
        serie.id = id;

        const retorno = await serieDAO.atualiza(serie)
        
        if(!retorno)
            return res.status(404).send({erro:'serie nao encontrada'});
        res.status(200).send(serie);
      
    },

    async delete(req,res){
        const id = req.params.id;
        const retorno = await serieDAO.delete(id)
        if(!retorno.affectedRows)
            return  res.status(404).send({'erro':'serie nao encontrada'})
        res.status(204).send(retorno)
    } 

}

