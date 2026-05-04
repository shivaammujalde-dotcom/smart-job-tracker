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

  const [stats, setStats] = useState({
    total: 0,
    interviews: 0,
    hired: 0,
    rejected: 0,
  });

  const [recentJobs, setRecentJobs] =
    useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data =
          await jobsApi.getAll(
            {},
            token
          );

        const jobs =
          data?.jobs || [];

        setRecentJobs(
          jobs.slice(0, 5)
        );

        setStats({
          total: jobs.length,

          interviews:
            jobs.filter(
              (job) =>
                job.status ===
                "Interview"
            ).length,

          hired: jobs.filter(
            (job) =>
              job.status ===
              "Hired"
          ).length,

          rejected:
            jobs.filter(
              (job) =>
                job.status ===
                "Rejected"
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

  return (
    <div className="space-y-8">

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

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

      {/* Recent Applications */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Recent Applications
          </h2>
        </div>

        {recentJobs.length === 0 ? (
          <p className="text-gray-500">
            No applications yet
          </p>
        ) : (
          <div className="space-y-4">

            {recentJobs.map((job) => (
              <div
                key={job._id}
                className="flex items-center justify-between border-b dark:border-gray-700 pb-4"
              >

                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {job.company}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {job.position}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    job.status ===
                    "Hired"
                      ? "bg-green-100 text-green-700"
                      : job.status ===
                        "Rejected"
                      ? "bg-red-100 text-red-700"
                      : job.status ===
                        "Interview"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
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