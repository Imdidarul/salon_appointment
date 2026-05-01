const sequelize = require("../conifg/dbConnection")
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
            unique:true,
            allowNull: false
        },
        spId:{
            type: DataTypes.BIGINT,
            allowNull: false
        },
        serviceId:{
            type: DataTypes.INTEGER
        },
        time:{
            type:DataTypes.DATE
        }
    }
)

module.exports = booking