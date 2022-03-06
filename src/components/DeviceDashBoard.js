// import { useState, useEffect } from "react";
// import moment from 'moment';
// import '../App.css';
// <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.5/lodash.min.js"></script>;
//   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet" />;
//   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>;
//   <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>;
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
// export default function Devicedb() {

//     const datetime = moment()
//     const [data, setData] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [bigdata, setBigdata] = useState([])
//     const basedURL = "http://thegreenlab.xyz:3000"



//     useEffect(async () => {
//         const response = await fetch(basedURL+"/Devices", {
//             method: 'GET',
//             headers: { 'Authorization': 'Basic aGllbkBnbWFpbC5jb206MTIz' }
//         })
//         const data = await response.json()

//         let bigdata = []
//         for (let i = 0; i < data.length; i++) {
//             let d = data[i]
//             let serialNumber = d.SerialNumber

//             const deviceresponse = await fetch(`${basedURL}/Datums/LastestDataByDevice?DeviceSerialNumber=${serialNumber}`, {
//                 method: 'GET',
//                 headers: { 'Authorization': 'Basic aGllbkBnbWFpbC5jb206MTIz' }

//             })

//             const deviceData = await deviceresponse.json()

//             bigdata = [...bigdata, { device: d, deviceData: deviceData }]

//             setBigdata(bigdata)
            
//         }
//         setData(data)
//         setLoading(false)
//     }, []);

//     // function doSelect() {
//     //     let v = document.querySelector('#selDevice').value
//     //     // alert (v)
//     //     let ds = document.querySelectorAll('.divDevice')
//     //     for (let i=0; i<ds.length; i++){
//     //       ds[i].style.display = 'display';
//     //     }
//     //     document.querySelector('#' + v).style.display = 'block';
//     // }
//     return(
//             <div className="container-dashboard">
//                 <h1 style={{fontFamily:'fantasy', color:'#707070', marginLeft:160}}>Online Monitoring System</h1>
           
//             {bigdata.map(a =>{ 
//                 return(
//                     <>

//             <div className="table-dashboard"  style={{display:'display'}} id={a.device.SerialNumber} type='divDevice'>
//                 <table className="table" >
//                     <thead className="table-head">
//                         <tr>
//                             <td>Description</td>
//                             <td> DateSync</td>
//                             <td>Status</td>
//                             <td>Parameters</td>
//                             <td>Chart</td>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {bigdata.map(b => {
//                             let url = `/details?DeviceSerialNumber=${b.device.SerialNumber}`
//                             let url1 = `/datadetails?DeviceSerialNumber=${b.device.SerialNumber}`
//                             return (
//                                 <tr >
//                                     <td>{b.device.Description} <br />
//                                         FriendlyName: {b.device.FriendlyName} <br />
//                                         Model: {b.device.Model} <br />
//                                         SerialNumber:{b.device.SerialNumber} <br />
//                                         Type: {b.device.Type} <br />
//                                         DeviceSerialNumber: {b.device.LabSerialNumber}
//                                     </td>

//                                     <td type="datetime">{moment(b.device.DateSync).format("DD/MM/YYYY, HH:mm")}</td>
//                                     <td>{b.device.SerialNumber} </td>
//                                     <td>
//                                         {b.deviceData.map(a => {
//                                             return (
//                                                 <>
//                                                     <span className="dot">{(a.SensorType).slice(0, 4)} <br /> {a.Value}</span>

//                                                 </>
//                                             )
//                                         }
//                                         )}
//                                     </td>
//                                     <td >  
//                                         <a style={{ color: '#087f23', fontWeight: 'normal' }} href={url1}> Real Data</a> <br /><br />
//                                         <a style={{ color: '#087f23', fontWeight: 'normal' }} href={url}> Average Data </a> 
//                                     </td>
//                                 </tr>

//                             )
//                         })}

//                     </tbody>
//                 </table>
//             </div>
//             </>
//                 )
//             })}
//         </div>

//     )
//         }	