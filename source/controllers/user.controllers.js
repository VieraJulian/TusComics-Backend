const { User } = require("../database/models/index")
const { hashSync } = require("bcryptjs")

module.exports = {
    process: async (req, res) => {
        try {
            let userDB = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashSync(req.body.password, 10),
                img: "",
                admin: (req.body.email).includes("@tuscomics.com") ? true : false
            })
            console.log(userDB)
            return res.status(200).json(userDB)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}