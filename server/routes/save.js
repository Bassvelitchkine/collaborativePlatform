const express = require("express");
const router = express.Router();
const saveController = require("../controllers/save");

router.get("/all", saveController.downloadAll);

module.exports = router;
