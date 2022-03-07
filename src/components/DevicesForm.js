import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faKeyboard } from "@fortawesome/free-regular-svg-icons";
import moment from 'moment';


<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet" />;
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>
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

    const save = () => {
        if (id === '') {
            fetch(basedURL + "/Devices", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic '+ Token
                },
                body: JSON.stringify({ DateSync: dateSync, Description: description, FriendlyName: friendlyName, Model: model, SerialNumber: serialNumber, Type: type,  LabSerialNumber: labSerialNumber,IsActive: isActive})
            }).then(data => load())
        }
        else {
            fetch(basedURL + "/Devices", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic '+ Token
                },
                body: JSON.stringify({ Id: id, DateSync: dateSync, Description: description, FriendlyName: friendlyName, Model: model, SerialNumber: serialNumber, Type: type, LabSerialNumber: labSerialNumber ,IsActive: isActive})
            }).then(data => load())

        }

    }
    const load = async () => {
        const response = await fetch(basedURL + "/Devices", {
            method: 'GET',
            headers: { 'Authorization': 'Basic '+Token }
        })
        const data = await response.json()
        setData(data)
        setLoading(false)
    }

    useEffect(() => {
        load()
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

    const editDevice = (id,dateSync, description, friendlyName, model, serialNumber, type, labSerialNumber,isActive) => {
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
            headers: { 'Authorization': 'Basic '+ Token }
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
        <div id="devicesform" className="container-labs">
            <h3 style={{ marginLeft: 80 , fontWeight:'bold'}}>Devices</h3>
            
                <div className="form">
                    <div className="formg1">
                        <div class="mb-3 mt-3">
                            <input type="hidden" className="form-control" value={id} onChange={(e) => setId(e.target.value)} />
                        </div>
                        <div class="mb-3 mt-3">
                            <label style={{width:500, fontWeight:'bold'}}>DateSync:</label>
                            <input style={{width:500}} type="datetime" className="form-control" value={dateSync} onChange={(e) => setDateSync(e.target.value)} />
                        </div>
                        <label style={{width:500, fontWeight:'bold'}}>Description:</label>
                        <input style={{width:500}} type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <div class="mb-3 mt-3">
                            <label style={{width:500, fontWeight:'bold'}}>FriendlyName:</label>
                            <input style={{width:500}} type="text" className="form-control" value={friendlyName} onChange={(e) => setFriendlyName(e.target.value)} />
                        </div>
                        <div class="mb-3 mt-3">
                            <label style={{width:500, fontWeight:'bold'}}>Model:</label>
                            <input style={{width:500}} type="text" className="form-control" value={model} onChange={(e) => setModel(e.target.value)} />
                        </div>
                    </div>
                    <div className="formg2">

                        <div class="mb-3 mt-3">
                            <label style={{width:500, fontWeight:'bold'}}>SerialNumber:</label>
                            <input style={{width:500}} type="text" className="form-control" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
                        </div>
                        <div class="mb-3 mt-3">
                            <label style={{width:500, fontWeight:'bold'}}>Type:</label>
                            <input style={{width:500}} type="text" className="form-control" value={type} onChange={(e) => setType(e.target.value)} />
                        </div>
                        <div class="mb-3 mt-3">
                            <label style={{width:500, fontWeight:'bold'}}>LabSerialNumber:</label>
                            <input style={{width:500}} type="text" className="form-control" value={labSerialNumber} onChange={(e) => setLabSerialNumber(e.target.value)} />
                        </div>
                        <div class="mb-3 mt-3">
                            <label style={{fontWeight:'bold'}}>IsActive:</label> &nbsp;
                            <input style={{width:20, height:20, fontWeight:'bold'}} type="checkbox" id="isActive" value="yes" /> 
                        </div>
                    </div>
                </div>
                <div className="btnDeviceForm">
                    <button class="btn btn-primary" style={{fontWeight:'bold'}} onClick={() => save()}>Save</button> &nbsp; &nbsp;
                    <button class="btn btn-primary" style={{fontWeight:'bold'}} onClick={() => addnew()}>Add new</button> 
                </div>
         
                {/* <div>
                    <input type="search" value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
                    <button  onClick={() => search()}>Search</button> 
                </div> */}

            <div className="infoTable">
                <table className="table table-bordered">
                    <thead style={{fontWeight:'bold'}}>
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
                                            <button className="btn btn-success" onClick={() => editDevice(e.Id,e.DateSync, e.Description, e.FriendlyName, e.Model, e.SerialNumber, e.Type,  e.LabSerialNumber,e.IsActive,)}><FontAwesomeIcon icon={faEdit} /></button> &nbsp;
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

