import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";
import { jobsApi } from "../api";
import { useAuth } from "../context/AuthContext";

import {
  Briefcase,
  CheckCircle,
  Trophy,
  XCircle,
} from "lucide-react";

export default function Dashboard() {
  const { token } = useAuth();

  const [jobs, setJobs] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    interviews: 0,
    hired: 0,
    rejected: 0,
  });

  // Active Filter
  const [activeFilter, setActiveFilter] =
    useState("All");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await jobsApi.getAll({}, token);

        const jobsData = data?.jobs || [];

        setJobs(jobsData);

        setStats({
          total: jobsData.length,

          interviews: jobsData.filter(
            (job) =>
              job.status === "Interview"
          ).length,

          hired: jobsData.filter(
            (job) => job.status === "Hired"
          ).length,

          rejected: jobsData.filter(
            (job) =>
              job.status === "Rejected"
          ).length,
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchStats();
    }
  }, [token]);

  // Filter Jobs
  const filteredJobs =
    activeFilter === "All"
      ? jobs
      : jobs.filter(
          (job) =>
            job.status === activeFilter
        );

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Total */}
        <div
          onClick={() =>
            setActiveFilter("All")
          }
          className="cursor-pointer"
        >
          <StatsCard
            title="Total Applications"
            value={stats.total}
            icon={
              <Briefcase
                size={24}
                className="text-white"
              />
            }
            color="bg-blue-500"
          />
        </div>

        {/* Interview */}
        <div
          onClick={() =>
            setActiveFilter("Interview")
          }
          className="cursor-pointer"
        >
          <StatsCard
            title="Interviews"
            value={stats.interviews}
            icon={
              <CheckCircle
                size={24}
                className="text-white"
              />
            }
            color="bg-green-500"
          />
        </div>

        {/* Hired */}
        <div
          onClick={() =>
            setActiveFilter("Hired")
          }
          className="cursor-pointer"
        >
          <StatsCard
            title="Hired"
            value={stats.hired}
            icon={
              <Trophy
                size={24}
                className="text-white"
              />
            }
            color="bg-yellow-500"
          />
        </div>

        {/* Rejected */}
        <div
          onClick={() =>
            setActiveFilter("Rejected")
          }
          className="cursor-pointer"
        >
          <StatsCard
            title="Rejected"
            value={stats.rejected}
            icon={
              <XCircle
                size={24}
                className="text-white"
              />
            }
            color="bg-red-500"
          />
        </div>
      </div>

      {/* Jobs List */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          {activeFilter} Jobs
        </h2>

        {filteredJobs.length === 0 ? (
          <p className="text-gray-500">
            No jobs found
          </p>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="border rounded-lg p-4 dark:border-gray-700"
              >
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                  {job.company}
                </h3>

                <p className="text-gray-600 dark:text-gray-300">
                  {job.position}
                </p>

                <span className="inline-block mt-2 px-3 py-1 rounded-full text-sm bg-gray-200 dark:bg-gray-700 dark:text-white">
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}