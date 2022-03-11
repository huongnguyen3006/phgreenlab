import React, { useEffect, useState } from 'react';
import '../App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faHockeyPuck, faHome, faKey, faUnlockAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { faEye, faKeyboard } from "@fortawesome/free-regular-svg-icons";
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
            localStorage.setItem('Token',  btoa(email+':'+password))
            window.location = '/dashboard';
        }

        catch (e) {
            console.log(e)
        }

    }


    return (
        <div>
            <marquee direction="up" className="slogan" >“A PIONEER OF HIGH QUALITY!”</marquee>
            <div className="signin" >

                <h1 style={{ textAlign: 'center', fontFamily: 'Geogia', color: '#757575', fontWeight: 'bold', fontSize: '40px' }}>Sign In</h1> <br />
                <div className="signin-content">
                    <div>
                    <label><FontAwesomeIcon icon={faUser} /></label> &nbsp;&nbsp;&nbsp;
                    <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: 350 , height: 50, fontSize:20, borderRadius:5}} type="text" placeholder="user, email" /> <br />  <br />
                  </div>  
                  <div className='password'>
                    <label style={{marginTop:15}}><FontAwesomeIcon icon={faKey} /></label> &nbsp;&nbsp;&nbsp;

                    <div className='inputIcon' >
                    <input style={{ width: 350 , height: 50,fontSize:20, borderRadius:5,}} value={password} onChange={(e) => setPassword(e.target.value)}  type="password" placeholder="password" /> &nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faEye} className='iconEye'/>
                    </div>
                  </div>  
                   
                    </div> <br />
                
                    <button type ="button" style={{backgroundColor:'#e0e0e0', fontFamily:'Geogia',fontSize:20, borderRadius:5 }} onClick={() => login()} >Sign In</button> <br /><br /><br /><br /><br />

                    <a  className="btnFgSu" href="/forgotpassword"><FontAwesomeIcon icon={faUnlockAlt} /> Forgot Password</a> &nbsp;&nbsp;&nbsp;
                    <a className="btnFgSu" href="/signup">Sign Up</a>
                </div>

            
        </div>
    )
}