import { memo } from "react";
import { useFetchCompany } from "../hooks/useFetchCompany";
import { Loading } from "./"



export const SelectCompany = memo(({ status, setCompany }) => {

    const { companys, isLoading } = useFetchCompany(status);

    const onSelectChange = ({ target }) => {
        setCompany(target.value)
    }

    return (
        <div className="row">
            <div className="col">
                <label htmlFor="selectCompany" className="form-label">Choose a company</label>
                <select onChange={onSelectChange} className="form-select d-inline" name="selectCompany" id="selectCompany">
                    {
                        companys.map((company) => (
                            <option key={company.id} value={company.id}>{company.name}</option>
                        ))
                    }
                </select>
            </div>
            {
                isLoading && <Loading />
            }
        </div>
    )
})