const { body } = require("express-validator")
const { User } = require("../database/models/index")
const { extname, resolve } = require("path")
const { unlinkSync } = require("fs")
const { compareSync } = require("bcryptjs")

const editProfile = [
    body("name").custom(value => {
        if (value === "") {
            return true
        }

        if (value.length < 2) {
            throw new Error("El nombre debe contener un minímo de 2 caracteres")
        }

        if (value.length > 50) {
            throw new Error("El nombre no debe contener más de 50 caracteres")
        }

        return true
    }),
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
    }),
    body("password").custom(async (value, { req }) => {
        let users = await User.findAll()
        let userDB = users.find(user => user.email === req.session.user.email)

        if (value === "") {
            return true
        }

        if (!compareSync(value, userDB.password)) {
            throw new Error("La contraseña es incorrecta")
        }

        return true
    }),
    body("newPassword").custom((value, { req }) => {
        if (req.body.password === "") {
            return true
        }

        if (value.length < 3) {
            throw new Error("La contraseña debe tener más de 2 caracteres")
        }

        if (value.length > 16) {
            throw new Error("La contraseña debe tener máximo 16 caracteres")
        }

        return true
    })
]

module.exports = editProfile