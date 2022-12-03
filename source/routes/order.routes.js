const { Router } = require("express")
const router = Router()
const orderController = require("../controllers/order.controllers")

router.post("/checkout", orderController.checkout)

module.exports = router