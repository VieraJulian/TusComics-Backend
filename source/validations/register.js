const { body } = require("express-validator")

const register = [
    body("name").notEmpty().withMessage("El nombre no puede quedar vacio").bail().isLength({ min: 2}).withMessage("El nombre debe contener más de dos caracteres").bail().isLength({ max: 50}).withMessage("El nombre no debe tener más de 50 caracteres").bail(),
]

module.exports = register