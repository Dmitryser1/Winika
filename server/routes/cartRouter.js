const Router = require('express')
const router = new Router()
const cartController = require('../controllers/cartController')

router.post('/', cartController.add)
router.get('/:id', cartController.get)
router.delete('/:id', cartController.delete)

module.exports = router