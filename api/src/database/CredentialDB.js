const mysql = require('mysql');

const connection = mysql.createConnection('mysql://candidate5:ubnpS3rySnj88Sum@shippify4.cv2sgxogwffx.sa-east-1.rds.amazonaws.com/shippify5?debug=false&charset=utf8mb4&timezone=-0500');

function conexion(){
    return connection;
}

module.exports = {
    conexion
}