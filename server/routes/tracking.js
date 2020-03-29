const express = require("express");
const router = express.Router();

const trackingController = require("../controllers/tracking");

router.post("/newsletter", trackingController.newSubscriber);
router.get("/getSubscribers", trackingController.sendSubscribers);

// Cette partie permet d'incrémenter les compteurs lorsqu'on télécharge un nouvel audio ou un nouveau script
router.post("/newDownload", trackingController.countDownloads);
router.get("/getDownloads", trackingController.sendDownloads);

module.exports = router;
