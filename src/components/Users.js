import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faEdit, faTrashAlt, faArrowRight, faArrowLeft, faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons";
import { faKeyboard, } from "@fortawesome/free-regular-svg-icons";

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
    setEmail(email)
    setId(id)
    setPassword(password)
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
    <div>
      <h3 style={{ marginLeft: 200 , marginTop:50, fontWeight:'bold', color:'#707070', fontFamily:'Geogia'}}>Users Management</h3>
      <div className="container-user">
        <div class="mb-3 mt-3">
          <input type="hidden" className='form-control' value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div class="mb-3 mt-3">
          <label style={{ width: 85}}>Email:</label>
          <input type="text" style={{ height: 40, width: 300}}   value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div class="mb-3 mt-3">
          <label style={{ width: 85 }}>Password:</label>
          <input type="password" style={{ height: 40, width: 300}}  value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      
      </div>
      <div className="btnUser">
        <button class="btn btn-success" style={{ fontWeight: 'bold'}} onClick={() => save()}>Save</button> &nbsp; &nbsp;
        <button class="btn btn-success" style={{ fontWeight: 'bold' }} onClick={() => addnew()}>Add new</button>
      </div>

      <div className="infoTable">
        <table className="table table-bordered">
          <thead className="table-head">
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
