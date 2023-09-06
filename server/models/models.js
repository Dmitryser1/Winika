const { types } = require('pg')
const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
})

const Cart = sequelize.define('cart', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const Clothes = sequelize.define('clothes', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    img: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
})

const Brand = sequelize.define('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull: false },
})

const CartClothes = sequelize.define('cart_clothes', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const ClothesInfo = sequelize.define('clothes_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    characteristics: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
})

const TypeBrand = sequelize.define('typebrand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

User.hasOne(Cart)
Cart.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Cart.hasMany(CartClothes)
CartClothes.belongsTo(Cart)



Clothes.hasMany(CartClothes)
CartClothes.belongsTo(Clothes)

Clothes.hasMany(Rating)
Rating.belongsTo(Clothes)

Clothes.hasMany(ClothesInfo, {as: 'info'})
ClothesInfo.belongsTo(Clothes)

Type.hasMany(Clothes)
Clothes.belongsTo(Type)

Brand.hasMany(Clothes)
Clothes.belongsTo(Brand)

Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })

module.exports = {
    User, Brand, Type, TypeBrand, Cart, Clothes, CartClothes, ClothesInfo, Rating
}