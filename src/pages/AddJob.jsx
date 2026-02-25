import { useState } from 'react';
import { jobsApi } from '../api';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

export default function AddJob() {
  const { token } = useAuth();
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Applied');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await jobsApi.create({ company, role, status }, token);
    setCompany('');
    setRole('');
    setStatus('Applied');
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="min-h-screen flex-1 bg-gray-100 p-6">
        <h1 className="mb-4 text-2xl font-bold text-slate-900">Add Job</h1>
        <form onSubmit={handleSubmit} className="max-w-xl space-y-3 rounded-xl bg-white p-5 shadow">
          <input className="w-full rounded border p-2" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} required />
          <input className="w-full rounded border p-2" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} required />
          <select className="w-full rounded border p-2" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Applied</option>
            <option>Interviewing</option>
            <option>Offered</option>
            <option>Rejected</option>
          </select>
          <button className="rounded bg-blue-600 px-4 py-2 text-white">Save</button>
        </form>
      </main>
    </div>
  );
}
