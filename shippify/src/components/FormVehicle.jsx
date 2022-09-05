import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Swal from 'sweetalert2'

export const FormVehicle = ({ cancel, id, update, idEdit, isEdit }) => {

    const [isProcessing, setProcessing] = useState(false);

    const plateRef = useRef();
    const modelRef = useRef();
    const typeRef = useRef();
    const capacityRef = useRef();
    const datetimeRef = useRef();

    const onSubmit = (event) => {
        event.preventDefault();
    }
    const cancelShow = () => {
        cancel(false);
    }
    const re = (value) => {
        update(value);
    }

    useEffect(() => {
        if (idEdit) {
            let url = `http://localhost:3000/api/v1/vehicle/${idEdit}`
            axios.get(url).then(response => {
                if (response.status == 200) {
                    const { plate, model, type, capacity, creation_date } = response.data.data[0];
                    let arrFecha = creation_date.split("T");
                    let arrhora = arrFecha[1].split(":");
                    let fecha = arrFecha[0] + "T" + arrhora[0] + ":" + arrhora[1] + ":" + arrhora[2].substring(0, 2);
                    plateRef.current.value = plate;
                    modelRef.current.value = model;
                    typeRef.current.value = type;
                    capacityRef.current.value = capacity;
                    datetimeRef.current.value = fecha;
                }
            })
        }
    }, []);

    const registerVehicle = () => {

        if (
            plateRef.current.value == "" ||
            modelRef.current.value == "" ||
            typeRef.current.value == "" ||
            capacityRef.current.value == "" ||
            id == "" || id == undefined
        ) {
            Swal.fire('Empty Fields', 'Try to validate the information', 'error');
            return;
        }

        setProcessing(true);

        const newVehicle = {
            driver_id: id,
            plate: plateRef.current.value,
            model: modelRef.current.value,
            type: typeRef.current.value,
            capacity: capacityRef.current.value
        }


        axios.post('http://localhost:3000/api/v1/vehicle', newVehicle)
            .then((response) => {
                if (response.status == 201) {
                    plateRef.current.value == "";
                    modelRef.current.value == "";
                    typeRef.current.value == "";
                    capacityRef.current.value == "";
                    re(newVehicle.driver_id);
                    setProcessing(false);
                    cancelShow(false);
                    Swal.fire(
                        'Goob job!', 'Registered vehicle', 'success'
                    )
                }
            }).catch((error) => {
                setProcessing(false);
                Swal.fire(
                    'Try again later', error.response.data.data.error, 'error'
                )
            })

    }

    const updateVehicle = () => {

        if (
            plateRef.current.value == "" ||
            modelRef.current.value == "" ||
            typeRef.current.value == "" ||
            capacityRef.current.value == "" ||
            datetimeRef.current.value == "" ||
            idEdit == "" || idEdit == undefined ||
            id == "" || id == undefined
        ) {
            Swal.fire('Empty Fields', 'Try to validate the information', 'error');
            return;
        }

        setProcessing(true);

        const oldVehicle = {
            driver_id: id,
            plate: plateRef.current.value,
            model: modelRef.current.value,
            type: typeRef.current.value,
            capacity: capacityRef.current.value,
            creation_date: datetimeRef.current.value
        }


        axios.patch(`http://localhost:3000/api/v1/vehicle/${idEdit}`, oldVehicle)
            .then((response) => {
                if (response.status == 200) {
                    plateRef.current.value == "";
                    modelRef.current.value == "";
                    typeRef.current.value == "";
                    capacityRef.current.value == "";
                    re(oldVehicle.driver_id);
                    setProcessing(false);
                    cancelShow(false);
                    Swal.fire(
                        'Goob job!', 'Update vehicle', 'success'
                    )
                }
            }).catch((error) => {
                setProcessing(false);
                Swal.fire(
                    'Try again later', error.response.data.data.error, 'error'
                )
            })

    }

    return (
        <div className="contenedor">
            <div className="modelo">
                <form onSubmit={onSubmit} className="row g-3">
                    <div className="col-12">
                        <h3 className="text-body">Vehicle Registration</h3>
                    </div>
                    <div className="col-12">
                        <input type="text" className="form-control" placeholder="Plate" ref={plateRef} name="" id="" />
                    </div>
                    <div className="col-12">
                        <input type="text" className="form-control" placeholder="Model" ref={modelRef} name="" id="" />
                    </div>
                    <div className="col-12">
                        <select name="" className="form-select" ref={typeRef} id="">
                            <option value="">Choose a Type Vehicle</option>
                            <option value="bicycle">bicycle</option>
                            <option value="motorcycle">motorcycle</option>
                            <option value="car">car</option>
                            <option value="van">van</option>
                            <option value="truck">truck</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <select name="" className="form-select" ref={capacityRef} id="">
                            <option value="">Choose a Capacity Vehicle</option>
                            <option value="small">small</option>
                            <option value="medium">medium</option>
                            <option value="large">large</option>
                        </select>
                    </div>
                    {isEdit && <div className="col-12">
                        <input type="datetime-local" className="form-control" ref={datetimeRef} name="" id="" />
                    </div>}
                    {
                        !isProcessing &&
                        <div className="col-6">
                            <button onClick={isEdit ? updateVehicle : registerVehicle} className="btn btn-success" type="submit">{isEdit ? "Update Vehicle" : "Add Vehicle"}</button>
                        </div>
                    }
                    {
                        isProcessing &&
                        <div className="col-6">
                            <button className="btn btn-success" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                        </div>
                    }
                    <div className="col-6">
                        <button onClick={cancelShow} className="btn btn-danger">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
