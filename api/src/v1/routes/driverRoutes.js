const express = require("express");
//const apicache = require("apicache");
const router = express.Router();
//const cache = apicache.middleware;
const driverController = require("../../controllers/driverController");


router
    .get("/",driverController.getAllDrives);

module.exports = router;