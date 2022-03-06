import logo from './logo.svg';
import './App.css';
import React,{useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {
  BrowserRouter as Router, Routes,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Menu from "./components/Menu"
// import DeviceDashBoard from './components/DeviceDashBoard';
import Details from './components/Details';
import Signin from './components/Signin';
import Chart from './components/Chart';
import DataDetails from './components/DataDetails';
import GroupDevices from './components/GroupDevices';
import DevicesForm from './components/DevicesForm';
import SignUp from './components/SignUp';
import Logout from './components/Logout';
import Users from './components/Users';
import DashBoard from './components/Dashboard';
import AssignUser from './components/AssignUser';



function App() {
  const [showLogin, setShowLogin] = useState(false)
  useEffect(() => {
    document.title = "Online Monitoring System "
    if (localStorage.getItem('Email') === null || localStorage.getItem('Email') === ""){
       setShowLogin(true)
    }
    else{
      setShowLogin(false)
    }
  }, []);
 return (
   <div>
       

          <Menu />
          {showLogin?
            <Signin />
        :
        <Router >
        <div>
       
           <Routes>
            <Route path="/signin" caseSensitive={false} element={ <Signin />} />
            </Routes>
            {/* <Routes>
            <Route path="/signout" caseSensitive={false} element={ <Logout />} />
            </Routes> */}

            {/* <Routes>
           <Route path="/devices" caseSensitive={false} element={ <DeviceDashBoard />} />
           </Routes> */}

           <Routes>
           <Route path="/dashboard" caseSensitive={false} element={ <DashBoard />} />
           </Routes>

           <Routes>
           <Route path="/groupdevices" caseSensitive={false} element={ <GroupDevices />} />
           </Routes>
          
           <Routes>
           <Route path="/datadetails" caseSensitive={false} element={ <DataDetails />} />
           </Routes>
          
          

           <Routes>
           <Route path="/details" caseSensitive={false} element={ <Details />}  />
           </Routes>

           <Routes>
           <Route path="/devicesform" caseSensitive={false} element={ <DevicesForm />}  />
           </Routes>
           <Routes>
           <Route path="/chart" caseSensitive={false} element={ <Chart />}  />
           </Routes>
           <Routes>
           <Route path="/signup" caseSensitive={false} element={ <SignUp />}  />
           </Routes>
           <Routes>
           <Route path="/users" caseSensitive={false} element={ <Users />}  />
           <Route path="/assignUser" caseSensitive={false} element={ <AssignUser />}  />

           </Routes>
</div>

 </Router>
   }
  </div>        
)
}

export default App;
