import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faKeyboard } from "@fortawesome/free-regular-svg-icons";
import moment from 'moment';
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet" />;
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>;
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>


export default function DevicesForm() {
    const datetime = moment()
    const Token = window.localStorage.getItem('Token')


    const [data, setData] = useState([])
    const [id, setId] = useState('')
    const [friendlyName, setFriendlyName] = useState('')
    const [description, setDescription] = useState('')
    const [model, setModel] = useState('')
    const [serialNumber, setSerialNumber] = useState('')
    const [type, setType] = useState('')
    const [lab_Id, setLab_Id] = useState('')
    const [labSerialNumber, setLabSerialNumber] = useState('')
    const [dateSync, setDateSync] = useState('')
    const [isActive, setIsActive] = useState('')
    const basedURL1 = "http://127.0.0.1:3000"
    const basedURL = "http://thegreenlab.xyz:3000"
    const [loading, setLoading] = useState(true)
    const [keyword, setKeyword] = useState('')
    const [deviceGroups, setDeviceGroups] = useState([])

    const save = () => {
        if (id === '') {

            fetch(basedURL + "/Devices", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Token
                },
                body: JSON.stringify({ DateSync: dateSync, Description: description, FriendlyName: friendlyName, Model: model, SerialNumber: serialNumber, Type: type, LabSerialNumber: labSerialNumber, IsActive: isActive, DevicesGroup: [] })
            }).then(data => load())
        }
        else {
            fetch(basedURL + "/Devices", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Token
                },
                body: JSON.stringify({ Id: id, DateSync: dateSync, Description: description, FriendlyName: friendlyName, Model: model, SerialNumber: serialNumber, Type: type, LabSerialNumber: labSerialNumber, IsActive: isActive })
            }).then(data => load())

        }

    }
    const load = async () => {
        const response = await fetch(basedURL + "/Devices", {
            method: 'GET',
            headers: { 'Authorization': 'Basic ' + Token }
        })
        const data = await response.json()
        setData(data)
        setLoading(false)
    }
    const loadDeviceGroups = async () => {
        const response = await fetch(basedURL1 + "/Devicegroup", {
            method: 'GET',
            headers: { 'Authorization': 'Basic ' + Token }

        })
        const dgs = await response.json()
        setDeviceGroups(dgs)
        setLoading(false)
    }

    useEffect(() => {
        load()
        loadDeviceGroups()
    }, []);

    // function toggle(checked) {
    //     var elm = document.getElementById('checkbox');
    //     if (checked != elm.checked) {
    //       elm.click();
    //     }
    //   }
    // function myCheck() {
    //     var x = document.getElementById("checked").checked;
    //     document.getElementById("demo").innerHTML = x;
    // }

    const checked = document.querySelector('#isActive:checked') !== null;
    // console.log(checked); 

    const editDevice = (id, dateSync, description, friendlyName, model, serialNumber, type, labSerialNumber, isActive) => {
        setId(id)
        setDateSync(dateSync)
        setDescription(description)
        setFriendlyName(friendlyName)
        setModel(model)
        setSerialNumber(serialNumber)
        setType(type)
        setLabSerialNumber(labSerialNumber)
        setIsActive(isActive)

    }

    const deleteDevice = (Id) => {
        fetch(basedURL + "/Devices" + "/" + Id, {
            method: "DELETE",
            headers: { 'Authorization': 'Basic ' + Token }
        }).then(data => load())

    }
    const addnew = () => {
        setDescription('')
        setFriendlyName('')
        setModel('')
        setSerialNumber('')
        setType('')
        setIsActive('')
        setId('')
        setLabSerialNumber('')
        setDateSync('')

    }
    // function search(){
    //     fetch(basedURL + "/Devices" + "/search?keyword="+keyword, {
    //         headers: { 'Authorization': 'Basic aGllbkBnbWFpbC5jb206MTIz' }
    //     })
    //     // .then(data => load())
    //     setData(data.Items)
    // }


    return (
        <div id="devicesform" className="container-fluid">
            <h3>Devices</h3>

            <div >
                <div>
                    <div>
                        <input type="hidden" className="form-control" value={id} onChange={(e) => setId(e.target.value)} />
                    </div>
                    <div>
                        <label >DateSync:</label>
                        <input type="datetime" className="form-control" value={dateSync} onChange={(e) => setDateSync(e.target.value)} />
                    </div>
                    <label>Description:</label>
                    <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <div >
                        <label>FriendlyName:</label>
                        <input type="text" className="form-control" value={friendlyName} onChange={(e) => setFriendlyName(e.target.value)} />
                    </div>
                    <div >
                        <label >Model:</label>
                        <input type="text" className="form-control" value={model} onChange={(e) => setModel(e.target.value)} />
                    </div>
                </div>
                <div className="formg2">

                    <div >
                        <label >SerialNumber:</label>
                        <input type="text" className="form-control" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
                    </div>
                    <div >
                        <label >Type:</label>
                        <input type="text" className="form-control" value={type} onChange={(e) => setType(e.target.value)} />
                    </div>
                    <div >
                        <label >LabSerialNumber:</label>
                        <input type="text" className="form-control" value={labSerialNumber} onChange={(e) => setLabSerialNumber(e.target.value)} />
                    </div>
                    <div >
                        <label>Select Group: </label>
                        <select className="form-select"  >
                            <option>--</option>
                            {deviceGroups.map(s => (<option>{s.Name} </option>))}
                        </select>
                    </div>
                    <div >
                        <label >IsActive:</label> &nbsp;
                        <input type="checkbox" id="isActive" value="yes" />
                    </div>
                </div>
            </div>
            <div className="btnDeviceForm">
                <button class="btn btn-success" onClick={() => save()}>Save</button> &nbsp; &nbsp;
                <button class="btn btn-success" onClick={() => addnew()}>Add new</button>
            </div>

            {/* <div>
                    <input type="search" value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
                    <button  onClick={() => search()}>Search</button> 
                </div> */}

            <div>
                <table className="table table-bordered">
                    <thead className="table-head">
                        <tr>
                            <td>ID</td>
                            <td>DateSync</td>
                            <td>Description</td>
                            <td>FriendlyName</td>
                            <td>Model</td>
                            <td>SerialNumber</td>
                            <td>Type </td>
                            <td>LabSerialNumber</td>
                            <td>IsActive</td>
                            <td>Action</td>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((e, index) => {
                            return (
                                <>
                                    <tr>
                                        {/* <td>  <input type="checkbox" id="checked" /> </td> */}
                                        <td>{e.Id}</td>
                                        <td>{moment(e.DateSync).format("DD/MM/YY,HH:mm")}</td>
                                        <td> {e.Description}</td>
                                        <td>{e.FriendlyName} </td>
                                        <td> {e.Model}</td>
                                        <td>{e.SerialNumber}</td>
                                        <td>{e.Type}</td>
                                        <td>{e.LabSerialNumber}</td>
                                        <td>{e.IsActive}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => editDevice(e.Id, e.DateSync, e.Description, e.FriendlyName, e.Model, e.SerialNumber, e.Type, e.LabSerialNumber, e.IsActive,)}><FontAwesomeIcon icon={faEdit} /></button> &nbsp;
                                            <button className="btn btn-success" onClick={() => deleteDevice(e.Id)}> <FontAwesomeIcon icon={faTrashAlt} /> </button>
                                        </td>
                                    </tr>
                                    {/* <Link href={`/wpa/${e.id}`}>{e.title}</Link> */}
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

