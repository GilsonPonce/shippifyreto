import { useEffect, useState } from 'react';
import { getCompany } from '../helpers/getCompany';

export const useFetchCompany = ( status ) => {
 
    const [companys, setCompanys] = useState([]);
    const [isLoading, setIsLoading] = useState( true );

    const getCompanys = async() => {
        const newCompany = await getCompany(status);
        setCompanys(newCompany);
        setIsLoading(false);
    }
    
    useEffect( () => {
        getCompanys();
    }, []);



    return {
        companys,
        isLoading
    }

}