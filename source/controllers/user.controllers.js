const { User } = require("../database/models/index")
const { hashSync } = require("bcryptjs")
let { validationResult } = require("express-validator")

module.exports = {
    process: async (req, res) => {
        try {
            let validations = validationResult(req)
            let { errors } = validations
            let errorMsg = errors.map(err => Object({
                param: err.param,
                value: err.value,
                msg: err.msg
            }))

            if(errors && errors.length > 0) {
                return res.status(200).json(errorMsg)
            }

            let userDB = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashSync(req.body.password, 10),
                img: req.files && req.files.length > 0 ? req.files[0].filename : "default.png",
                admin: (req.body.email).includes("@tuscomics.com") ? true : false
            })
            return res.status(200).json(userDB)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}