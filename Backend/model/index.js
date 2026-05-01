const User = require("./user")
const Booking = require("./booking")
const BookingSlots = require("./bookingSlots")
const Specialists = require("./specialists")
const Services = require("./services")

User.hasMany(Booking,{ foreignKey: "userId"});
Booking.belongsTo(User,{foreignKey:"userId"});

Specialists.hasMany(BookingSlots,{foreignKey:"spId"});
BookingSlots.belongsTo(Specialists,{foreignKey:"spId"});

Services.hasMany(BookingSlots,{foreignKey:"serviceId"});
BookingSlots.belongsTo(Services,{foreignKey:"serviceId"})

Services.hasMany(Booking,{foreignKey:"serviceId"})
Booking.belongsTo(Services,{foreignKey:"serviceId"})

module.exports = {User,Booking,BookingSlots,Specialists,Services}
