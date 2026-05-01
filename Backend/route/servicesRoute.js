const express = require("express")
const router = express.Router()
const serviceController = require("../controller/serviceController")

router.post("/addService",serviceController.addService)
router.delete("/deleteService",serviceController.deleteService)
router.get("/getAllServices",serviceController.getAllServices)
router.get("/getService",serviceController.getService)

module.exports = router