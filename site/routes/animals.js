const express = require("express");

const router = express.Router();

const animalControllers = require("../controllers/animals");
const isAuth = require("../middleware/is-auth");

router.post("/animal", isAuth, animalControllers.addAnimalAnnouncement);
router.put("/animal/:id", isAuth, animalControllers.editAnimalAnnouncement);
router.delete("/animal/:id", isAuth, animalControllers.deleteAnimalAnnouncement);
router.get("/animal/:id",animalControllers.getOneAnimalById );
router.get("/my-animals", isAuth, animalControllers.getAnimalsAddedByUser);
router.post("/request-adoption/:animal_id", isAuth, animalControllers.requestToAdoptAnimal);
router.get("/request-adoption/:id", isAuth, animalControllers.getApplicantsToOneAnimal);
router.get("/animals",animalControllers.getAllAnimals)
router.get("/image/:id",animalControllers.getImage)
router.post("/adopt/:animal_id/:user_id",animalControllers.confirmAdoption)


module.exports = router;
