const express = require("express");
//const apicache = require("apicache");
const router = express.Router();
//const cache = apicache.middleware;
const companyController = require("../../controllers/companyController");


router
    .get("/",companyController.getAllCompanys);

module.exports = router;