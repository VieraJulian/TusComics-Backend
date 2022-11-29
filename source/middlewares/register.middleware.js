const multer = require("multer")
const storage = require("../modules/storage")
const upload = multer({ storage: storage("avatars") })
const validations = require("../validations/register")

module.exports = [upload.any(), validations]
