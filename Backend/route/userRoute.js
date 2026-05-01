const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")

router.post("/addUser",userController.addUser)
router.post("/validate",userController.validate)


module.exports = router