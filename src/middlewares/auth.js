const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports =(req,res,next)=>{   
    const authHeader = req.headers.authorization;
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
}