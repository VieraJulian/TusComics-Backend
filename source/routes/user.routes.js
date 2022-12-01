const { Router } = require("express")
const router = Router()
const userController = require("../controllers/user.controllers")
const registerMiddleware = require("../middlewares/register.middleware")
const loginMiddleware = require("../middlewares/login.middleware")
const editProfileMiddleware = require("../middlewares/editProfile.middleware")

router.post("/register", registerMiddleware, userController.process)
router.post("/login", loginMiddleware, userController.access)
router.post("/editProfile", editProfileMiddleware, userController.editProfile)

module.exports = router