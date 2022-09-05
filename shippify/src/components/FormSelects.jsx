import { useState } from "react";
import { SelectDriver, SelectCompany} from "./"

export const FormSelects = ({ status, onSetDriver }) => {

    const [companyId, setCompanyId] = useState(0);

    const onSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={onSubmit} className="row justify-content-center">
            <div className="col-12">
                <SelectCompany status={status} setCompany ={setCompanyId}/>
            </div>
            <div className="col-12 mt-3">
                <SelectDriver status={status} companyId={companyId} onSetDriver={onSetDriver}/>
            </div>

        </form>
    )
}