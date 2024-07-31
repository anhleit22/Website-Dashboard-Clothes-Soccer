import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Thống Kê Trông Tuần',
    },
  },
};

const labels = [
  'Thứ Hai',
  'Thứ Ba',
  'Thứ Tư',
  'Thứ Năm',
  'Thứ Sáu',
  'Thứ Bảy',
  'Chủ Nhật',
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Số Quần Áo Bán',
      data: [1, 2, 234, 234, 234, 234],
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
    {
      label: 'Tổng Tiền',
      data: [1, 2, 234, 234, 234, 234],
      backgroundColor: 'rgba(53, 162, 235, 0.7)',
    },
  ],
};

const BarChartProduction = () => {
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChartProduction;
