const sequelize = require("../config/dbConnection")
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
            type: DataTypes.STRING,
            allowNull:false
        },
        rating:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    }
)

module.exports = specialists