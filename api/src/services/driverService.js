const Driver = require("../database/Driver");

const getAllDrives = async (filterParams) => {
  try {
    const allDriver = await Driver.getAllDrives(filterParams);
    return allDriver;
  } catch (error) {
    throw error;
  }
};

module.exports = {
    getAllDrives
}