import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graph = ({ studentData }) => {
  if (!studentData || studentData.length === 0) {
    return <p>No student data available.</p>;
  }

  
  const yearCounts = studentData.reduce((acc, student) => {
    acc[student.year] = (acc[student.year] || 0) + 1;
    return acc;
  }, {});

  const years = Object.keys(yearCounts);
  const counts = Object.values(yearCounts);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Number of Students',
        data: counts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-gray-800 min-h-screen w-full py-10 rounded-md shadow-md shadow-slate-500">
      <div className="w-[80%] m-auto bg-gray-900 shadow-lg p-8 rounded-xl">
        <h1 className="font-semibold mt-2 text-4xl text-yellow-700 text-center mb-8">Student Data by Year</h1>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Graph;
