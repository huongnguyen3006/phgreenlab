import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {
  BrowserRouter as Router, Routes,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./components/Home"
import DeviceDashBoard from './components/DeviceDashBoard';
import StatisticData from './components/StatisticData';
import Details from './components/Details';
import Signin from './components/Signin';
import Chart from './components/Chart';
import DataDetails from './components/DataDetails';


function App() {
 return (
        <Router >
          <Home />
          <div>
         
             <Routes>
              <Route path="/signin" caseSensitive={false} element={ <Signin />} />
              </Routes>

              <Routes>
             <Route path="/devicedashboard" caseSensitive={false} element={ <DeviceDashBoard />} />
             </Routes>
            
             <Routes>
             <Route path="/datadetails" caseSensitive={false} element={ <DataDetails />} />
             </Routes>
            
            

             <Routes>
             <Route path="/details" caseSensitive={false} element={ <Details />}  />
             </Routes>

             <Routes>
             <Route path="/statistic" caseSensitive={false} element={ <StatisticData />}  />
             </Routes>
             <Routes>
             <Route path="/chart" caseSensitive={false} element={ <Chart />}  />
             </Routes>
</div>
   </Router>
)
}

export default App;
