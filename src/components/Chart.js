import React, { useEffect, useState } from 'react';
export default function Chart() {
    const endPoint = "http://127.0.0.1:3000/Datums/DataByDate?DeviceSerialNumber=CA21101007-01&StartDate=2021-11-10&EndDate=2021-12-01"

    const [data, setData] = useState([])
    // const [json, setJson] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        const response = await fetch(endPoint, {
            method: 'GET',
            headers: { 'Authorization': 'Basic dnZAZ21haWwuY29tOjEyMzQ1Ng==' }
        })

        const data = await response.toString()
       
        // // setJson(json)
        setData(data)
        setLoading(loading)
    }, []);
    return (
        <div>
            <h1> Line chart </h1>
            <table>
                <th>
                    <tr>
                        <td> Date</td>
                        <td>Device Serialnumber</td>
                        <td>SensorType</td>
                        <td>Value</td>
                        <td>Unit</td>
                        <td>Status</td>
                    </tr>
                </th>
                <tbody>
                    {data.map(a => {
                        return (
                            <tr>
                                <td>{a.Date}</td>
                                <td>{a.DeviceSerialNumber}</td>
                                <td>{a.SensorType}</td>
                                <td>{a.Value}</td>
                                <td>{a.Unit}</td>
                                <td>{a.Status}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}