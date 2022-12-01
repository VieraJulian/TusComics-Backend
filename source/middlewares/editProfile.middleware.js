const multer = require('multer')
const storage = require('../modules/storage')
const upload = multer({ storage: storage("avatars") })

module.exports = [upload.any()]