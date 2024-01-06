import React, { useRef, useState } from "react";
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Filler,Legend,defaults} from "chart.js";
import { Line } from "react-chartjs-2";
import Zoom from 'chartjs-plugin-zoom';
import 'hammerjs';
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Filler,Legend, Zoom);

const scaleSettings = {
  KH: { min: -0.5, max: 0.5 },
  CA: { min: -30, max: 20 },
  MG: { min: -100, max: 20 },
  NO2: { min: 0, max: 0.001 },
  NO3: { min: 0, max: 0.5 },
  PO4: { min: 0, max: 0.03 },
};

const ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    zoom: {
      zoom: {
        wheel: {
          enabled: true,
          speed: 0.1
        },
        drag: {
          enabled: false
        },
        pinch: { enabled: true },
        mode: "x",
      },
      pan : {
        enabled: true,
        mode: "x"
      },
    }
  },
};

function sortData(dates, values, rawData) {
  var list = [];
  for (var j = 0; j < dates.length; j++) { // merge the two parameters
    list.push({ date: dates[j], value: values[j] });
  }

  list.sort((a, b) => { // sort by date
    var indexA = list.indexOf(a);
    var indexB = list.indexOf(b);

    const timestampA = new Date(rawData[indexA].__createdtime__).getTime();
    const timestampB = new Date(rawData[indexB].__createdtime__).getTime();
    return timestampB < timestampA ? -1 : timestampB > timestampA ? 1 : 0;
  });

  return [list.map((item) => item.date), list.map((item) => item.value)]; // devide dates and values
}

function sortRawData(data) {
  const list = data;
  list.sort((a, b) => {
    return a.__createdtime__ - b.__createdtime__;
  });

  return list; // devide dates and values
}

defaults.interaction = {
  mode: 'index',
  intersect: false
}

const Chart = ({ data, rawData }) => {
  const windowSize = useRef(window.innerWidth).current;
  const chartRef = useRef(null);
  if (windowSize <= 600) defaults.font.size = 10;
  
  const [sorted_labels, sorted_values] = sortData(
    data.labels,
    data.datasets[0].data,
    rawData
    );
    data.labels = sorted_labels;
    data.datasets[0].data = sorted_values;
    
    rawData = sortRawData(rawData); // syncronizes rawdata with the sorted data of the chart
    const scale = scaleSettings[data.datasets[0].label];
    const scaleMinValue = scale.min === 0 ? 0 : scale.min + Math.min(...sorted_values);
    const scaleMaxValue = scale.max + Math.max(...sorted_values);
    
    ChartOptions.scales = {
      y: {
        min: scaleMinValue,
        max: scaleMaxValue,
      },
    };
    
  const [range] = useState({min: 0, max: sorted_labels.length-1});

  function SetZoom(key) {
    const chart = chartRef.current;
    const maxLength = sorted_labels.length-1;
    const lastMonths = sorted_labels.filter(month => month.split(" ")[1] === sorted_labels[maxLength].split(" ")[1]);
    const lastYear = new Date(rawData[maxLength].__createdtime__).getFullYear();
    var currentYearElements = -1;
    rawData.forEach(value => {
      const year = new Date(value.__createdtime__).getFullYear();
      if (year === lastYear) currentYearElements++;
    });

    var newRange = {min: 0, max: sorted_labels.length-1};

    switch (key) {
      case 'month': 
        newRange = {min: maxLength-lastMonths.length, max: maxLength};
        chart.zoomScale('x', newRange, 'default');
        break;
      case 'year':
        newRange = {min: maxLength-currentYearElements, max: maxLength};
        chart.zoomScale('x', newRange, 'default');
        break;
      default:
        chart.resetZoom('default');
        break;
    }

    range.min = newRange.min;
    range.max = newRange.max;
  }

  function calculateRange(position) {
    const RangeDistance = Math.floor((range.max - range.min) / 2);
    var newRange = { min: 0, max: sorted_labels.length-1}; 

    if (position-RangeDistance <= 0) newRange.max=RangeDistance*2+1;
    else if (position+RangeDistance >= sorted_labels.length-1) newRange.min= (sorted_labels.length-1)-(RangeDistance*2)-1;
    else {
      newRange.max= position+RangeDistance;
      newRange.min= position-RangeDistance-1;
    }
    
    return newRange;
  }

  function changePosition(e) {
    const position = parseInt(e.target.value);
    const newRange = calculateRange(position);

    chartRef.current.zoomScale('x', newRange, 'default');
    range.min = newRange.min;
    range.max = newRange.max;
  }

  return (
    <>
      <Line id="myChart" ref={chartRef} options={ChartOptions} data={data} redraw={true} />
      <div style={{position:"absolute", display: "flex"}}>
        <button onClick={() => {SetZoom()}}>RESET</button>
        <button onClick={() => {SetZoom('month')}}>MESE</button>
        <button onClick={() => {SetZoom('year')}}>ANNO</button>
        <input min={0} step={1} max={sorted_labels.length-1} defaultValue={sorted_labels.length-1} onChange={(e) => {changePosition(e)}} type="range" name="position" id="position" />
      </div>

    </>
  );
}


export default Chart;
