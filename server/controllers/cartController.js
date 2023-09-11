const { Cart } = require('../models/models')
const ApiError = require('../error/ApiError')

class CartController {
    async add(req, res, next) {

    }
    async get(req, res, next) {
        const { id } = req.params
        const cart_items = await Cart.findAll({ where: { id: id } })
        return res.json(cart_items)
    }
    async delete(req, res, next) {

    }
}