import React from 'react';
import { Box } from '@mui/system';
import { Alert, Paper } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { IncreaseStat } from '../../../../AuxiliaryFunctions/AuxiliaryFunctions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type GraphStatPropsType = {
  title: string;
  color: string;
  dataForGraph: {
    [key: string]: string;
  } | null;
  isFetching: boolean;
}



const GraphStat:React.FC<GraphStatPropsType> = ({title, color, dataForGraph, isFetching}) => {
  let labels = ['0'];
  let dataGr = ['0'];
  if (dataForGraph) {
    labels = Object.keys(dataForGraph).map((item) => {
        const reverseArr = item.split('.').reverse();
        reverseArr[1] = reverseArr[1].length === 1 ? `0${reverseArr[1]}` : reverseArr[1];
        reverseArr[0] = reverseArr[0].length === 1 ? `0${reverseArr[0]}` : reverseArr[0];
        return reverseArr.join('.');
    });
    dataGr = Object.values(dataForGraph)
    if (title === 'Increase learned words') {
      dataGr = IncreaseStat(dataGr);
    }
  }

  const options = {
    
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        display: false
    },
    }
  };
  
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataGr,
        borderColor: color,
        tension: 0.3,
      }
    ],
  };

  return (
    <Box component={Paper}>
      {dataGr.length < 2  && !isFetching && <Alert severity="info">Not enough data to display</Alert>}
      <Line data={data} options={options}/>
    </Box>
  )
}

export default GraphStat