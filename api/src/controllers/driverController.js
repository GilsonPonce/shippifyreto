const driverService = require("../services/driverService");

const getAllDrives = (req, res) => {
  const {status,companyId} = req.query;
  const allDrives = driverService.getAllDrives({status,companyId});
  allDrives.then((rows)=>{
    res.send({ status: "OK", data: rows });
  }).catch(error => {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  });
};

module.exports = {
    getAllDrives
}