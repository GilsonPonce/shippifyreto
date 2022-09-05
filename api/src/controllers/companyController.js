const companyService = require("../services/companyService");

const getAllCompanys = (req, res) => {
  const {status} = req.query;
    const allCompanys = companyService.getAllCompanys({status});
    allCompanys.then((rows) => {
        res.send({ status: "OK", data: rows });
    }).catch(error => {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    });
  
};

module.exports = {
    getAllCompanys
}