import React, { useEffect, useState } from 'react';
import logo from './logo.jpg';


export default function Menu() {
  const signout = ()=>{
    localStorage.removeItem('Token')
    window.location ='/'
}
  return (
    <div>

    <nav class="navbar navbar-expand-sm navbar-light">
      <div>
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
              <a style={{ color: 'white', }} class="nav-link" href="/">  </a>
            </li>
            <li class="nav-item">
              <a style={{ color: 'white', }} class="nav-link" href="/dashboard">OMS</a>
            </li>
            <li class="nav-item">
              <a style={{ color: 'white', }} class="nav-link" href="/devicesform">Device</a>
            </li>
            <li class="nav-item">
              <a style={{ color: 'white', }} class="nav-link" href="/devicegroup">Devices Group</a>
            </li>
            <li class="nav-item">
              <a style={{ color: 'white', }} class="nav-link" href="/users">User</a>
            </li>
          
            <div class="nav-item dropdown">
              <li  >
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style={{color: 'white',  }}>smartpH</a>
                <ul class="dropdown-menu" >
                  <li><a class="dropdown-item" href="/signin">Sign In</a></li>
                  <li><a class="dropdown-item" href="/signup">Sign Up</a></li>
 
                  <li>
                  {localStorage.getItem('Token') !== null && localStorage.getItem('Token') !== "" ?
                    <a class="dropdown-item" href="#" onClick={()=>signout()}>
                   Log Out</a>
                  : ""}
                  </li>


                </ul>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  )
}