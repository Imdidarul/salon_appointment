const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
require("./model")
const db = require("./conifg/dbConnection")
const userRoute = require("./route/userRoute")


app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).send("Backend is running")
})

app.use("/user",userRoute)


db.sync().then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log("Server is running")
    })
}).catch((err)=>{
    console.log(err)
})
