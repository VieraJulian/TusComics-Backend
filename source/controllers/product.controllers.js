const { Product } = require("../database/models/index")

module.exports = {
    create: async (req, res) => {
        try {
            let imagen = null;

            if (req.files && req.files.length > 0) {
                imagen = req.files[0].filename
            }

            let newProduct = await Product.create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                img: imagen,
                market: req.body.market
            })
            
            return res.status(200).json(newProduct)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}