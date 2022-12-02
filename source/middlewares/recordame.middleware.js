const { User } = require("../database/models/index")

const recordame = async (req, res, next) => {

    if (req.cookies.recordame != undefined && req.session.user == undefined) {
        let users = await User.findAll()
        let user = users.find(user => user.email === req.cookies.recordame)
        req.session.user = user
    }

    next();
}

module.exports = recordame