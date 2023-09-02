const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController{
    async create(req, res) {
        const { name } = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }
    async get(req, res, next) {
        const {id} = req.params
        const brands = await Brand.findAll({where:{id:id}})
        return res.json(brands)
    }
    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
        
    }
    async delete(req, res, next) {
        try{
            const {id} = req.params
            await Brand.destroy({
                where:{id:id}
            })
            return res.json()
        } catch(e){
            next(ApiError.badRequest("Brand doesn't exist"))
        }
    }
}

module.exports = new BrandController()