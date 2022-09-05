import { useCallback, useState } from 'react'
import car from './assets/car.svg'
import { TableVehicle, FormSelects, FormVehicle } from './components'
import './style.css'
import Swal from 'sweetalert2'
import axios from "axios";

function App() {
  const [driverId, setDriverId] = useState(0);
  const [idEdit,setIdEdit] = useState(0);
  const [show, setShow] = useState(false);
  const [editBoolean, setEditBoolean] = useState(false);
  const [act,setAct] =useState(true);
  
  const onSetId = (id) => {
    setDriverId(id);
  }

  const onShowFormVehicle = (mostrar) => {
    setEditBoolean(false);
    setIdEdit(0);
    setShow(mostrar);
  };

  const editVehicle = (valueIdEdit) => {
    setShow(true);
    setIdEdit(valueIdEdit);
    setEditBoolean(true);
  }

  const refrest = (value)=>{
    setDriverId(0)
    setTimeout(()=>{setDriverId(value)},1);
  };

  const deleteVehiculo = (value) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        let url = `http://localhost:3000/api/v1/vehicle/${value}`
        axios.delete(url).then(response => {
          if (response.status == 200) {
            let obj = {id: driverId};
            refrest(obj.id);
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            
          }
        }).catch(error => {
          Swal.fire('Try again',error.response.data.data.error,'error')
        });
      }
    })
  }

  return (
    <div className="row justify-content-center text-center">
      <div className='col-12 p-4'>
        <h1>Vehicle</h1>
        <img src={car} className="image" alt="logo car" />
      </div>
      <div className='col-5'>
        <FormSelects
          status={'active'}
          onSetDriver={(value) => { onSetId(value) }}
        />
      </div>
      <div className="col-8 mt-4 text-end">
        <button onClick={() => onShowFormVehicle(true)} className="btn btn-success" disabled={driverId == 0}>Add Vehicle</button>
      </div>
      <div className="col-8 mt-1">
         < TableVehicle
          driverId={driverId}
          deleteV={deleteVehiculo}
          edit={editVehicle}
        />
      </div>
      {
        show &&
        <FormVehicle
          id={driverId}
          idEdit={idEdit}
          isEdit={editBoolean}
          update={refrest}
          cancel={(value) => onShowFormVehicle(value)} />
      }
    </div>
  )
}

export default App
