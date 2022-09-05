export const getCompany = async( status ) => {

    const url = `http://localhost:3000/api/v1/company?status=${status}`;
    const resp = await fetch( url );
    const { data } = await resp.json();

    const companys = data.map( company => ({
        id: company.id,
        name: company.name
    }));
    
    return companys;
}