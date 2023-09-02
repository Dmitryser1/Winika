const Router = require('express')
const router = new Router()
const clothesController = require('../controllers/clothesController')

router.post('/',clothesController.create)
router.get('/',clothesController.getAll)
router.delete('/',clothesController.delete)


module.exports = router