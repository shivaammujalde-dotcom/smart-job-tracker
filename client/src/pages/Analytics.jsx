import React from 'react'
import { useEffect, useState } from "react";
import API from '../api/axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

// ✅ Register correctly
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);



export default function Analytics() {

    const [data , setData] = useState({
        Interview:0,
        Pending:0,
        Rejected:0
    });

    useEffect(() =>{
        const fetchAnalytics = async () =>{
            const res = await API.get("./jobs/analytics");
            setData(res.data);
        };
        fetchAnalytics();
    },[])

   const pieData = {
  labels: ["Interview", "Pending", "Rejected"],
  datasets: [
    {
      data: [data.Interview, data.Pending, data.Rejected],
      backgroundColor: ["#22c55e", "#eab308", "#ef4444"]
    }
  ]
};
  const barData = {
  labels: ["Interview", "Pending", "Rejected"],
  datasets: [
    {
      label: "Applications",
      data: [data.Interview, data.Pending, data.Rejected],
      backgroundColor: ["#22c55e", "#eab308", "#ef4444"]
    }
  ]
};


  return (
    
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
          Analytics
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="mb-4 text-gray-700 dark:text-white">
              Applications by Status
            </h2>
            <Pie data={pieData} />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="mb-4 text-gray-700 dark:text-white">
              Applications Overview
            </h2>
            <Bar data={barData} />
          </div>

        </div>

      </div>

    </div>
    </>
  )
}
