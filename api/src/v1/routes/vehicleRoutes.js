const express = require("express");
//const apicache = require("apicache");
const router = express.Router();
//const cache = apicache.middleware;
const vehicleController = require("../../controllers/vehicleController");


router
    .get("/",vehicleController.getAllVehicles)
    .get("/:vehicleId",vehicleController.getOneVehicle)
    .post("/",vehicleController.createNewVehicle)
    .patch("/:vehicleId",vehicleController.updateOneVehicle)
    .delete("/:vehicleId",vehicleController.deleteOneVehicle);

module.exports = router;
