export const getDrivers = async( status, companyId) => {

    const url = `http://localhost:3000/api/v1/driver?status=${status}&companyId=${companyId}`;
    const resp = await fetch( url );
    const { data } = await resp.json();

    const drivers = data.map( driver => ({
        id: driver.id,
        name: driver.last_name+" "+driver.first_name
    }));
    
    return drivers;
}