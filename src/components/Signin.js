
import React, { useEffect, useState } from 'react';

import '../App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faHockeyPuck, faHome, faKey, faUnlockAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { faEye, faKeyboard } from "@fortawesome/free-regular-svg-icons";
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet" />;
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>;
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
export default function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState([])
    const [isLogin, setIsLogin] = useState(true)
    const basedURL = "http://thegreenlab.xyz:3000"
    // const basedURL = "http://127.0.0.1:3000"
    async function login() {
        const response = await fetch(basedURL + "/Users/Auth/Login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Email: email, Password: password })
        })
        try {
            const data = await response.json()
            localStorage.setItem('Token', btoa(email + ':' + password))
            window.location = '/dashboard';
        }

        catch (e) {
            console.log(e)
        }

    }


    return (
        <div class="container">
            {/* <marquee direction="up" className="slogan" >“A PIONEER OF HIGH QUALITY!”</marquee> */}
            <div>
                <h2>Sign in</h2>
                <div>
                    <div>
                        <label><FontAwesomeIcon icon={faUser} /></label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="user, email" /> 
                    </div>
                    <div>
                        <label style={{ marginTop: 15 }}><FontAwesomeIcon icon={faKey} /></label>

                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />

                    </div>

                </div> <br />

                <button className="btn btn-primary" onClick={() => login()} >Sign In</button>

                <br/>

                <a href="/forgotpassword"> Forgot Password</a> &nbsp;
                <a href="/signup">Sign Up</a>
            </div>


        </div>
    )
}