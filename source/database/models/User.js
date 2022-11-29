module.exports = (sequelize, Datatypes) => {
    let alias = "User"
    let cols = {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Datatypes.STRING(50),
            allowNull: false
        },
        email: {
            type: Datatypes.STRING(100),
            allowNull: false
        },
        password: {
            type: Datatypes.STRING(100),
            allowNull: false
        },
        img: {
            type: Datatypes.STRING(100),
            allowNull: false
        },
        admin: {
            type: Datatypes.BOOLEAN,
            allowNull: false
        }
    }

    let config = {
        tableName: "users"
    }

    const User = sequelize.define(alias, cols, config)

    User.associate = (models) => {
        User.hasMany(models.Order, {
            as: "orders",
            foreignKey: "userId"
        })
    }

    return User
}