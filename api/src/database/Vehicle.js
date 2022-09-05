const {conexion} = require("./CredentialDB");

const getAllVehicles = ({driverId}) => {
  let query = "select * from vehicle";
  return new Promise((resolve,reject)=>{
    conexion().query(query,(error,rows,fields)=>{
      if(error) reject({ status: 500, message: error });
      if(driverId) resolve(rows.filter(vehicle => vehicle.driver_id == driverId));
      resolve(rows);
    });     
  });
};

const getOneVehicle = (vehicleId) => {
  let query = "select * from vehicle where id = ?";
  return new Promise((resolve,reject)=>{
    conexion().query(query,vehicleId,(error,rows,fields)=>{
      if(error) reject({ status: error?.status || 500, message: error?.message || error });
      if(!rows) reject({
        status: 400,
        message: `Can't find vehicle with the id '${vehicleId}'`,
      });
      resolve(rows);
    });
  });
};

const createNewVehicle = (newVehicle) => {
  let query = "insert into vehicle set ?";
  return new Promise((resolve,reject)=>{
    getAllVehicles({}).then(vehicles=>{
      if(vehicles.findIndex(vehicle => vehicle.plate == newVehicle.plate) > -1){
        reject({
          status: 400,
          message: `Vehicle with the plate '${newVehicle.plate}' already exists`,
        });
      }else{
        conexion().query(query,newVehicle,(error,result,fields)=>{
          if(error) reject({ status: error?.status || 500, message: error?.message || error });
          let createdVehicule = {
            id: result.insertId,
            ...newVehicle
          }
          resolve(createdVehicule);
        });
      }
    })
  });
};

const updateOneVehicle = (vehicleId, {driver_id,plate,model,type,capacity,creation_date}) => {
  let query = "update vehicle set driver_id = ?, plate = ?, model = ?, type = ?, capacity = ?, creation_date = ? where id = ?";
  return new Promise((resolve,reject)=>{
    getOneVehicle(vehicleId).then(rows=>{
      if(rows.findIndex(vehicle => vehicle.id == vehicleId) == -1){
        reject({
          status: 400,
          message: `Can't find vehicle with the id '${vehicleId}'`
        });
      }else{
        let updateVehicle = [driver_id,plate,model,type,capacity,creation_date,vehicleId];
        conexion().query(query,updateVehicle,(error,results,fields)=>{
          if(error) reject({ status: error?.status || 500, message: error?.message || error });
          resolve('Changed '+results.changedRows+' rows');
        })
      }
    });
  });
};

const deleteOneVehicle = (vehicleId) => {
  let query = "delete from vehicle where id = ?";
  return new Promise((resolve,reject)=>{
    getOneVehicle(vehicleId).then(rows=>{
      if(rows.findIndex(vehicle => vehicle.id == vehicleId) == -1){
        reject({
          status: 400,
          message: `Can't find vehicle with the id '${vehicleId}'`
        });
      }else{
        conexion().query(query,vehicleId,(error,result,fields)=>{
          if(error) reject({ status: error?.status || 500, message: error?.message || error });
          resolve('Deleted '+ result.affectedRows + ' rows');
        });
      }
    })
  });
};

module.exports = {
  getAllVehicles,
  createNewVehicle,
  getOneVehicle,
  updateOneVehicle,
  deleteOneVehicle,
};