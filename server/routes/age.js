const express = require("express");
const router = express.Router();

const ageController = require("../controllers/age");

// Cette partie du code permet de conserver quelque part l'âge de l'utilisateur pour ne pas
//  faire apparaitre la popup à chaque fois

router.post("/", ageController.getAge);
router.get("/", ageController.sendAge);

module.exports = router;
