const { Router } = require("express")
const router = Router()
const userController = require("../controllers/user.controllers")

router.post("/register", userController.process)

module.exports = router