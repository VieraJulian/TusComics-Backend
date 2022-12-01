const { Product } = require("../database/models/index")
const { validationResult } = require("express-validator")

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
                market: req.body.market
            })

            return res.status(200).json(newProduct)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}