const {check, body} = require('express-validator');
const usuarioDao  = new (require("../models/usuarios"))();

class UsuarioValidator{
    //O static permite chamar o metodo ser instanciar a classe
    static validacoes(){
        return [
            check('nome').isLength({min:3, max: 50})
                .withMessage('Deve ter entre 3 e 50 caracteres'),
            check('email').isEmail()
                .withMessage('Deve ser um email válido'),
            check('senha').isLength({min:2, max:15})
                .withMessage('A senha deve ter entre oito e quinze caracteres'),
            //Usando o metodo boyd o express para validar se ja existe um email cadastrado
            //ativando o metodo busca email podemos vem se esse email existe ou nao 
            body('email').custom(async email=>{
                let usuario = await usuarioDao.buscaPorEmail(email)
                usuario = usuario[0]
                if(usuario)
                    return Promise.reject('E-mail ja esta em uso')
            })         
        ]
    }


}

module.exports = UsuarioValidator;