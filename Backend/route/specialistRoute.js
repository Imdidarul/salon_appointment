const express = require("express")
const router = express.Router()
const specialistController = require("../controller/specialistController")

router.post("/addSpecialist",specialistController.addSpecialist)
router.delete("/deleteSpecialist".specialistController.deleteSpecialist)
router.get("/getSpecialists",specialistController.getSpecialists)
router.get("/getSpecialist",specialistController.getSpecialist)


module.exports = router