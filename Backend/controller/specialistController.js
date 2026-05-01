const {Specialist} = require("../model")
// const Specialist = require("../model/specialists")
const addSpecialist = async (req,res)=>{
    try {
        const {name, specialisation, rating} = req.body

        await Specialist.create({
            name:name,
            specialisation:specialisation,
            rating:0
        })

        return res.status(200).send("Specialist created successfully")
    } catch (error) {
        console.log(error)
        return res.status(500).send("Server side error")
        
    }
}


const deleteSpecialist = async (req,res)=>{
    try {   
    const {spId} = req.body

    const user = await Specialist.findByPk(spId)

    if(!user){
        return res.status(404).send("Specialist not found")
    }

    const specialist = await Specialist.destroy({
        where:{
            id:spId
        }
    })

    if (!specialist){
        return res.status(404).send("Specialist not found")
    }

    return res.status(200).send("User deleted successfully")
    } catch (error) {
        console.log(error)
        return res.status(500).send("Could not be deleted")
    }
}

const getAllSpecialists = async (req,res)=>{
    try {     
    const specialists = await Specialist.findAll()

    return res.status(200).json({specialists:specialists}) 
    } catch (error) {
        console.log(error)
        return res.status(500).send("Could not get specialists")
    }
}


// const getSpecialist = async (req,res)=>{
//     try {
        
//     } catch (error) {
//         res.status(500).send("Could not get specialist")
//     }
// }

module.exports = {addSpecialist, deleteSpecialist, getAllSpecialists}