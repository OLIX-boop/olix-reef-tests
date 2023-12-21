import React, { useState,useEffect } from "react";
import Chart from "./components/chart.js";
import Button from "./components/button.js";
import appStyle from "./app.module.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GetDBInfo from './database';

const colors = {
  KH: { r: 255, g: 0, b: 0 },
  CA: { r: 255, g: 153, b: 0 },
  MG: { r: 255, g: 230, b: 0 },
  NO2: { r: 0, g: 255, b: 0 },
  NO3: { r: 53, g: 162, b: 235 },
  PO4: { r: 0, g: 0, b: 255 },
};

var loadedOnce = false;
var newData = {}
var testDataBU = {}
const App = () => {
  const navigate = useNavigate();
  
  const [testsData, setTestsData] = useState(testDataBU);
  const [data, setData] = useState(newData);



  useEffect(() => { 
    if (loadedOnce) return;
    async function getTests() {
      try {
        let data = JSON.stringify({
          operation: 'sql',
          sql: `SELECT * FROM test_results.results`,
        });

        const info = GetDBInfo();
      
        let config = {
          method: 'post',
          url: atob(info[1]),
          headers: {
            'Content-Type': 'application/json',
            Authorization: atob(info[0]), 
          },
          data: data,
        };
      
        const response = await axios(config);
        return response.data;
      } catch (error) {
        console.log(error)
      }
    }

    async function setAllData() {
      const TESTS = await getTests();
      setTestsData(TESTS);
      testDataBU = TESTS;

      try {
        
        const newLabels = TESTS.map(obj => obj.date);
        const chartData = {
          labels: newLabels,
          datasets: [
            {
              fill: true,
              label: 'KH',
              data: TESTS.map(obj => parseFloat(obj["KH"])),
              borderColor: 'rgb(255, 0, 0)',
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
            },
          ],
        }
        setData(chartData);
        newData = chartData;

        loadedOnce = true;
      } catch (error) {console.log(error)}
      
    }
    setAllData();
  });
  
  const [title, setTitle] = useState("KH");

  const changeChartInfo = (type) => {
    if (type === "none") return navigate('/olix-reef-tests/newtest');
    var color = colors[type];
    setTitle(type);

    var ChartLabels = testsData.map(obj => obj.date)
    newData = {
      labels: ChartLabels,
      datasets: [
        {
          fill: true,
          label: type,
          data: testsData.map(obj => parseFloat(obj[type])),
          borderColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
          backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`,
        },
      ],
    };
    setData(newData);


    const buttons = document.querySelectorAll("#button");

    buttons.forEach((button) => {
      if (button.classList.contains("clicked")) {
        button.classList.remove("clicked"); 
      }
    });

    buttons.forEach((button) => {
      if (button.getAttribute('tipo') === type) {
        button.classList.add("clicked");
      }
    })

  }

  return (
    <div className={appStyle.body}>
      <div className={appStyle.background}>
        <div className={appStyle.titleContainer}>
          <div/>
          <h1 className={appStyle.Title}>{title}</h1>
        </div>

        <div className={appStyle.mainContainer}>
          <div className={appStyle.buttonsContainer}>
              <Button icon="+" text="Add" handleClick={changeChartInfo} type = "none"/>
              <Button icon="chemical" handleClick={changeChartInfo} type = "KH" text="KH" defaultClicked={true}  />
              <Button icon="chemical" handleClick={changeChartInfo} type = "CA" text="Ca" />
              <Button icon="chemical" handleClick={changeChartInfo} type = "MG" text="Mg" />
              <Button icon="chemical" handleClick={changeChartInfo} type = "NO2" text="NO2" />
              <Button icon="chemical" handleClick={changeChartInfo} type = "NO3" text="NO3" />
              <Button icon="chemical" handleClick={changeChartInfo} type = "PO4" text="PO4" />
          </div>

          <div className={appStyle.chart_container}>
            {loadedOnce && <Chart data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
