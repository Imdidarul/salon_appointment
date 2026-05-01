const sequelize = require("../conifg/dbConnection")
const {DataTypes} = require("sequelize")
const specialists = sequelize.define(
    "specialists",{
        id:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        specialisation:{
            type: DataTypes.STRING
        },
        rating:{
            type:DataTypes.INTEGER
        }
    }
)

module.exports = specialists