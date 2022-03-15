import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faEdit, faTrashAlt , faArrowRight, faArrowLeft,} from "@fortawesome/free-solid-svg-icons";
import { faKeyboard } from "@fortawesome/free-regular-svg-icons";


export default function GroupDevices() {

    const Token = window.localStorage.getItem('Token')
    const [filterText, setFilterText] = useState('')
    const [data, setData] = useState([])
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [availableDevices, setAvailableDevices] = useState([])
    const [selectedDevices, setSelectedDevices] = useState([])
    const [masterDevices, setMasterDevices] = useState([])

    const baseURL = "http://127.0.0.1:3000"

    // const baseURL = "http://thegreenlab.xyz:3000"
    const [loading, setLoading] = useState(true)

    const save = () => {
        if (id === '') {
            fetch(baseURL + "/Devicegroup", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Token
                },
                body: JSON.stringify({ Name: name, Description: description, })
            }).then(data => load())
        }
        else {
            fetch(baseURL + "/Devicegroup", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Token
                },
                body: JSON.stringify({ Id: id, Name: name, Description: description })
            }).then(data => load())

        }

    }
    const load = (async () => {
        const response = await fetch(baseURL + "/Devicegroup", {
            method: 'GET',
            headers: {
                // 'Authorization': 'Basic dnZAZ21haWwuY29tOjEyMzQ1Ng=='}
                'Authorization': 'Basic ' + Token
            }
        })
        const data = await response.json()
        setData(data)
        setLoading(false)
    })


    useEffect(async () => {
        load()
        loadDevice()
    }, []);


    const editDevicegroup = (id, name, description) => {
        setId(id)
        setName(name)
        setDescription(description)



    }

    const deleteDevicegroup = (Id) => {
        fetch(baseURL + "/Devicegroup" + "/" + Id, {
            method: "DELETE",
            headers: { 'Authorization': 'Basic ' + Token }
        }).then(data => load())

    }
    const addnew = () => {
        setDescription('')
        setName('')
        setId('')
    }
    const loadDevice = async () => {
        const response = await fetch(baseURL + "/Devices", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic '+ Token
          },
        })
        const availableDevices = await response.json()
        setAvailableDevices(availableDevices)
        setMasterDevices(availableDevices)
        setLoading(false)
    
      }
      function getSelectValues(select) {
        var result = [];
        var options = select && select.options;
        var opt;
    
        for (var i = 0, iLen = options.length; i < iLen; i++) {
          opt = options[i];
    
          if (opt.selected) {
            result.push({ Id: opt.value, SerialNumber: opt.text });
          }
        }
        return result;
      }
    
      function moveRight() {
        var selecteds = getSelectValues(document.querySelector('#selDevice'))
        //remove selecteds from availableDevices
        var filterDevices = availableDevices.filter(d => {
          return !selecteds.find(s => s.Id == d.Id)
        })
    
        setAvailableDevices(filterDevices)
    
        var olds = selectedDevices
        olds = olds.concat(selecteds)
    
        //remove duplicate objects
        olds = olds.filter((value, index, self) =>
          index === self.findIndex((t) => (
            t.Id === value.Id && t.SerialNumber === value.SerialNumber
          ))
        )
    
        setSelectedDevices(olds);
    
      }
    
      function moveLeft() {
        var selecteds = getSelectValues(document.querySelector('#selSelectedDevice'))
    
        //remove selecteds from availableDevices
        var filterDevices = selectedDevices.filter(d => {
          return !selecteds.find(s => s.Id == d.Id)
        })
        setSelectedDevices(filterDevices)
    
        var olds = availableDevices
        olds = olds.concat(selecteds)
        setAvailableDevices(olds);
      }
      function filterLeft(s) {
        setFilterText(s)
        // if (s==='') setAvailableDevices(masterDevices)  
        var results = masterDevices.filter(d => d.SerialNumber.indexOf(s) >= 0)
        setAvailableDevices(results)
      }
    return (
        <div className="container">
            <h3>Group Devices</h3>
            <form>
                <div class="mb-3 mt-3">
                    <input type="hidden" className="form-control" value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                <div class="mb-3 mt-3">
                    <label>Name:</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div class="mb-3 mt-3">
                    <label>Description:</label>
                    <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className='row'>
          <div className='col-md-5'>
            <input type='text' value={filterText} onChange={(e) => filterLeft(e.target.value)} />
            <select className="form-select" id="selDevice" multiple="muliple" size='20'>
              {availableDevices.filter(d => d.SerialNumber !== "").map(s => (<option value={s.Id}>{s.SerialNumber} </option>))}
            </select>
          </div>
          <div className='col-md-2'>

            <button className='btn btn-primary' onClick={() => moveRight()} > <FontAwesomeIcon icon={faArrowRight} /></button><br /><br />
            <button className='btn btn-primary' onClick={() => moveLeft()}> <FontAwesomeIcon icon={faArrowLeft} /></button>
          </div>
          <div className='col-md-5'>
            <select className="form-select" id="selSelectedDevice" multiple="muliple" size='20'>

              {selectedDevices.filter(d => d.SerialNumber !== "").map(s => (<option value={s.Id}>{s.SerialNumber} </option>))}
            </select>
          
     </div>
      </div>
<div>
                <button class="btn btn-success" onClick={() => save()}>Save</button> <n />
                <button class="btn btn-success" onClick={() => addnew()}>Add new</button>
                </div>
            </form>


            <div className="table">

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Description</td>

                        </tr>
                    </thead>

                    <tbody>
                        {data.map(e => {
                            return (
                                <>
                                    <tr>
                                        <td> {e.Id}</td>
                                        <td>{e.Name}</td>
                                        <td>{e.Description} </td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => editDevicegroup(e.Id, e.Name, e.Description)}><FontAwesomeIcon icon={faEdit} /></button> <br /><br />
                                            <button className="btn btn-success" onClick={() => deleteDevicegroup(e.Id)}> <FontAwesomeIcon icon={faTrashAlt} /> </button>
                                        </td>
                                    </tr>
                                </>
                            )
                        }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

