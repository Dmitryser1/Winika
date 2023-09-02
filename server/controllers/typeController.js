const {Type} = require('../models/models')
const ApiError = require('../error/ApiError')
class TypeController {
    async create(req, res) {
        const { name } = req.body
        const type = await Type.create({name})
        return res.json(type)
    }
    async get(req, res, next) {
        const {id} = req.params
        const types = await Type.findAll({where:{id:id}})
        return res.json(types)
    }
    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
        
    }
    async delete(req, res, next) {
        try{
            const {id} = req.params
            await Type.destroy({
                where:{id:id}
            })
            return res.json()
        } catch(e){
            next(ApiError.badRequest("Type doesn't exist"))
        }
    }
}

module.exports = new TypeController()