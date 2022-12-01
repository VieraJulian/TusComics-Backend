const { body } = require("express-validator")
const { extname, resolve } = require("path")
const { unlinkSync } = require("fs")

const createProduct = [
    body("name").notEmpty().withMessage("El nombre no puede quedar vacío").bail().isLength({ min: 2 }).withMessage("El nombre debe contener un minímo de dos caracteres").bail().isLength({ max: 50 }).withMessage("El nombre no debe contener más de 50 caracteres").bail(),
    body("description").notEmpty().withMessage("La descripción no puede quedar vacia").bail().isLength({ min: 2 }).withMessage("La descripción debe contener un minímo de dos caracteres").bail().isLength({ max: 500 }).withMessage("La descripción no debe contener más de 500 caracteres").bail(),
    body("price").notEmpty().withMessage("El precio no puede quedar vacío").bail().isNumeric().withMessage("No se permiten letras").bail().custom(value => {
        let precio = Number(value)

        if (precio === 0 || precio < 0) {
            throw new Error("El precio debe ser mayor a 0")
        }

        if (precio > 1000000.00) {
            throw new Error("El precio debe ser menor a 1000000.00")
        }

        return true
    }),
    body("image").custom((value, { req }) => {
        let imagen = req.files

        if (!imagen || imagen.length == 0) {
            throw new Error("La imagen no puede quedar vacía")
        }

        let extensiones = [".svg", ".jpg", ".png", ".jpeg"]
        let extension = extname(imagen[0].filename)
        if (!extensiones.includes(extension)) {
            unlinkSync(resolve(__dirname, "../../uploads/products/" + imagen[0].filename))
            throw new Error("La extension debería ser '.svg', '.jpg', '.png', '.jpeg'")
        }

        if (imagen[0].size > 2097152) {
            unlinkSync(resolve(__dirname, "../../uploads/products/" + imagen[0].filename))
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

module.exports = createProduct