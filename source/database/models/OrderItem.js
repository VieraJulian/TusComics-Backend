module.exports = (sequelize, Datatypes) => {
    let alias = "OrderItem"
    let cols = {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        orderId: {
            type: Datatypes.INTEGER,
            allowNull: false,
            references: {
                model: "orders",
                key: "id"
            }
        },
        productId: {
            type: Datatypes.INTEGER,
            allowNull: false,
            references: {
                model: "products",
                key: "id"
            }
        },
        name: {
            type: Datatypes.STRING(100),
            allowNull: false
        },
        price: {
            type: Datatypes.DECIMAL(10, 2),
            allowNull: false
        },
        quantity: {
            type: Datatypes.INTEGER,
            allowNull: false
        }
    }

    let config = {
        tableName: "orderitems"
    }

    const OrderItem = sequelize.define(alias, cols, config)

    OrderItem.associate = (models) => {
        OrderItem.belongsTo(models.Product, {
            as: "product",
            foreignKey: "productId"
        }),
        OrderItem.belongsTo(models.Order, {
            as: "order",
            foreignKey: "orderId"
        })
    }

    return OrderItem
}