import { useFetchDriver } from "../hooks/useFetchDriver";
import { Loading } from "./"

export const SelectDriver = ({ status, companyId, onSetDriver }) => {

    const { drivers, isLoading } = useFetchDriver(status, companyId);

    const onSelectChange = ({ target }) => {
        onSetDriver(target.value);
    }

    return (
        <div className="row">
            <div className="col">
                <label htmlFor="selectDriver" className="form-label">Choose a driver</label>
                <select onChange={onSelectChange} name="selectDriver" className="form-select d-inline" id="" disabled={isLoading || drivers.length == 0}>
                    {
                        drivers.map((driver) => (
                            <option key={driver.id} value={driver.id}>{driver.name}</option>
                        ))
                    }
                </select>
            </div>
            { isLoading && <Loading /> }
        </div>
    )
}