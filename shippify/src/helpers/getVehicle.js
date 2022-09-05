export const getVehicle = async(idDriver) => {

    const url = `http://localhost:3000/api/v1/vehicle?driverId=${idDriver}`;
    const resp = await fetch( url );
    const { data } = await resp.json();
    
    return data;
}