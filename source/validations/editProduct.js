const { body } = require("express-validator")
const { extname, resolve } = require("path")
const { unlinkSync } = require("fs")

const editProduct = [
    body("name").custom(value => {

        if (value == "") { // probar luego con el Front
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
    body("description").custom(value => {
        if (value == "") {
            return true
        }

        if (value.length < 2) {
            throw new Error("La descripción debe contener un minímo de dos caracteres")
        }

        if (value.length > 500) {
            throw new Error("La descripción no debe contener más de 500 caracteres")
        }

        return true
    }),
    body("price").custom(value => {
        if (value == "") {
            return true
        }

        let precio = Number(value)

        if (isNaN(precio)) {
            throw new Error("No se permiten letras")
        }

        if (precio === 0 || precio < 0) {
            throw new Error("El precio debe ser mayor a 0")
        }

        if (precio > 1000000.00) {
            throw new Error("El precio debe ser menor a 1000000.00")
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
            unlinkSync(resolve(__dirname, "../../uploads/products/" + imagen.filename))
            throw new Error("La extension debería ser '.svg', '.jpg', '.png', '.jpeg'")
        }

        if (imagen.size > 2097152) {
            unlinkSync(resolve(__dirname, "../../uploads/products/" + imagen.filename))
            throw new Error("La imagen supera el peso de 2MB");
        }

        if (req.files.length > 1) {
            req.files.forEach(img => {
                unlinkSync(resolve(__dirname, "../../uploads/products/" + img.filename))
            });
            throw new Error("No puedes subir más de una imagen");
        }

        return true
    })
]

module.exports = editProduct