const Router = require('express')
const typeController = require('../controllers/typeController')
const router = new Router()

router.post('/',typeController.create)
router.get('/:id',typeController.get)
router.get('/',typeController.getAll)
router.delete('/:id', typeController.delete)


module.exports = router