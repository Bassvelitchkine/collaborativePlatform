const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const databaseController = require("../controllers/database");

router.post("/auth", databaseController.authenticate);
router.post("/new", multer, databaseController.newPublication);
router.delete("/delete/:id", databaseController.deletePublication);
router.put("/modify/:id", multer, databaseController.modifyPublication);
router.get("/", databaseController.getAllPub);

module.exports = router;
