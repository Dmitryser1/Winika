const Router = require('express')
const router = new Router()
const brandRouter = require('./brandRouter')
const clothesRouter = require('./clothesRouter')
const ratingRouter = require('./ratingRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/clothes', clothesRouter)
router.use('/rating', ratingRouter)


module.exports = router