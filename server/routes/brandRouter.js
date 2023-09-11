const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole("ADMIN"), brandController.create)
router.get('/:id', brandController.get)
router.get('/', brandController.getAll)
router.delete('/:id', brandController.delete)

module.exports = router