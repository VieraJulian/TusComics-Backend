const multer = require('multer')
const storage = require("../modules/storage")
const upload = multer( { storage: storage("products") })
const validations = require("../validations/editProduct")

module.exports = [upload.any(), validations]