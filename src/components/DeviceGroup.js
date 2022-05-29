import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faEdit, faTrashAlt, faArrowRight, faArrowLeft, faArrowsLeftRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faKeyboard } from "@fortawesome/free-regular-svg-icons";
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet" />;
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>;
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

export default function DeviceGroup() {

    const Token = window.localStorage.getItem('Token')
    const [data, setData] = useState([])
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
 
   // const baseURL = "http://127.0.0.1:3000"

    const baseURL = "http://thegreenlab.xyz:3000"
    const [loading, setLoading] = useState(true)

    const save = () => {
        if (id === '') {
            fetch(baseURL + "/DeviceGroups", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Token
                },
                body: JSON.stringify({ Name: name, Description: description, })
            }).then(data => load())
        }
        else {
            fetch(baseURL + "/DeviceGroups", {
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
        const response = await fetch(baseURL + "/DeviceGroups", {
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
       
    }, []);


    const editDevicegroup = (id, name, description) => {
        setId(id)
        setName(name)
        setDescription(description)
    }

    const deleteDevicegroup = (Id) => {
        if (window.confirm('Do you want to delete?')){
        fetch(baseURL + "/DeviceGroups" + "/" + Id, {
            method: "DELETE",
            headers: { 'Authorization': 'Basic ' + Token }
        }).then(data => load())
    }

    }
    const addnew = () => {
        setDescription('')
        setName('')
        setId('')
    }
    
    
    return (

        <div className="box">
            <meta charset="utf-8"></meta>
            <h3>Device Group</h3>
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
                <div>
                <button class="btn btn-success" onClick={() => save()}>Save </button> &nbsp;
                <button class="btn btn-success" onClick={() => addnew()}>Add new</button>
                </div>
                <br/>
            </form>


            <div>

                <table class="table table-hover">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Description</td>
                            <td>Action</td>
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
                                            <button className="btn btn-success" onClick={() => editDevicegroup(e.Id, e.Name, e.Description)}><FontAwesomeIcon icon={faEdit} /></button> &nbsp;
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
