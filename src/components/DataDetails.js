
import React, { useEffect, useState } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet" />;
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>;
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
export default function DataDetails() {

    const Token = window.localStorage.getItem('Token')

    const [data, setData] = useState([])
    const [nresponse, setNresponse] = useState([])
    const [ndata, setNdata] = useState([0])
    const [sensorType, setSensorType] = useState('')
    const baseURL = "http://thegreenlab.xyz:3000"
    //const baseURL = "http://127.0.0.1:3000"
    const [chartOptions, setChartOptions] = useState([])
    const [receivedDate, setReceivedDate] = useState('')

    const [sensors, setSensors] = useState([])



    useEffect(async () => {
        //show()
    }, [])

    const loadDevice = async (s) => {
        const endPoint = baseURL + `/Devices/Search?SerialNumber=${s}`
        const res = await fetch(endPoint, {
            // const nresponse = await fetch(`${localURL}/Datums/Last7Days?DeviceSerialNumber=FH21101006&SensorType=pH`,{
            method: 'GET',
            headers: { 'Authorization': 'Basic ' + Token }
        })

        const devices = await res.json()
        return devices
    }

    const show = async (period) => {

        let queryString = window.location.search
        let params = new URLSearchParams(queryString);
        let serialNumber = params.get("DeviceSerialNumber");

        const device = await loadDevice(serialNumber)
        setSensors(device.Sensors)
        let options = []

        for (let i = 0; i < device.Sensors.length; i++) {
            let sensor = device.Sensors[i]

            let endPoint = ''

            if (period==='7day')
            {
                endPoint = `${baseURL}/Datums/Last7Days?DeviceSerialNumber=${serialNumber}&SensorType=${sensor.SensorType}`
            }
            else
            {
                endPoint = `${baseURL}/Datums/Last7Days?DeviceSerialNumber=${serialNumber}&SensorType=${sensor.SensorType}`
            }
            
            const nresponse = await fetch(endPoint, {
                // const nresponse = await fetch(`${localURL}/Datums/Last7Days?DeviceSerialNumber=FH21101006&SensorType=pH`,{
                method: 'GET',
                headers: { 'Authorization': 'Basic ' + Token }
            })
            const ndata = await nresponse.json()

            let stitle = sensor.SensorType
            let unit = ndata[0].Unit
            let values = []
            for (var j = 0; j < ndata.length; j++) {
                values.push(ndata[j].Value)
            }
            let date = []
            for (var d = 0; d < ndata.length; d++) {
                date.push(ndata[d].ReceivedDate.substr(0, 16))
            }
            options.push({
                chart: {
                    type: 'spline',
                },
                title: {
                    text: stitle
                },
                series: [
                    {
                        name: stitle, data: values, color:'green',
                    }
                ],
                xAxis: {
                    categories: date

                },
                yAxis: {
                    title: {
                        text: unit
                    }
                }
            })

        }
        setChartOptions(options)

    }
    return (
        <div className="box">
            <h4>Show Lastest Data </h4>
            <button className='btn btn-success' onClick={()=>show('7day')}>Data of 7 days</button>
            <button className='btn btn-success' onClick={()=>show('24hour')}>Data of 24 hours</button>
            {sensors.map((sensor, index) => {
                return (
                   <div>
                    <HighchartsReact highcharts={Highcharts} options={chartOptions[index]} />
                    </div>
                )
            })
            }
        </div>
    )
}


