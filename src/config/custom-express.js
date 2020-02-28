//ARQUIVO PARA CUSTOMIZAR O SERVIDOR
//Importando o express
const express = require('express');
//Injetor de dependencias
const consign = require('consign');


//Import do body parser
const bodyParser = require('body-parser');
//Iniciando o express e guardando da variavel
const app = express();

const customExpress = ()=>{
    //Métodos para adicioar middlewares como body-parser
    app.use(bodyParser.json());

    //Pegando todos arquivos controller na app
    consign().include('controllers').include('models').into(app);

    app.use((req,res,next)=>{
        
        const authHeader = req.headers.Authorization;
        
        if(!authHeader)
          return  res.status(401).send({erro:"Token não encontrado"})

        const parts = authHeader.split(' ');
        
        if(!parts.length === 2)
            return res.status(401).send({erro:'token mal formatado'});
        //recuperando beares e token de parts
        const [bearer, token] = parts;
        
        jwt.verify(token,authConfig.secret, (erro,user)=>{
            if(erro){
                return res.status(401).send({erro:"token inavalido"})
            }else{
                req.userId = user.id;

                return next()
            }
        })
    })

    //Retornando todo o app configurado
    return app;
}

module.exports = customExpress();

