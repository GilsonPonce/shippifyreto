const {conexion} = require("./CredentialDB");

const getAllCompanys = (filterParams) => {
      let query = "select id,name,city,status,plan_type,creation_date from company";
      return new Promise((resolve,reject)=>{
          conexion().query(query,(error,rows,fields)=>{
              if(error) reject({ status: 500, message: error });
              if(filterParams.status) resolve(rows.filter((company) => company.status == filterParams.status));
              resolve(rows);
          });
      });
  };

  module.exports = {
    getAllCompanys
  }