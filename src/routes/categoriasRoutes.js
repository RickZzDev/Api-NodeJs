const router = require('express').Router()
const categoriaCtrl = require('../controllers/categoria')


router.get('/',categoriaCtrl.lista)
router.post('/',categoriaCtrl.insere)

module.exports = router