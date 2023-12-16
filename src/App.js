import React, { useState} from "react";
import Chart from "./components/chart.js";
import Button from "./components/button.js";
import appStyle from "./app.module.css";

const testsData = [
  { NO3: 0.2, NO2: 0.03, PO4: 0.27, KH: 8.5, MG: 1250, CA: 350, date: '15 luglio' },
  { KH: 8.5, MG: 1250, NO3: 0.1, NO2: 0.003, PO4: 0.11, CA: 380, date: '22 luglio' },
  { MG: 1260, KH: 8.5, CA: 370, NO3: 0.2, NO2: 0.003, PO4: 0.09, date: '29 luglio' },
  { KH: 7.5, MG: 1260, CA: 345, NO3: 0.1, NO2: 0.003, PO4: 0.1, date: '5 agosto' },
  { MG: 1260, NO3: 0.1, NO2: 0.002, KH: 8, PO4: 0.1, CA: 380, date: '12 agosto' },
  { KH: 7.5, NO3: 0.1, NO2: 0.002, CA: 410, MG: 1290, PO4: 0.08, date: '19 agosto' },
  { NO3: 0.1, NO2: 0.003, PO4: 0.06, MG: 1260, KH: 7.5, CA: 370, date: '26 agosto' },
  { NO3: 0.05, NO2: 0.002, PO4: 0.08, KH: 8, MG: 1290, CA: 360, date: '2 settembre' },
  { NO3: 0.05, NO2: 0.003, PO4: 0.05, KH: 7.5, MG: 1320, CA: 350, date: '9 settembre' },
  { KH: 7.5, MG: 1280, CA: 430, NO2: 0.002, NO3: 0.2, PO4: 0.06, date: '16 settembre' },
  { NO2: 0.01, NO3: 0.3, PO4: 0.03, KH: 7.5, MG: 1290, CA: 380, date: '23 settembre' },
  { NO2: 0.02, NO3: 0.4, PO4: 0.05, KH: 8, CA: 390,MG: 1410, date: '30 settembre' },
  { NO2: 0.003, NO3: 0.2, PO4: 0.02, KH: 7.5, MG: 1260, CA: 430, date: '7 ottobre' },
  { NO2: 0.005, NO3: 0.3, PO4: 0.01, KH: 7.5, MG: 1320, CA: 390, date: '14 ottobre' },
  { NO2: 0.01, NO3: 0.2, PO4: 0.02, KH: 7.5, MG: 1320, CA: 380, date: '21 ottobre' },
  { NO2: 0.02, NO3: 0.05, PO4: 0.03, KH: 7, CA: 380, MG: 1350, date: '28 ottobre' },
  { NO2: 0.02, NO3: 0.05, PO4: 0.02, KH: 7.5, CA: 390, MG: 1320, date: '4 novembre' },
  { NO2: 0.02, NO3: 0, PO4: 0.05, KH: 8.5, CA: 390, MG: 1230, date: '11 novembre' },
  { NO2: 0.003, NO3: 0.2, PO4: 0.03, KH: 8.5, CA: 410, MG: 1350, date: '18 novembre' },
  { NO2: 0.005, NO3: 5, PO4: 0.07, KH: 8.5, CA: 400, MG: 1350, date: '25 novembre' },
  { NO2: 0.02, NO3: 5, PO4: 0.06, KH: 7.5, CA: 410, MG: 1430, date: '2 dicembre' },
  { NO2: 0.01, NO3: 4, PO4: 0.02, KH: 8, CA: 410, MG: 1380, date: '9 dicembre' }
];

const labels = testsData.map(obj => obj.date);

const colors = {
  KH: { r: 255, g: 0, b: 0 },
  CA: { r: 255, g: 153, b: 0 },
  MG: { r: 255, g: 230, b: 0 },
  NO2: { r: 0, g: 255, b: 0 },
  NO3: { r: 53, g: 162, b: 235 },
  PO4: { r: 0, g: 0, b: 255 },
};


const App = () => {
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        fill: true,
        label: 'KH',
        data: testsData.map(obj => obj["KH"]),
        borderColor: 'rgb(255, 0, 0)',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
      },
    ],
  });

  const [title, setTitle] = useState("KH");


  const changeChartInfo = (type) => {
    if (type === "none") return;
    var color = colors[type];
    setTitle(type);
    setData({
        labels,
        datasets: [
          {
            fill: true,
            label: type,
            data: testsData.map(obj => obj[type]),
            borderColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
            backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`,
          },
        ],
    });
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
              <Button icon="chemical" handleClick={changeChartInfo} type = "KH" text="KH" />
              <Button icon="chemical" handleClick={changeChartInfo} type = "CA" text="Ca" />
              <Button icon="chemical" handleClick={changeChartInfo} type = "MG" text="Mg" />
              <Button icon="chemical" handleClick={changeChartInfo} type = "NO2" text="NO2" />
              <Button icon="chemical" handleClick={changeChartInfo} type = "NO3" text="NO3" />
              <Button icon="chemical" handleClick={changeChartInfo} type = "PO4" text="PO4" />
          </div>

          <div className={appStyle.chart_container}>
            <Chart data={data} setData={setData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
