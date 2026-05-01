const bcrypt = require("bcrypt")
const User = require("../model/user")
const jwt = require("jsonwebtoken")


function generateToken(id){
    return jwt.sign({userId: id}, process.env.AUTH_SECRET_KEY)
}

const addUser = async (req,res)=>{
    try {
     
    const {name, email, phone, password} = req.body
    const saltRounds = 10

    const hash = await bcrypt.hash(password,saltRounds)
    await User.create({
        name:name,
        email:email,
        phoneno:phone,
        password:hash
    })   

    console.log("User is created")
    res.status(200).send("User created successfully")
    } catch (error) {
        res.status(500).send(error)
     console.log(error)   
    }
}


const validate = async (req,res)=>{
    try {
        const {identifier,password} = req.body

        let user
        if (identifier.includes("@")){
            user = await User.findOne({where:{email:identifier}})
        }else{
            user = await User.findOne({where:{phoneno: identifier}})
        }
        if(!user){
            return res.status(404).json({message:"Error:404 User not found"})
        
        }
        id = user.id

        bcrypt.compare(password, user.password, (err,result)=>{
            if (err){
                return res.status(400).json("Something went wrong")
            }
            if (result){
                return res.status(200).json({message:"User logged in succesfully", id: id, token: generateToken(user.id), phone: user.phoneno})
            }else{
                return res.status(401).json({message:"Password is incorrect"})
            }
        })      
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}


module.exports = {addUser,validate}