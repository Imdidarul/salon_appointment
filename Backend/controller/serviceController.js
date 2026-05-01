// const {Service} = require("../model")
const Service = require("../model/services")

const addService = async(req,res)=>{
    try {
        const {category, price, description} = req.body
        await Service.create({
            category:category,
            price:price,
            description:description
        })        
        return res.status(200).send("Service added successfully")
    } catch (error) {
        console.log(error)
        return res.status(500).send("Could not add service")
    }
}

const deleteService = async(req,res)=>{
    try {
    const {serviceId} = req.body
    const service = await Service.destroy({where:{id:serviceId}})   

    if(!service){
        return res.status(404).send("Service not found")
    }
    } catch (error) {
        console.log(error)
        return res.status(500).send("Could not be deleted")       
    }
}

const getAllServices = async(req,res)=>{
    try {
        const services = await Service.findAll()

        if(!services){
            return res.status(404).send("Something went wrong")
        }
    
        return res.status(200).json({services:services})
    } catch (error) {
        console.log(error)
        res.status(500).send("Server side error")
    }

}

const getService = async(req,res)=>{
    try {
        const {serviceId} = req.headers['serviceId']

        const service = await Service.findByPk(serviceId)
    
        if(!service){
            return res.status(404).send("Service not found")
        }
    
        return res.status(200).json({service:service})
    } catch (error) {
        console.log(error)
        return res.status(500).send("Something went wrong")
    }

}

module.exports = {addService, deleteService, getAllServices, getService}