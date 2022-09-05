const Vehicle = require("../database/Vehicle");

const getAllVehicles = async (filterParams) => {
  try {
    const allWorkouts = await Vehicle.getAllVehicles(filterParams);
    return allWorkouts;
  } catch (error) {
    throw error;
  }
};

const getOneVehicle = async (vehicleId) => {
  try {
    const vehicle = await Vehicle.getOneVehicle(vehicleId);
    return vehicle;
  } catch (error) {
    throw error;
  }
};

const createNewVehicle = async (newVehicle) => {
  const VehicleToInsert = {
    ...newVehicle
  };
  try {
    const createdVehicle = await Vehicle.createNewVehicle(VehicleToInsert);
    return createdVehicle;
  } catch (error) {
    throw error;
  }
};

const updateOneVehicle = async (vehicleId, changes) => {
  try {
    const updatedVehicle = await Vehicle.updateOneVehicle(vehicleId, changes);
    return updatedVehicle;
  } catch (error) {
    throw error;
  }
};

const deleteOneVehicle = async(vehicleId) => {
  try {
    const deleteVehicle = await Vehicle.deleteOneVehicle(vehicleId);
    return deleteVehicle;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllVehicles,
  getOneVehicle,
  createNewVehicle,
  updateOneVehicle,
  deleteOneVehicle,
};