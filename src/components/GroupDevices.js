import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faKeyboard } from "@fortawesome/free-regular-svg-icons";


export default function GroupDevices() {

    const Token = window.localStorage.getItem('Token')

    const [data, setData] = useState([])
    const [id, setId] = useState('')
    const [friendlyName, setFriendlyName] = useState('')
    const [description, setDescription] = useState('')
    const [model, setModel] = useState('')
    const [serialNumber, setSerialNumber] = useState('')
    const [type, setType] = useState('')
    const [labId, setLabId] = useState('')
    const [isActive, setIsActive] = useState('')

    //const endPoint = "http://127.0.0.1:4000/Labs"

    const basedURL = "http://thegreenlab.xyz:3000"
    const [loading, setLoading] = useState(true)

    const save = () => {
        if (id === '') {
            fetch(basedURL + "/Devices", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic aGllbkBnbWFpbC5jb206MTIz'
                },
                body: JSON.stringify({ description: description, friendlyName: friendlyName, model: model, serialNumber: serialNumber, type: type, isActive: isActive })
            }).then(data => setData(data))
        }
        else {
            fetch(basedURL + "/Devices", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic aGllbkBnbWFpbC5jb206MTIz'
                },
                body: JSON.stringify({ id: id, description: description, friendlyName: friendlyName, model: model, serialNumber: serialNumber, type: type, isActive: isActive })
            }).then(data => setData(data))

        }

    }


    useEffect(async () => {
        const response = await fetch(basedURL + "/Devices", {
            method: 'GET',
            headers: { 'Authorization': 'Basic aGllbkBnbWFpbC5jb206MTIz' }
        })
        const data = await response.json()
        setData(data)
        setLoading(false)
    }, []);

    // function toggle(checked) {
    //     var elm = document.getElementById('checkbox');
    //     if (checked != elm.checked) {
    //       elm.click();
    //     }
    //   }
    function myCheck() {
        var x = document.getElementById("checked").checked;
        document.getElementById("demo").innerHTML = x;
    }

    const editDevice = (description, friendlyName, model, serialNumber, type, isActive) => {
        setDescription(description)
        setFriendlyName(friendlyName)
        setModel(model)
        setSerialNumber(serialNumber)
        setType(type)
        setIsActive(isActive)

    }

    const deleteDevice = (id) => {
        fetch(basedURL + "/Devices" + "/" + id, {
            method: "DELETE",
            headers: { 'Authorization': 'Basic aGllbkBnbWFpbC5jb206MTIz' }
        }).then(data => setData(data))

    }
    const addnew = () => {
        setDescription('')
        setFriendlyName('')
        setModel('')
        setSerialNumber('')
        setType('')
        setIsActive('')
        setId('')
    }


    return (
        <div className="container-labs">
            <h3>Group Devices</h3>
            <input type="hidden" className="form-control" value={id} onChange={(e) => setId(e.target.value)} />

            <label>Description:</label>
            <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />

            <label>FriendlyName:</label>
            <input type="text" className="form-control" value={friendlyName} onChange={(e) => setFriendlyName(e.target.value)} />

            <label>Model:</label>
            <input type="text" className="form-control" value={model} onChange={(e) => setModel(e.target.value)} />

            <label>SerialNumber:</label>
            <input type="text" className="form-control" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />

            <label>Type:</label>
            <input type="text" className="form-control" value={type} onChange={(e) => setType(e.target.value)} />

            <label>IsActive:</label>
            <input type="checkbox" id="checked" /> <br />
            <button onClick={() => save()}>Save</button> <n/>
            <button onClick={() => addnew()}>Add new</button>
            <div className="table-gdevices">

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td>All Devices</td>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map(e => {
                            return (
                                <>
                                    <tr>
                                        <td>  <input type="checkbox" id="checked" /> </td>
                                        <td>

                                            FriendlyName: {e.FriendlyName} <br />
                                            Description: {e.Description}<br />
                                            Model:{e.Model}<br />
                                            SerialNumber: {e.SerialNumber}<br />
                                            Type: {e.Type}<br />
                                            {e.IsActive}
                                        </td>


                                        <td>

                                            <button className="btn btn-success" onClick={() => editDevice(e.FriendlyName, e.Description, e.Model, e.SerialNumber, e.Type, e.IsActive)}><FontAwesomeIcon icon={faEdit} /></button> <br /><br />
                                            <button className="btn btn-success" onClick={() => deleteDevice(e._id)}> <FontAwesomeIcon icon={faTrashAlt} /> </button>
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

