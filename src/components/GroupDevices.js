import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faKeyboard } from "@fortawesome/free-regular-svg-icons";


export default function GroupDevices() {

    const Token = window.localStorage.getItem('Token')
console.log(Token);
    const [data, setData] = useState([])
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
 

    const baseURL = "http://127.0.0.1:3000"
   
    // const baseURL = "http://thegreenlab.xyz:3000"
    const [loading, setLoading] = useState(true)

    const save = () => {
        if (id === '') {
            fetch(baseURL + "/Devicegroup", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic '+Token
                },
                body: JSON.stringify({  Name: name ,Description: description,})
            }).then(data => load())
        }
        else {
            fetch(baseURL + "/Devicegroup", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'Basic '+Token
                },
                body: JSON.stringify({ Id: id,  Name: name, description: description})
            }).then(data => load())

        }

    }
   const load = (async()=>{
        const response = await fetch(baseURL + "/Devicegroup", {
            method: 'GET',
            headers: {  
            'Authorization': 'Basic dnZAZ21haWwuY29tOjEyMzQ1Ng=='}
            //  'Authorization': 'Basic' + Token}
        })
        const data = await response.json()
        setData(data)
        setLoading(false)
    })


    useEffect(async () => {
       load()
    }, []);



    function myCheck() {
        var x = document.getElementById("checked").checked;
        document.getElementById("demo").innerHTML = x;
    }

    const editDevice = (id, description, name) => {
        setDescription(description)
        setName(name)
        setId(id)

    }

    const deleteDevice = (id) => {
        fetch(baseURL + "/Devices" + "/" + id, {
            method: "DELETE",
            headers: { 'Authorization': 'Basic' +Token }
        }).then(data => load())

    }
    const addnew = () => {
        setDescription('')
        setName('')
        setId('')
    }


    return (
        <div className="container">
            <h3>Group Devices</h3>
            <div className='form'>
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

           
            <button class="btn btn-success" onClick={() => save()}>Save</button> <n/>
            <button class="btn btn-success" onClick={() => addnew()}>Add new</button>

            </div>
            <div className="table">

                <table className="table table-hover">
                    <thead>
                        <tr>
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

                                            <button className="btn btn-success" onClick={() => editDevice(e.FriendlyName, e.Description, e.Model, e.SerialNumber, e.Type, e.IsActive)}><FontAwesomeIcon icon={faEdit} /></button> <br /><br />
                                            <button className="btn btn-success" onClick={() => deleteDevice(e._id)}> <FontAwesomeIcon icon={faTrashAlt} /> </button>
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

