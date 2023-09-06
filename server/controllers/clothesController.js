const { Clothes, ClothesInfo } = require('../models/models')
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

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => ClothesInfo.create({
                    title: i.title,
                    description: i.description,
                    clothesId: clothes.id
                }))
            }

            return res.json(clothes)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res) {
        const { id } = req.params
        const clothes = await Clothes.findOne(
            {
                where: { id },
                include: [{ model: ClothesInfo, as: 'info' }]
            },
        )
        return res.json(clothes)

    }
    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let clothes;
        if (!brandId && !typeId) {
            clothes = await Clothes.findAndCountAll({ limit, offset })
        }
        if (!brandId && typeId) {
            clothes = await Clothes.findAndCountAll({ where: { typeId }, limit, offset })
        }
        if (brandId && !typeId) {
            clothes = await Clothes.findAndCountAll({ where: { brandId }, limit, offset })
        }
        if (brandId && typeId) {
            clothes = await Clothes.findAndCountAll({ where: { brandId, typeId }, limit, offset })
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