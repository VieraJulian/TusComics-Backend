const multer = require('multer');
const storage = require('../modules/storage');
const upload = multer({ storage: storage("products") });

module.exports = [upload.any()]