const sequelize = require("../config/dbConnection")
const {DataTypes} = require("sequelize")
const bookingSlots = sequelize.define(
    "bookingSlots",{
        id:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        spId:{
            type: DataTypes.BIGINT,
            allowNull: false
        },
        serviceId:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        date:{
            type:DataTypes.DATE,
            allowNull:false
        },
        time:{
            type:DataTypes.STRING,
            allowNull:false
        }
    }
)

module.exports = bookingSlots