// const {BookingSlots} = require("../model")
const bookingSlots = require("../model/bookingSlots")
const BookingSlots = require("../model/bookingSlots")


const addBookingSlot = async(req,res)=>{
    try {
        const {spId, serviceId, date, time} = req.body
        await BookingSlots.create({
            spId:spId,
            serviceId:serviceId,
            date:date,
            time:time
        })

        return res.status(200).send("Slot created")
    } catch (error) {
        console.log(error)
        return res.status(500).send("Something went wrong")
    }
}


const deleteBookingSlot = async(req,res)=>{
    try {
        const {BookingSlotId} = req.body

        const BookingSlot = await BookingSlots.destroy({where:{id:BookingSlotId}})

        if(!BookingSlot){
            return res.status(404).send("Slot not found")
        }

        return res.status(200).send("Slot deleted")
    } catch (error) {
        console.log(error)
        return res.status(500).send("Something went wrong")
    }
}

const getAllBookingSlots = async(req,res)=>{
    try {
        const BookingSlot = await BookingSlots.findAll()
        return res.status(200).json({slots:BookingSlot})
    } catch (error) {
        console.log(error)
        return res.status(500).send("Something went wrong")
    }
}


const getBookingSlot = async(req,res)=>{
    try {
        const {SlotId} = req.headers['bookingSlotId']

        const BookingSlot = await BookingSlots.findByPk(SlotId)

        if(!BookingSlot){
            return res.status(404).send("Slot not found")
        }

        return res.status(200).json({BookingSlot:BookingSlot})
    } catch (error) {
        console.log(error)
        return res.status(500).send("Something went wrong")
    }
}


module.exports = {addBookingSlot, deleteBookingSlot, getAllBookingSlots, getBookingSlot}