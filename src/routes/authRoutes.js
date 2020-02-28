const router = require('express').Router()
const authCntrl = require('../controllers/autenticacao')
const UsuarioValidator = require('../validators/Usuario');

router.post('/registrar',UsuarioValidator.validacoes(),authCntrl.registrar)

router.post('/autenticar',authCntrl.autenticar)

module.exports = router