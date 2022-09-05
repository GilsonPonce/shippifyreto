const {conexion} = require("./CredentialDB");

const getAllDrives = ({status,companyId}) => {
      let query = "select * from driver"
      return new Promise((resolve,reject)=>{
        conexion().query(query,(error,rows,fields)=>{
          if(error) reject({status: 500, message: error});
          if(status && companyId){
            resolve(
              rows.filter((driver)=> driver.status == status && driver.company_id == companyId)
            );
          }
          if(status){
            resolve(rows.filter(driver => driver.status == status));
          }
          if(companyId){
            resolve(rows.filter(driver => driver.company_id == companyId));
          }
          resolve(rows);
        });
      });
  };

  module.exports = {
    getAllDrives
  }