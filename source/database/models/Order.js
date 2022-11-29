module.exports = (sequelize, Datatypes) => {
    let alias = "Order"
    let cols = {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: Datatypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        total: {
            type: Datatypes.DECIMAL(10, 2),
            allowNull: false
        },
        paymentMethod: {
            type: Datatypes.STRING(25),
            allowNull: false
        },
        shippingMethod: {
            type: Datatypes.STRING(25),
            allowNull: false
        }
    }

    let config = {
        tableName: "orders"
    }

    const Order = sequelize.define(alias, cols, config)

    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            as: "user",
            foreignKey: "userId"
        }),
        Order.hasMany(models.OrderItem, {
            as: "orderItems",
            foreignKey: "orderId"
        })
    }

    return Order
}