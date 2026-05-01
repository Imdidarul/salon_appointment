// const {Booking} = require("../model")
const Booking = require("../model/booking")

const addBooking = async(req,res)=>{
    try {
        const {name, userId, spId, serviceId, time} = req.body

        await Booking.create({
            name:name,
            userId:userId,
            spId:spId,
            serviceId:serviceId,
            time:time
        })

        return res.status(200).send("Booking created successfully")
    } catch (error) {
        console.log(error)
        return res.status(500).send("Something went wrong")
    }
}


const deleteBooking = async(req,res)=>{
    try {
        const {bookingId} = req.body

        const booking = await Booking.destroy({where:{id:bookingId}})

        if(!booking){
            return res.status(404).send("Booking not founf")
        }

        return res.status(200).send("Booking deleted")
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong")
    }
}

const getAllBookings = async(req,res)=>{
    try {
        const bookings = await Booking.findAll()

        return res.status(200).json({Bookings:bookings})
    } catch (error) {
        console.log(error)
        return res.status(500).send("Something went wrong")
    }

}

const getBooking = async(req,res)=>{
    try {
        const {bookingId} = req.headers["bookingId"]

        if(!bookingId){
            return res.status(403).send("Booking id not sent")
        }

        const booking = await Booking.findByPk(bookingId)

        if(!booking){
            return res.status(404).send("Booking not found")
        }

        return res.status(200).json({booking:booking})
    } catch (error) {
        console.log(error)
        return res.status(500).send("Something went wrong")
    }
}

module.exports = {addBooking, deleteBooking, getAllBookings, getBooking}