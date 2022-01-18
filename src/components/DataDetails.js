import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function DataDetails() {

    const [data, setData] = useState([])
    const [nresponse, setNresponse] = useState([])
    const [ndata, setNdata] = useState([0])
    const [sensorType, setSensorType] = useState('')
    const basedURL = "http://thegreenlab.xyz:3000"
    const localURL = "http://127.0.0.1:3000"
    const [chartOptions, setChartOptions] = useState([])
    const [receivedDate, setReceivedDate] = useState('')

    const [sensors, setSensors] = useState([])

    useEffect(async () => {
        show()
    }, [])

    const loadDevice = async (s) => {
        const endPoint = `http://thegreenlab.xyz:3000/Devices/Search?SerialNumber=${s}`
        const res = await fetch(endPoint, {
            // const nresponse = await fetch(`${localURL}/Datums/Last7Days?DeviceSerialNumber=FH21101006&SensorType=pH`,{
            method: 'GET',
            headers: { 'Authorization': 'Basic aGllbkBnbWFpbC5jb206MTIz' }
        })

        const device = await res.json()
        return device
    }

    const show = async () => {

        let queryString = window.location.search
        let params = new URLSearchParams(queryString);
        let serialNumber = params.get("DeviceSerialNumber");

        const device = await loadDevice(serialNumber)
        setSensors(device.Sensors)
        let options = []

        for (let i = 0; i < device.Sensors.length; i++) {
            let sensor = device.Sensors[i]
            const endPoint = `${basedURL}/Datums/Last7Days?DeviceSerialNumber=${serialNumber}&SensorType=${sensor.SensorType}`
            const nresponse = await fetch(endPoint, {
                // const nresponse = await fetch(`${localURL}/Datums/Last7Days?DeviceSerialNumber=FH21101006&SensorType=pH`,{
                method: 'GET',
                headers: { 'Authorization': 'Basic aGllbkBnbWFpbC5jb206MTIz' }
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
                    type: 'spline'
                },
                title: {
                    text: stitle
                },
                series: [
                    {
                        name: stitle, data: values
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
        <div className="datadetails">
            <h4>Lastest 7 Days Data </h4>
            {sensors.map((sensor, index) => {
                return (
                   <div>
                       <p>{sensor.DeviceSerialNumber}</p>
                    <div>
                 
                        <HighchartsReact highcharts={Highcharts} options={chartOptions[index]} />

                    </div>
                    </div>
                )
            })
            }
        </div>
    )

}


