const { User } = require("../database/models/index")
const { hashSync } = require("bcryptjs")

module.exports = {
    process: async (req, res) => {
        try {
            let userDB = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashSync(req.body.password, 10),
                img: req.files[0].filename,
                admin: (req.body.email).includes("@tuscomics.com") ? true : false
            })
            return res.status(200).json(userDB)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}