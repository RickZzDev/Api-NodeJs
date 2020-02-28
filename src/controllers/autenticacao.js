//Dessa forma égamos uma posição do json e guardamos ja em uma variavel
const {check,validationResult} = require('express-validator');
const usuarioDAO = new (require('../models/usuarios'))()
//Instalando o webtoken
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const bcrypt = require('bcryptjs')

gerarToken = (params)=>{
    return jwt.sign({id:params}, authConfig.secret,{
        expiresIn: 5000,
    })
}

module.exports = {
    async registrar(req,res)
    {
        const errors = validationResult(req);

        if(!errors.isEmpty())
            return res.status(400).send(errors)
           
        let usuario = req.body;
      
        try{
            usuario.senha = await bcrypt.hash(usuario.senha,10)

            let resultado = await usuarioDAO.insere(usuario)
            usuario = {id:resultado.insertId, ...usuario}

            res.status(201).send({
                usuario,token:gerarToken({id:usuario.id})
            })
        }catch(erro){
           return res.status(500).send(erro)
        }
    },

    async autenticar(req,res){
        const {email,senha} = req.body;

        try{
            let usuario = await usuarioDAO.buscaPorEmail(email);
            usuario = usuario[0]
            if(!usuario){
                return res.status(400).send({erro:'usuario nao cadastrado'});
            }

            if(!await bcrypt.compare(senha, usuario.senha)){

                return res.status(400).send({erro:'Senha invalida', senha: senha, usuSenha:usuario.senha, usuEmail:usuario.email})
            }


            res.send({
                usuario,
                token:
                gerarToken({id: usuario.id})
            })

        }catch(erro){
            console.log(erro)
            res.status(500).send(erro)
        }
    }
}

