import React, {useRef} from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend, defaults} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title, Tooltip,Filler,Legend);


const monthsLabel = {
  gennaio: 0,
  febbraio: 1,
  marzo: 2,
  aprile: 3,
  maggio: 4,
  giugno: 5,
  luglio: 6,
  agosto: 7,
  settembre: 8,
  ottobre: 9,
  novembre: 10,
  dicembre: 11,
};

function sortData(dates, values) {
  var list = [];
  for (var j = 0; j < dates.length; j++) {
    list.push({'date': dates[j], 'value': values[j]});
  }

  list.sort((a, b) => {
    a = a.date;
    b = b.date;
    a = a.split(" ");
    b = b.split(" ");

    a[1] = monthsLabel[a[1]];
    b[1] = monthsLabel[b[1]];

    if (a[1] === b[1]) {
      return a[0] > b[0] ? 1 :  -1;
    } else {
      return a[1] > b[1] ? 1 :  -1;
    }

  });

  for (var k = 0; k < list.length; k++) {
    dates[k] = list[k].date;
    values[k] = list[k].value;
  }

  return [dates, values];
}

const scaleSettings = {
  "KH": { min: -.5, max : .5},
  "CA": { min: -30, max : 20},
  "MG": { min: -100, max : 20},
  "NO2": { min: 0, max : 0.001},
  "NO3": { min: 0, max: .5},
  "PO4": { min: 0, max : 0.03}
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
        display: false,
    },
    title: {
      display: false,
    },
  },
};

export default function Chart({data}) {


  const windowSize = useRef(window.innerWidth).current;
  if (windowSize <= 600) {
    defaults.font.size = 10;
  }


  const [sorted_labels, sorted_values] = sortData(data.labels, data.datasets[0].data);
  data.labels = sorted_labels;
  data.datasets[0].data = sorted_values;
  
  const min = Math.min(...sorted_values);
  const max = Math.max(...sorted_values);
  
  var newMin = scaleSettings[data.datasets[0].label].min === 0 ? 0 : scaleSettings[data.datasets[0].label].min + min;
  var newMax = scaleSettings[data.datasets[0].label].max + max;
  
  options.scales = {
    y: {
      min: newMin,
      max: newMax,
    }, 
    x: {},
  }
  


  return <Line options={options}  data={data}  redraw={true}/>;
}