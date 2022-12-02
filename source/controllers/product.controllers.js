const { Product } = require("../database/models/index")
const { validationResult } = require("express-validator")
const { resolve } = require("path")
const { unlinkSync } = require("fs")

module.exports = {
    create: async (req, res) => {
        try {
            let validations = validationResult(req)
            let { errors } = validations
            let errorMsg = errors.map(err => Object({
                param: err.param,
                value: err.value,
                msg: err.msg
            }))

            if (errors && errors.length > 0) {
                return res.status(200).json(errorMsg)
            }

            let imagen = null;

            if (req.files && req.files.length > 0) {
                imagen = req.files[0].filename
            }

            let newProduct = await Product.create({
                name: req.body.name,
                description: req.body.description,
                price: Number(req.body.price),
                img: imagen,
                market: req.body.market != undefined ? true : false // probar luego con el Front
            })

            return res.status(200).json(newProduct)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    one: async (req, res) => {
        try {
            const productDB = await Product.findOne({
                where: {
                    id: req.params.id
                }
            })

            let product = {
                id: productDB.id,
                name: productDB.name,
                description: productDB.description,
                price: Number(productDB.price),
                img: productDB.img,
                market: productDB.market // probar luego con el Front
            }

            return res.status(200).json(product)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    edit: async (req, res) => {
        try {
            let validations = validationResult(req)
            let { errors } = validations
            let errorMsg = errors.map(err => Object({
                param: err.param,
                value: err.value,
                msg: err.msg
            }))

            if (errors && errors.length > 0) {
                return res.status(200).json(errorMsg)
            }

            let productDB = await Product.findByPk(req.params.id)

            let imagen = null;

            if (req.files && req.files.length > 0) {
                imagen = req.files[0].filename
            }

            await Product.update({
                name: req.body.name ? req.body.name : productDB.name,
                description: req.body.description ? req.body.description : productDB.description,
                price: req.body.price ? Number(req.body.price) : Number(productDB.price),
                img: imagen ? imagen : productDB.img,
                market: req.body.market ? req.body.market : productDB.market // probar luego con el Front
            }, {
                where: {
                    id: productDB.id
                }
            })

            let productUpdate = await Product.findByPk(req.params.id)

            return res.status(200).json(productUpdate)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    delete: async (req, res) => {
        try {
            let product = await Product.findByPk(req.params.id)
            
            let deleteProduct = await product.destroy()
            unlinkSync(resolve(__dirname, "../../uploads/products/" + product.img))

            return res.status(200).json(deleteProduct)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}