const express = require("express");
const router = express.Router();

const contentController = require("../controllers/content");

// Cette partie du code permet de conserver quelque part l'âge de l'utilisateur pour ne pas
//  faire apparaitre la popup à chaque fois

router.get("/", contentController.sendPublications);

// Les routes ci-dessous permettent de livrer les pdf, les images et les audios au client
router.get("/:filename", contentController.sendFile);

module.exports = router;
