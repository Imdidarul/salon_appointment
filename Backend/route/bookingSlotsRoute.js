const express = require("express")
const router = express.Router()
const bookingSlotsController = require("../controller/bookingSlotsController")

router.post("/addBookingSlot",bookingSlotsController.addBookingSlot)
router.delete("/deleteBookingSlot",bookingSlotsController.deleteBookingSlot)
router.get("/getAllBookingSlots",bookingSlotsController.getAllBookingSlots)
router.get("/getBookingSlot",bookingSlotsController.getBookingSlot)

module.exports = router