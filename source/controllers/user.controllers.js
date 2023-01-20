const { User } = require("../database/models/index")
const { hashSync } = require("bcryptjs")
const { validationResult } = require("express-validator")
const { resolve } = require("path")
const { unlinkSync } = require("fs")

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

            if (errors && errors.length > 0) {
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
    },
    access: async (req, res) => {
        try {
            let validations = validationResult(req)
            let { errors } = validations
            let errorMsg = errors.map(err => Object({
                param: err.param,
                value: err.value,
                msg: err.msg
            }))

            if (errors && errors.length > 0) {
                return res.status(200).json(errorMsg)
            }

            let users = await User.findAll({
                include: {
                    all: true
                }
            })
            let userDB = users.find(user => user.email === req.body.email)

            userData = {
                id: userDB.id,
                name: userDB.name,
                email: userDB.email,
                img: userDB.img,
                admin: userDB.admin
            }

            if (req.body.recordame != undefined) {
                res.cookie("recordame", userDB.email, { maxAge: 60000 * 60 })
            }

            req.session.user = userData

            return res.status(200).json(userData)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    editProfile: async (req, res) => {
        try {
            let validations = validationResult(req)
            let { errors } = validations
            let errorMsg = errors.map(err => Object({
                param: err.param,
                value: err.value,
                msg: err.msg
            }))

            if (errors && errors.length > 0) {
                return res.status(200).json(errorMsg)
            }

            let users = await User.findAll()
            let userDB = users.find(user => user.id === req.session.user.id)

            if (req.files && req.files.length > 0 && userDB.img != "default.png") {
                unlinkSync(resolve(__dirname, "../../uploads/avatars/" + userDB.img))
            }

            let editData = {
                name: req.body.name ? req.body.name : userDB.name,
                email: userDB.email,
                password: req.body.newPassword ? hashSync(req.body.newPassword) : userDB.password,
                img: req.files && req.files.length > 0 ? req.files[0].filename : userDB.img,
                admin: userDB.admin
            }

            let userEdited = await User.update(editData, {
                where: {
                    id: userDB.id,
                }
            })

            return res.status(200).json(editData)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}