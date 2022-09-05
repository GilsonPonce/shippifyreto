const vehicleService = require("../services/vehicleService");

const getAllVehicles = (req, res) => {
  const {driverId} = req.query;
    const allVehicles = vehicleService.getAllVehicles({driverId});
    allVehicles.then(vehicles => {
      res.send({ status: "OK", data: vehicles });
    }).catch(error => {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    });
};

const getOneVehicle = (req, res) => {
  const {
    params: { vehicleId },
  } = req;
  if (!vehicleId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':vehicleId' can not be empty" },
      });
  }
  
  const vehicle = vehicleService.getOneVehicle(vehicleId);
  vehicle.then(vehicleOne => {
    res.send({ status: "OK", data: vehicleOne});
  }).catch((error) => {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  });
};

const createNewVehicle = (req, res) => {
  const { body } = req;
  if (
    !body.driver_id ||
    !body.plate ||
    !body.model ||
    !body.type ||
    !body.capacity
  ) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'drive_id', 'plate', 'model', 'type', 'capacity'",
        },
      });
    return;
  }
  const newVehicle = {
    driver_id: body.driver_id,
    plate: body.plate,
    model: body.model,
    type: body.type,
    capacity: body.capacity,
  };
  
  const createdVehicle = vehicleService.createNewVehicle(newVehicle);
  createdVehicle.then(vehicle => {
    res.status(201).send({ status: "OK", data: vehicle });
  }).catch((error)=>{
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  });
};

const updateOneVehicle = (req, res) => {
  const {
    body,
    params: { vehicleId },
  } = req;
  if (!vehicleId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':vehicleId' can not be empty" },
      });
  }
  const updatedVehicle = vehicleService.updateOneVehicle(vehicleId, body);
  updatedVehicle.then(resp => {
    res.status(200).send({ status: "OK", data: resp });
  }).catch((error)=> {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  });
};

const deleteOneVehicle = (req, res) => {
  const {
    params: { vehicleId },
  } = req;
  if (!vehicleId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':vehicleId' can not be empty" },
      });
  }
  
  const deletedVehicle = vehicleService.deleteOneVehicle(vehicleId);
  deletedVehicle.then(resp => {
    res.status(200).send({ status: "OK", data: resp });
  }).catch((error)=> {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  });
};

module.exports = {
  getAllVehicles,
  getOneVehicle,
  createNewVehicle,
  updateOneVehicle,
  deleteOneVehicle
};