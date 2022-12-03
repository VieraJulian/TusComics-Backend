module.exports = (sequelize, Datatypes) => {
    let alias = "Product"
    let cols = {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Datatypes.STRING(100),
            allowNull: false
        },
        description: {
            type: Datatypes.TEXT,
            allowNull: false
        },
        price: {
            type: Datatypes.DECIMAL(10, 2),
            allowNull: false
        },
        img: {
            type: Datatypes.STRING(100),
            allowNull: false
        },
        market: {
            type: Datatypes.BOOLEAN,
            allowNull: false
        }
    }

    let config = {
        tableName: "products",
        paranoid: true
    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = (models) => {
        Product.hasMany(models.OrderItem, {
            as: "orderitems",
            foreignKey: "productId",
        })
    }

    return Product
}