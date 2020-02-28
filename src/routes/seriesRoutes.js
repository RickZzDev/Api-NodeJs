const router = require('express').Router()
const serieCtrl = require('../controllers/series')


router.get('/',serieCtrl.listar)
router.post('/',serieCtrl.insere)
router.get('/:id', serieCtrl.buscarPorId)
router.put('/:id',serieCtrl.atualiza)
router.delete('/:id',serieCtrl.delete)


module.exports = router;