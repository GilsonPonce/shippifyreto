import { useFetchVehicle } from "../hooks/useFetchVehicle";
import { Loading } from "./";

export const TableVehicle = ({ driverId, deleteV, edit }) => {
    const { vehicles, isLoading } = useFetchVehicle(driverId);

    const deleteVehicle = (value) => {
        deleteV(value);
    }

    const editVehicle = (value) => {
        edit(value);
    }

    return (
        <>
        {
            <table className="table table-light table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Plate</th>
                        <th>Model</th>
                        <th>Type</th>
                        <th>Capacity</th>
                        <th>Creation Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vehicles.length != 0 && !isLoading ?
                            vehicles.map((vehicle) => {
                                let arrFecha = vehicle.creation_date.split("T");
                                let arrhora = arrFecha[1].split(":");
                                let fecha = arrFecha[0] + " " + arrhora[0] + ":" + arrhora[1] + ":" + arrhora[2].substring(0, 2);
                                return (<tr key={vehicle.id}>
                                    <td>{vehicle.plate}</td>
                                    <td>{vehicle.model}</td>
                                    <td>{vehicle.type}</td>
                                    <td>{vehicle.capacity}</td>
                                    <td>{fecha}</td>
                                    <td><button onClick={() => editVehicle(vehicle.id)} className="btn btn-warning">*</button></td>
                                    <td><button onClick={() => deleteVehicle(vehicle.id)} className="btn btn-danger">-</button></td>
                                </tr>);
                            })
                            :
                            <tr><td colSpan={7}>There are no vehicles{ isLoading && <Loading/> }</td></tr>
                    }
                </tbody>
            </table>
        }

        </>
    )
}