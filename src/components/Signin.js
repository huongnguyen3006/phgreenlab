//remember this import
import { useState } from "react"
import '../App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faHockeyPuck, faHome, faKey, faUnlockAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { faKeyboard } from "@fortawesome/free-regular-svg-icons";
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

                <h1 style={{ textAlign: 'center', fontFamily: 'inherit', color: '#757575', fontWeight: 'bold', fontSize: '40px' }}>Sign In</h1> <br />
                <div className="signin-content">
                    <label><FontAwesomeIcon icon={faUser} /></label> <n />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: 300 }} type="text" placeholder="user, email" /> <br />  <br />
                    <label><FontAwesomeIcon icon={faKey} /></label> <n />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: 300 }} type="password" placeholder="password" /> <br /><br />

                    <button type="button" onClick={() => login()} >Sign In</button> <br /><br /><br /><br />

                    <a style={{ fontWeight: 'normal', color: '#0039cb' }} href="/forgotpassword"><FontAwesomeIcon icon={faUnlockAlt} /> Forgot Password</a> &nbsp;&nbsp;&nbsp;
                    <a style={{ fontWeight: 'normal', color: '#0039cb' }} href="/signup">Sign Up</a>
                </div>

            </div>
        </div>
    )
}