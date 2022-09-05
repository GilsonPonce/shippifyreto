const Company = require("../database/Company");

const getAllCompanys = async (filterParams) => {
  try {
    const allCompanys = await Company.getAllCompanys(filterParams);
    return allCompanys;
  } catch (error) {
    throw error;
  }
};

module.exports = {
    getAllCompanys
}