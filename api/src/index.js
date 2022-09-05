const express = require('express');
const cors = require('cors');
const v1VehicleRouter = require("./v1/routes/vehicleRoutes");
const v1DriverRouter = require("./v1/routes/driverRoutes");
const v1CompanyRouter = require("./v1/routes/companyRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/v1/company",v1CompanyRouter);
app.use("/api/v1/vehicle",v1VehicleRouter);
app.use("/api/v1/driver",v1DriverRouter);

app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});