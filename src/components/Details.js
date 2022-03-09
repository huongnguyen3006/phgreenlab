import React, { useState, useEffect } from "react";
import moment from "moment";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import '../App.css';
export default function Details() {
    // const datetime = moment()
    const Token = window.localStorage.getItem('Token')

    const [data, setData] = useState([])
    const [receivedDate, setReceivedDate] = useState('')
    const [response, setResponse] = useState([])
    const [stDate, setStDate] = useState('')
    const [enDate, setEnDate] = useState('')
    // const [showTable, setShowTable] = useState(false)

    const [chartOptions, setChartOptions] = useState([])

    const baseURL = "http://thegreenlab.xyz:3000"

    function today() {
        return new Date();
    }

    function lastWeek() {
        return new Date(today().getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Get formatted date YYYY-MM-DD
    function getFormattedDate(date) {
        return date.getFullYear()
            + "-"
            + ("0" + (date.getMonth() + 1)).slice(-2)
            + "-"
            + ("0" + date.getDate()).slice(-2);
    }


    useEffect(async () => {
        setStDate(getFormattedDate(lastWeek()))
        setEnDate(getFormattedDate(today()))
        // show()

    }, []);


    const show2 = async () => {
        let queryString = window.location.search
        let params = new URLSearchParams(queryString);
        let serialNumber = params.get("DeviceSerialNumber");
        const endPoint = `${baseURL}/Datums/StatisticDataByDevice?DeviceSerialNumber=${serialNumber}&StartDate=${stDate}&EndDate=${enDate}`
        const data = await fetch(endPoint, {
            method: 'GET',
            headers: { 'Authorization': 'Basic '+ Token }
        })
      

        try{
            const response = await data.json()
            setResponse(response)
        }
        catch(e){
            console.log('Error '+ e.message)
            setData([])
        }
        finally{
            //do something here
        }


        let sOptions = []
        for (var i = 0; i < response.length; i++) {
            //di qua tung sensor
            let sensor = response[i]

            let temp = []
            for (var j = 0; j < sensor.data.length; j++) {
                temp.push(sensor.data[j].AVG)
            }
            let min = []
            for (var j = 0; j < sensor.data.length; j++) {
                min.push(sensor.data[j].MIN)
            }
            let max = []
            for (var j = 0; j < sensor.data.length; j++) {
                max.push(sensor.data[j].MAX)
            }
            sOptions.push({
                chart: {
                    type: 'spline'
                },
                title: {
                    text: sensor.sensorType
                },
                series: [
                    { name:'Avg', data: temp },
                    { name: 'Min', data: min },
                    { name: 'Max',data: max }
                ]
            })

        }
        setChartOptions(sOptions)
    }

    return (
        <div className="details">
            <h2>Details</h2>
            <label>From date:</label> <n />
            <input type="date" value={stDate} onChange={(e) => setStDate(e.target.value)} /> <n /><n />
            <label>To date:</label><n />
            <input type="date" value={enDate} onChange={(e) => setEnDate(e.target.value)} /> <n />
            <button onClick={() => show2()}>Show</button>
            {/* <button onClick={() => showtable()}>ShowData</button> */}
            {response.map((a, index) => {
                return (
                    <>
                        <p style={{ fontWeight: 'bold', color: '#087f23', margin: 10 }}>{a.sensorType}</p>
                        <div className="table-details">
                            <div className="table-value">
                                <table className="table table-hover" >
                                    <thead>
                                        <tr>
                                            <td >Date</td>
                                            <td style={{ color: '#4fc3f7' }}>Avg</td>
                                            <td>Min</td>
                                            <td style={{ color: '#67d669' }}>Max</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {a.data.map(b => {
                                            return (
                                                <tr>
                                                    <td>{moment(b.DateOnly).format("YYYY-MM-DD")}</td>
                                                    <td style={{ color: '#4fc3f7' }}>{Math.round(100 * b.AVG) / 100}</td>
                                                    <td >{Math.round(100 * b.MIN, 2) / 100}</td>
                                                    <td style={{ color: '#67d669' }}>{Math.round(100 * b.MAX, 2) / 100}</td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>
                            <div className="chartdetails">

                                <HighchartsReact highcharts={Highcharts} options={chartOptions[index]} />
                            </div>
                        </div>
                    </>

                )
            })}

        </div>
    )
        }