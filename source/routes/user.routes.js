const { Router } = require("express")
const router = Router()
const userController = require("../controllers/user.controllers")
const registerMiddleware = require("../middlewares/register.middleware")

router.post("/register", registerMiddleware, userController.process)

module.exports = router