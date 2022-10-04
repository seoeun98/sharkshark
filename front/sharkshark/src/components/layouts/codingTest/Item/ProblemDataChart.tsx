import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
);

const ProblemDataChart = (props: { problem: any; userInfo: any }) => {
  const { problem, userInfo } = props;
  const labels = new Array(problem.length).fill('');
  console.log(labels);

  let memoryData = [];
  let timeData = [];

  for (let problemData of problem) {
    memoryData.push(problemData.memory);
    timeData.push(problemData.time);
  }

  const options = {
    // 옵션 (1)
    responsive: true,
    legend: {
      display: false,
    },
    layout: {
      padding: {
        top: 20,
      },
    },
    scaleShowLabelBackdrop: true,
    showAllTooltips: true,
    tooltips: {
      displayColors: false,
      filter: function (
        tooltipItem: { index: string | number },
        data: { datasets: { backgroundColor: { [x: string]: any } }[] },
      ) {
        let backgroundColor = data.datasets[0].backgroundColor[tooltipItem.index];
        if (backgroundColor === 'rgba(118,184,231,0.6)') {
          return true;
        } else {
          return false;
        }
      },
    },

    // 옵션 (2)
    interaction: {
      mode: 'index' as const,
      intersect: true,
    },
    // 옵션 (3)
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.3)',
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Rival',
        data: memoryData,
        backgroundColor: 'rgba(157, 236, 249, 0.5)',
        borderColor: 'white',
        borderWidth: 1,
      },
      {
        type: 'line' as const,
        label: 'Rival',
        data: memoryData,
        borderColor: 'white',
        borderWidth: 1,
        fill: false,
        backgroundColor: 'rgba(157, 236, 249, 0.5)',
      },
    ],
  };

  return <Chart type="bar" options={options} data={data} />;
};

export default ProblemDataChart;
