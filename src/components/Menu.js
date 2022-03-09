
import logo from './logo.jpg';
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faKey, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet" />;
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>

export default function Menu() {
  const signout = ()=>{
    localStorage.removeItem('Token')
    window.location ='/'
}
  return (
    <nav class="navbar navbar-expand-sm navbar-light">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src={logo} alt="Logo" style={{ width: 60, height: 50 }} class="rounded-pill" />
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
          <span class="navbar-toggler-icon">
          </span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar" >
          <ul class="navbar-nav">
            <li class="nav-item">
              <a style={{ color: '#388e3c', fontSize: 25 }} class="nav-link" href="/"> <FontAwesomeIcon icon={faHome} /> </a>
            </li>
            <li class="nav-item">
              <a style={{ color: '#388e3c', fontSize: 25 }} class="nav-link" href="/dashboard">OMS</a>
            </li>
            <li class="nav-item">
              <a style={{ color: '#388e3c', fontSize: 25 }} class="nav-link" href="/devicesform">Device</a>
            </li>
            <li class="nav-item">
              <a style={{ color: '#388e3c', fontSize: 25 }} class="nav-link" href="/users">User</a>
            </li>
          
            <div class="nav-item dropdown">
              <li  >
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style={{ float: 'right', color: '#388e3c', fontSize: 25 }}>smartpH</a>
                <ul class="dropdown-menu  " >
                  <li><a class="dropdown-item" href="/signin">Sign In</a></li>
                  <li><a class="dropdown-item" href="/signup">Sign Up</a></li>
 
                  <li>
                  {localStorage.getItem('Token') !== null && localStorage.getItem('Token') !== "" ?
                    <a class="dropdown-item" href="#" onClick={()=>signout()}>
                   <FontAwesomeIcon icon={faSignOutAlt} fixedWidth /> Log Out</a>
                  : ""}
                  </li>


                </ul>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  )
}