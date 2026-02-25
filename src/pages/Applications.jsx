import { useEffect, useState } from 'react';
import { jobsApi } from '../api';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import JobTable from '../components/JobTable';

export default function Applications() {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await jobsApi.getAll({}, token);
    setJobs(res.jobs || []);
  };

  useEffect(() => {
    fetchJobs();
  }, [token]);

  const deleteJob = async (id) => {
    await jobsApi.remove(id, token);
    fetchJobs();
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="min-h-screen flex-1 bg-gray-100 p-6">
        <h1 className="mb-4 text-2xl font-bold text-slate-900">Applications</h1>
        <JobTable jobs={jobs} deleteJob={deleteJob} />
      </main>
    </div>
  );
}
