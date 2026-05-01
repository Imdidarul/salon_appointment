const sequelize = require("../conifg/dbConnection")
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
            type: DataTypes.INTEGER
        },
        date:{
            type:DataTypes.DATE
        },
        time:{
            type:DataTypes.STRING
        }
    }
)

module.exports = bookingSlots