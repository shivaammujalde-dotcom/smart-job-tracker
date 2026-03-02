import { useEffect, useState } from 'react';
import { jobsApi } from '../api';
import { useAuth } from '../context/AuthContext';
import JobTable from '../components/JobTable';

export default function Applications() {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    let ignore = false;

    jobsApi
      .getAll({}, token)
      .then((res) => {
        if (!ignore) {
          setJobs(res.jobs || []);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      ignore = true;
    };
  }, [token]);

  const deleteJob = async (id) => {
    await jobsApi.remove(id, token);
    const res = await jobsApi.getAll({}, token);
    setJobs(res.jobs || []);
  };

  return (
    <main className="min-h-screen">
      <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">Applications</h1>
      <JobTable jobs={jobs} deleteJob={deleteJob} />
    </main>
  );
}
