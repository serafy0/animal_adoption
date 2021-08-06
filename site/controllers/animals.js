const Animal = require("../models/animals");
const User = require("../models/user");

exports.addAnimalAnnouncement = async (req, res) => {
    const {name, description, age, type, breed, address} = req.body
    if (req.session.user) {

        try {
            const animal = await Animal.create({
                name: name,
                description: description,
                age: age,
                type,
                breed: breed,
                address: address,
                postedById: req.userId
            })
            res.status(200).json(animal)

        } catch (err) {
            res.send(400).json(err)
        }
    } else {
        res.status(401).json(req.user)

    }
}

exports.getAnimalsAddedByUser = async (req, res) => {

    const myAnimals = await Animal.findAll({where: {postedById: req.userId}})

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
