const express = require("express");
const router = express.Router();

const submissionController = require("../controllers/submission");

// Cette partie du code permet de conserver quelque part l'âge de l'utilisateur pour ne pas
//  faire apparaitre la popup à chaque fois

router.post("/", submissionController.sendMail);

module.exports = router;
