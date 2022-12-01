const { body } = require("express-validator")
const { User } = require("../database/models/index")
const { extname, resolve } = require("path")
const { unlinkSync } = require("fs")

const register = [
    body("name").notEmpty().withMessage("El nombre no puede quedar vacío").bail().isLength({ min: 2 }).withMessage("El nombre debe contener más de dos caracteres").bail().isLength({ max: 50 }).withMessage("El nombre no debe tener más de 50 caracteres").bail(),
    body("email").notEmpty().withMessage("El email no puede quedar vacío").bail().isEmail().withMessage("El formato de email no es válido").bail().custom(async (value) => {
        let users = await User.findAll()
        users = users.map(user => user.email)
        if (users.includes(value)) {
            throw new Error("El email ya está registrado")
        }

        return true
    }),
    body("password").notEmpty().withMessage("La contraseña no puede quedar vacia").bail().isLength({ min: 3 }).withMessage("La contraseña debe tener más de 3 caracteres").bail().isLength({ max: 16 }).withMessage("La contraseña debe tener menos de 16 caracteres").bail(),
    body("image").custom((value, { req }) => {
        let imagen = null
        if (req.files && req.files.length > 0) {
            imagen = req.files[0]
        }
        if (imagen == undefined) {
            return true
        }

        let extensiones = [".svg", ".jpg", ".png", ".jpeg"]
        let extension = extname(imagen.filename)
        if (!extensiones.includes(extension)) {
            unlinkSync(resolve(__dirname, "../../uploads/avatars/" + imagen.filename))
            throw new Error("La extension debería ser '.svg', '.jpg', '.png', '.jpeg'")
        }

        if (imagen.size > 2097152) {
            unlinkSync(resolve(__dirname, "../../uploads/avatars/" + imagen.filename))
            throw new Error("La imagen supera el peso de 2MB");
        }

        if (req.files.length > 1) {
            req.files.forEach(img => {
                unlinkSync(resolve(__dirname, "../../uploads/avatars/" + img.filename))
            });
            throw new Error("No puedes subir más de una imagen");
        }

        return true
    })
]

module.exports = register