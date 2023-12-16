import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend,} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title, Tooltip,Filler,Legend);

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

export default function Chart({data, setData}) {
  
  return <Line options={options} data={data} />;
}