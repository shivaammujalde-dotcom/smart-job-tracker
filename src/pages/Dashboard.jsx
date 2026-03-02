import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";
import { jobsApi } from "../api";
import { useAuth } from "../context/AuthContext";
import { Briefcase, CheckCircle, Clock, XCircle } from "lucide-react";

export default function Dashboard() {
  const { token } = useAuth();

  const [stats, setStats] = useState({
    total: 0,
    interviews: 0,
    pending: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await jobsApi.getAll({}, token);
        const jobs = data?.jobs || [];

        setStats({
          total: jobs.length,
          interviews: jobs.filter((job) => job.status === "Interviewing").length,
          pending: jobs.filter((job) => job.status === "Applied").length,
          rejected: jobs.filter((job) => job.status === "Rejected").length,
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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

      <StatsCard
        title="Total Applications"
        value={stats.total}
        icon={<Briefcase size={24} className="text-white" />}
        color="bg-blue-500"
      />

      <StatsCard
        title="Interviews"
        value={stats.interviews}
        icon={<CheckCircle size={24} className="text-white" />}
        color="bg-green-500"
      />

      <StatsCard
        title="Pending"
        value={stats.pending}
        icon={<Clock size={24} className="text-white" />}
        color="bg-yellow-500"
      />

      <StatsCard
        title="Rejected"
        value={stats.rejected}
        icon={<XCircle size={24} className="text-white" />}
        color="bg-red-500"
      />

    </div>
  );
}
