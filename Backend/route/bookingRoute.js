const express = require("express")
const router = express.Router()
const bookingController = require("../controller/bookingController")

router.post("/addBooking",bookingController.addBooking)
router.delete("/deleteBooking",bookingController.deleteBooking)
router.get("/getAllBookings",bookingController.getAllBookings)
router.get("/getBooking",bookingController.getBooking)

module.exports = router