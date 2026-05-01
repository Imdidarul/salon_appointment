const sequelize = require("../conifg/dbConnection")
const {DataTypes} = require("sequelize")
const services = sequelize.define(
    "services",{
        id:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        category:{
            type:DataTypes.STRING
        },
        price:{
            type: DataTypes.INTEGER
        },
        description:{
            type:DataTypes.TEXT
        }

    }
)

module.exports = services