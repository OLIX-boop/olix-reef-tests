import axios from 'axios';
import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';


import GetDBInfo from './database';
import Chart from "./components/chart.js";
import Button from "./components/button.js";
import appStyle from "./app.module.css";

const colors = {
  KH: { r: 255, g: 0, b: 0 },
  CA: { r: 255, g: 153, b: 0 },
  MG: { r: 255, g: 230, b: 0 },
  NO2: { r: 0, g: 255, b: 0 },
  NO3: { r: 53, g: 162, b: 235 },
  PO4: { r: 0, g: 0, b: 255 },
};

var loadedOnce = false;
var CurrentData = {}
var TestResult = {}
const App = () => {
  const navigate = useNavigate();
  
  const [testsData, setTestsData] = useState(TestResult);
  const [data, setData] = useState(CurrentData);
  const [title, setTitle] = useState("KH");
  
  useEffect(() => { 
    if (loadedOnce) return;

    function filterTests(response) {
      return response.data.map((e) => {
        var newElement = e;
        if (typeof e.KH === "string") newElement.KH=e.KH.replace(',', '.');
        if (typeof e.CA === "string") newElement.CA=e.CA.replace(',', '.');
        if (typeof e.MG === "string") newElement.MG=e.MG.replace(',', '.');
        if (typeof e.NO2 === "string") newElement.NO2=e.NO2.replace(',', '.');
        if (typeof e.NO3 === "string") newElement.NO3=e.NO3.replace(',', '.');
        if (typeof e.PO4 === "string") newElement.PO4=e.PO4.replace(',', '.');
        return newElement;
      })
    }

    async function getTests() {
      try {
        const dbInfo = GetDBInfo();
        const query = JSON.stringify({
          operation: 'sql',
          sql: `SELECT * FROM test_results.results`,
        });
      
        const config = {
          method: 'post',
          url: atob(dbInfo[1]),
          headers: {
            'Content-Type': 'application/json',
            Authorization: atob(dbInfo[0]), 
          },
          data: query,
        };
      
        const response = filterTests(await axios(config));

        return response;
      } catch (error) {console.log(error)};
    }

    async function setAllData() {
      TestResult = await getTests();
      setTestsData(TestResult);

      try {
        CurrentData = {
          labels: TestResult.map(obj => obj.date),
          datasets: [
            {
              fill: true,
              label: 'KH',
              data: TestResult.map(obj => parseFloat(obj["KH"])),
              borderColor: 'rgb(255, 0, 0)',
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
            },
          ],
        }
        setData(CurrentData);
        loadedOnce = true;
      } catch (error) {console.log(error)}
    }
    setAllData();
  });
  

  const changeChartInfo = (type) => {
    if (type === "addnew") return navigate('/olix-reef-tests/newtest');
    
    var color = colors[type];
    setTitle(type);

    CurrentData = {
      labels: testsData.map(obj => obj.date),
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
    setData(CurrentData);
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
              <Button icon="+"        handleClick={changeChartInfo} type = "addnew" text="Add"/>
              <Button icon="chemical" handleClick={changeChartInfo} type = "KH"   text="KH" defaultClicked={true}  />
              <Button icon="chemical" handleClick={changeChartInfo} type = "CA"   text="Ca" />
              <Button icon="chemical" handleClick={changeChartInfo} type = "MG"   text="Mg" />
              <Button icon="chemical" handleClick={changeChartInfo} type = "NO2"  text="NO2" />
              <Button icon="chemical" handleClick={changeChartInfo} type = "NO3"  text="NO3" />
              <Button icon="chemical" handleClick={changeChartInfo} type = "PO4"  text="PO4" />
          </div>

          <div className={appStyle.chart_container}>
            {loadedOnce && <Chart data={data} rawData={TestResult}/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
