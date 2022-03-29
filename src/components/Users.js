import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faEdit, faTrashAlt, faArrowRight, faArrowLeft, faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons";
import { faKeyboard, } from "@fortawesome/free-regular-svg-icons";
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet" />;
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>;
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
export default function Users() {
  const Token = window.localStorage.getItem('Token')


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [id, setId] = useState('')
  const [data, setData] = useState([])
  const [dataDevice, setDataDevice] = useState([])
  const [selectedDevices, setSelectedDevices] = useState([])
  const [loading, setLoading] = useState(true)
  const baseURL = 'http://thegreenlab.xyz:3000'
  //const baseURL = 'http://127.0.0.1:3000'

  useEffect(async () => {
    load()
  }, [])

  const load = async () => {
    const response = await fetch(baseURL + "/Users", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+Token
      },
    })

    const data = await response.json()
    console.log(data)
    if (typeof data.message !== 'undefined'){
      console.log(data.message)
    }
    else{
      setData(data)
      setLoading(false)
    }

  }

  function save() {
    if (id === '') {
      fetch(baseURL + "/Users/Auth/Register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ Email: email, Password: password, userDevices: [] })
      }).then(data => load())
    }
    else {
  
      fetch(baseURL + "/Users", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic '+Token
        },
        body: JSON.stringify({ Id: id, Email: email, Password: password })
      }).then(data => load())
 
    }
  }

  const addnew = (id, email) => {
    setId('')
    setEmail('')
    setPassword('')
  }

  const editUser = (id, email, password) => {
    if (window.confirm('Do you want to reset?')==true){
    setEmail(email)
    setId(id)
    setPassword('')
    }
  }
  const deleteUser = (Id) => {

    if (window.confirm('Do you want to delete?')==true){

    fetch(baseURL + "/Users" + "/" + Id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+Token
      },
    }).then(data => load())
  }
  }

  return (
    <div className="box">
      <h3 >Users Management</h3>
      <div>
        <div>
          <input type="hidden" className='form-control' value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input class="form-control" type="text"   value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input class="form-control"  type="text"  value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      
      </div>
      <br/>
      <div>
        <button class="btn btn-success"  onClick={() => save()}>Save</button> &nbsp;
        <button class="btn btn-success"  onClick={() => addnew()}>Add new</button>
      </div>

      <br/>
      <div>
        <table class="table"> 
          <thead>
            <tr>
              <td>ID</td>
              <td>Email</td>
              <td>Assign</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>

            {data.map(e => {
              return (

                <tr>
                  <td>{e.Id}</td>
                  <td>{e.Email}</td>
                  <td>
                    <a href={"/assignUser?id="+e.Id+"&email="+e.Email}>Assign User</a>
                  </td>
                  <td>
                    <button className="btn btn-success" onClick={() => editUser(e.Id, e.Email, e.Password)}><FontAwesomeIcon icon={faEdit} /> Reset password</button> &nbsp;
                    <button className="btn btn-success" onClick={() => deleteUser(e.Id)}> <FontAwesomeIcon icon={faTrashAlt} /> </button>
                  </td>
                </tr>

              )

            })}

          </tbody>
        </table>
      </div>
    </div>
  )
}
