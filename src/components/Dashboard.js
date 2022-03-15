import React, { useEffect, useState } from 'react';
import moment from 'moment';
import '../App.css';
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.5/lodash.min.js"></script>;
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet" />;
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>;
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>;
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
export default function DashBoard() {

    const datetime = moment()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const basedURL = "http://thegreenlab.xyz:3000"
    //const basedURL = "http://localhost:3000"
    const Token = window.localStorage.getItem('Token')


    useEffect(async () => {
        const response = await fetch(basedURL + "/Datums/LastestDataByAllDevices", {
            method: 'GET',
            headers: { 'Authorization': 'Basic '+ Token }
        })
        try{
            const data = await response.json()
            setData(data)
        }
        catch(e){
            console.log('Error '+ e.message)
            setData({children:[]})
        }
        finally{
            setLoading(false)
        }


    }, []);
    return (
        <div className="container mt-8">
            <h1 className="text-muted" > Online Monitoring System</h1>
            <div>
                {loading ? "Loading...." :
                    <table className="table">
                        <thead className="table-head">
                            <tr>
                                <td>Description</td>
                                <td>DateSync</td>
                                <td>Status</td>
                                <td>Parameters</td>
                                <td>Chart</td>
                            </tr>
                        </thead>
                        <tbody>

                            {data.children.map(b => {

                              
                                let url = `/details?DeviceSerialNumber=${b.name}`
                                let url1 = `/datadetails?DeviceSerialNumber=${b.name}`
                                return (
                                    <tr >
                                        <td>
                                            {b.Description} <br/>
                                            FriendlyName: {b.FriendlyName} <br/>
                                            Model: {b.Model} <br/>
                                            SerialNumber: {b.SerialNumber} <br/>
                                            Type: {b.Type} <br/>
                                        </td>

                                        <td type="datetime">
                                            {/* {moment(b.device.DateSync).format("DD/MM/YYYY, HH:mm")} */}
                                        </td>
                                        <td >
                                           
                                        </td>
                                        <td>
                                            {b.children.map(a => {
                                                return (
                                                    <>
                                                        <span className="dot">{(a.SensorType).slice(0, 4)} <br /> {a.Value}</span>

                                                    </>
                                                )
                                            }
                                            )}
                                        </td>
                                        <td >
                                            <a  href={url1}>Chart By Date</a>
                                            <br/>
                                            <a  href={url}>
                                                Chart By Value </a> <br />
                                        </td>
                                    </tr>

                                )
                            })}

                        </tbody>
                    </table>
                }
            </div>
        </div>

    )

}