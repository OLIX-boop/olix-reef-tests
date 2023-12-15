import React from 'react';
import Chart from './components/chart.js';
import appStyle from './app.module.css';

const App = () => {

    return (<>
    <h1>KH</h1>

      <div className={appStyle.mainContainer}>
        <div className={appStyle.buttonsContainer}>
          <h1>APPS</h1>
        </div>

        <div className={appStyle.chart_container}>
          <Chart />
        </div>
      </div>


    </>);
};

export default App;