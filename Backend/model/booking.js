const sequelize = require("../config/dbConnection")
const {DataTypes} = require("sequelize")
const booking = sequelize.define(
    "booking",{
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
        userId:{
            type: DataTypes.STRING,
            allowNull: false
        },
        spId:{
            type: DataTypes.BIGINT,
            allowNull: false
        },
        serviceId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        time:{
            type:DataTypes.DATE,
            allowNull:false
        }
    }
)

module.exports = booking