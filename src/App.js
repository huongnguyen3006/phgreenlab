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


function App() {
 return (
        <Router >
          <Home />
          <div>
         
             {/* <Routes>
              <Route path="/labs" caseSensitive={false} element={ <Labs />} />
              </Routes> */}

              <Routes>
             <Route path="/devices" caseSensitive={false} element={ <DeviceDashBoard />} />
             </Routes>
            

            
             {/* <Routes>
             <Route path="/chart" caseSensitive={false} element={ <Chart />} />
         
             </Routes> */}

             <Routes>
             <Route path="/details" caseSensitive={false} element={ <Details />}  />
             </Routes>

             <Routes>
             <Route path="/statistic" caseSensitive={false} element={ <StatisticData />}  />
             </Routes>
</div>
   </Router>
)
}

export default App;
