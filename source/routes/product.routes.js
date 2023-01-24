const { Router } = require("express")
const router =  Router()
const productController = require("../controllers/product.controllers")
const createMiddleware = require("../middlewares/createProduct.middleware")
const editMiddleware = require("../middlewares/editProduct.middleware")

router.get("/allProducts", productController.allProducts)
router.post("/create", createMiddleware, productController.create)
router.get("/:id", productController.one)
router.post("/edit/:id", editMiddleware, productController.edit)
router.post("/delete/:id", productController.delete)

module.exports = router