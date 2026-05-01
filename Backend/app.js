const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
require("./model")
const db = require("./config/dbConnection")
const userRoute = require("./route/userRoute")
const bookingRoute = require("./route/bookingRoute")
const bookingSlotsRoute = require("./route/bookingSlotsRoute")
const servicesRoute = require("./route/servicesRoute")
const specialistRoute = require("./route/specialistRoute")

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).send("Backend is running")
})

app.use("/user",userRoute)
app.use("/booking",bookingRoute)
app.use("/bookingSlots",bookingSlotsRoute)
app.use("/services",servicesRoute)
app.use("/specialist",specialistRoute)


db.sync().then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log("Server is running")
    })
}).catch((err)=>{
    console.log(err)
})
