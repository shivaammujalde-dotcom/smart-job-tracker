import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Analytics() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await API.get("/jobs");

      setJobs(data.jobs || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Status Data
  const statusData = [
    {
      name: "Applied",
      value: jobs.filter(
        (job) => job.status === "Applied"
      ).length,
    },
    {
      name: "Interview",
      value: jobs.filter(
        (job) => job.status === "Interview"
      ).length,
    },
    {
      name: "Rejected",
      value: jobs.filter(
        (job) => job.status === "Rejected"
      ).length,
    },
    {
      name: "Hired",
      value: jobs.filter(
        (job) => job.status === "Hired"
      ).length,
    },
  ];

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#EF4444",
    "#F59E0B",
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">

      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">

          <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
            Application Status
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                outerRadius={110}
                label
              >
                {statusData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[index % COLORS.length]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">

          <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
            Job Status Overview
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="value"
                fill="#3B82F6"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}