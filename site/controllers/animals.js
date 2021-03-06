const Animal = require("../models/animals");
const User = require("../models/user");
const fs = require('fs');

exports.addAnimalAnnouncement = async (req, res) => {
    const {name, description, age, type, breed, address} = req.body

    let uploadPath=""
        try {
        if(req.files) {
            const {animal_img} = req.files

            uploadPath = process.env.UPLOADED_FILES_PATH + animal_img.name;
            console.log(uploadPath)
            await animal_img.mv(uploadPath)
        }

            const animal = await Animal.create({
                name: name,
                description: description,
                age: age,
                type:type,
                breed: breed,
                address: address,
                postedById: req.userId,
                animal_img:uploadPath
            })
            return res.status(200).json(animal)

        } catch (err) {
            return res.status(400).json(err)
        }

}

exports.getAnimalsAddedByUser = async (req, res) => {

    const myAnimals = await Animal.findAll({where:
            {postedById: req.userId},
            include: { model: User, as: 'applicants' }
    })

    res.status(200).json(myAnimals)
}

exports.getOneAnimalById = async (req, res) => {
    console.log(req.params.id)
    const animal = await Animal.findByPk(req.params.id)

    if (animal) {
        return res.status(200).json(animal)
    } else {
        return res.sendStatus(404)
    }

}

exports.requestToAdoptAnimal = async (req,res)=>{
    const {animal_id} =req.params

    const user = await User.findByPk(req.userId)
    const animal = await Animal.findByPk(animal_id)
    if(!animal){
        res.sendStatus(404)
    }
    try {

        await animal.addApplicant(user)
        return res.status(200).send("adoption request sent")

    }catch (err){
        console.error(err)

        return res.send(err)
    }
}

exports.getApplicantsToOneAnimal = async (req, res) => {
    const {id} = req.params
    const animal = await Animal.findByPk(id)
    if (!animal) {
        res.sendStatus(404)
    }
    if (animal.postedById != req.userId) {
        return res.sendStatus(403)
    }
    const applicants = await animal.getApplicants()
    res.json(applicants)

}
exports.getAllAnimals = async (req, res) => {

    const animals = await Animal.findAll()

    res.json(animals)
}


exports.getImage= async (req,res)=>{

    const animal = await Animal.findByPk(req.params.id)

    if (animal) {
        if(animal.animal_img) {

                res.sendFile(animal.animal_img)
            };
        }
        else {
            return res.sendStatus(404)

        }
}

exports.editAnimalAnnouncement= async(req,res)=>{
    const {id} = req.params
    console.log('\x1b[34m%s\x1b[0m', req.body)
   const animal = await Animal.findByPk(id)
    if(req.files){
        const {animal_img}=req.files

        const uploadPath =  process.env.UPLOADED_FILES_PATH + animal_img.name;
        console.log(animal_img)
        await animal_img.mv(uploadPath)
        animal.animal_img=uploadPath

    }
    await animal.update(req.body,{where:{id:id}})
    await animal.save()
    res.sendStatus(200)
}

exports.deleteAnimalAnnouncement = async (req,res)=>{
    const {animal_id}= req.params.id

    const deleted_animal = await Animal.destroy({where:{
        id:animal_id
        }})
    res.sendStatus(200)
}

exports.confirmAdoption = async(req,res)=>{

    const {animal_id, user_id}=req.params;
    const user = await User.findByPk(user_id)
    const animal = await Animal.findByPk(animal_id)
    await animal.setOwner(user)
    await animal.update({adopted:true})
    res.send(animal)
}
