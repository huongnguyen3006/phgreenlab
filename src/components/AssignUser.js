import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faEdit, faTrashAlt, faArrowRight, faArrowLeft, faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons";
import { faKeyboard, } from "@fortawesome/free-regular-svg-icons";
import { counter } from '@fortawesome/fontawesome-svg-core';

export default function AssignUser() {
  const Token = window.localStorage.getItem('Token')

  const [email, setEmail] = useState('')
  const [filterText, setFilterText] = useState('')

  const [id, setId] = useState('')
  const [availableDevices, setAvailableDevices] = useState([])
  const [selectedDevices, setSelectedDevices] = useState([])
  const [masterDevices, setMasterDevices] = useState([])
  const [loading, setLoading] = useState(true)
  //const baseURL = 'http://thegreenlab.xyz:3000'
  const baseURL = 'http://127.0.0.1:3000'


  useEffect(async () => {
    loadDevice()


    let queryString = window.location.search
    let params = new URLSearchParams(queryString);
    let id = params.get("id");
    let email = params.get("email")

    setId(id)
    setEmail(email)

    loadUserDevice(id)

  }, [])


  const loadDevice = async () => {
    const response = await fetch(baseURL + "/Devices", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+ Token
      },
    })
    const availableDevices = await response.json()
    // console.log(dataDevice);
    setAvailableDevices(availableDevices)
    setMasterDevices(availableDevices)
    setLoading(false)

  }

  const loadUserDevice = async (id) => {
    const response = await fetch(baseURL + "/Users/"+id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+Token
      },
    })
    const user = await response.json()

    //console.log(user)

    const devices = user.userDevices.map(ud=>{
      return {Id: ud.DeviceId, SerialNumber: ud.DeviceSerialNumber}
    })

    //console.log(devices)
    setSelectedDevices(devices)
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

  function save() {

    var devices = []

    for(let i=0; i<selectedDevices.length; i++){
    
      devices = devices.concat({ User: {Id: id}, Device: {Id: selectedDevices[i].Id}, DeviceSerialNumber: selectedDevices[i].SerialNumber, DeviceId: selectedDevices[i].Id})
    }

    console.log(devices)

    fetch(baseURL + "/UserDevices/Assign", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+Token
      },
      body: JSON.stringify(devices)
    }).then(data => data.json())
    .then(json=> alert(JSON.stringify(json)))
  }

  function filterLeft(s) {
    setFilterText(s)
    // if (s==='') setAvailableDevices(masterDevices)  
    var results = masterDevices.filter(d => d.SerialNumber.indexOf(s) >= 0)
    setAvailableDevices(results)
  }

  return (
    <div>
      <div className="container-user">
        <h3>Users Management</h3>
        <div class="mb-3 mt-3">
          <input type="hidden" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div class="mb-3 mt-3">
          <label style={{ width: 100 }}>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>Select a device</div>

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
      </div>
      <div className="btnDeviceForm">
        <button class="btn btn-primary"  onClick={() => save()}>Save</button> &nbsp; &nbsp;
        <button class="btn btn-primary"  onClick={() => document.location = '/Users'}>Back</button> &nbsp; &nbsp;

      </div>

    </div>
  )
}
