const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')

router.post('/', brandController.create)
router.get('/:id', brandController.get)
router.get('/', brandController.getAll)
router.delete('/:id', brandController.delete)


module.exports = router