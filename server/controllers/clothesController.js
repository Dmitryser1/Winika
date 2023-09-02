const { Clothes } = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class ClothesController {
    async create(req, res, next) {
        try {
            const { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const clothes = await Clothes.create({ name, price, brandId, typeId, img: fileName })
            return res.json(clothes)
        } catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        const {brandId, typeId} = req.query
        let clothes;
        if(!brandId && !typeId){
            clothes = await Clothes.findAll()
        }
        if(!brandId && typeId){
            clothes = await Clothes.findAll({where: {typeId}})
        }
        if(brandId && !typeId){
            clothes = await Clothes.findAll({where: {brandId}})
        }
        if(brandId && typeId){
            clothes = await Clothes.findAll({where: {brandId, typeId}})
        }
        return res.json(clothes)

    }
    async delete(req, res, next) {
        try {
            const { id } = req.params
            await Clothes.destroy({
                where: { id: id }
            })
            return res.json()
        } catch (e) {
            next(ApiError.badRequest("Clothes doesn't exist"))
        }
    }
}

module.exports = new ClothesController()