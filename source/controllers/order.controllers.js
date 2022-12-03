const { Order } = require("../database/models/index")

module.exports = {
    checkout: async (req, res) => {
        try {
            req.body.total = Number(req.body.total)
            let order = await Order.create({
                ...req.body, userId: req.session.user.id
            },{
                include: {
                    all:true
                }
            })
            return res.status(200).json(order)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}