const { Router } = require("express")
const router =  Router()
const productController = require("../controllers/product.controllers")
const createMiddleware = require("../middlewares/createProduct.middleware")
const editMiddleware = require("../middlewares/editProduct.middleware")

router.post("/create", createMiddleware, productController.create)
router.get("/:id", productController.one)
router.post("/edit/:id", editMiddleware, productController.edit)

module.exports = router