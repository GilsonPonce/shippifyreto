import { useEffect, useState } from 'react';
import { getVehicle } from '../helpers/getVehicle';

export const useFetchVehicle = ( idDriver) => {
 
    const [vehicles, setVehicle] = useState([]);
    const [isLoading, setIsLoading] = useState( true );

    const getVehicles = async() => {
        const newVehicles = await getVehicle(idDriver);
        setVehicle(newVehicles);
        setIsLoading(false);
    }
    
    useEffect( () => {
        setIsLoading(true);
        getVehicles();
    }, [idDriver]);



    return {
        vehicles,
        isLoading
    }

}