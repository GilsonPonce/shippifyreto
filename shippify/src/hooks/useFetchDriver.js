import { useEffect, useState } from 'react';
import { getDrivers } from '../helpers/getDriver';

export const useFetchDriver = ( status, companyId ) => {
 
    const [drivers, setDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState( true );

    const getDriver = async() => {
        const newDrivers = await getDrivers(status, companyId);
        setDrivers(newDrivers);
        setIsLoading(false);
    }
    
    useEffect( () => {
        setIsLoading(true);
        getDriver();
    }, [companyId]);



    return {
        drivers,
        isLoading
    }

}