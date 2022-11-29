const { Router } = require("express")
const router = Router()
const userController = require("../controllers/user.controllers")
const multer = require("multer")
const storage = require("../modules/storage")
const upload = multer({ storage: storage("avatars") })

router.post("/register", [upload.any()], userController.process)

module.exports = router