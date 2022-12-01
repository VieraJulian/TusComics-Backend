const { Router } = require("express")
const router =  Router()
const productController = require("../controllers/product.controllers")
const createMiddleware = require("../middlewares/createProduct.middleware")

router.post("/create", createMiddleware, productController.create)

module.exports = router