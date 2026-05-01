const sequelize = require("../config/dbConnection")
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
            type:DataTypes.STRING,
            allowNull: false
        },
        price:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        description:{
            type:DataTypes.TEXT,
            allowNull: false
        }

    }
)

module.exports = services