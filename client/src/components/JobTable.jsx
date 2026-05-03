function JobTable({ jobs = [], deleteJob = () => {} }) {
  return (
    <div className="mt-6 overflow-hidden rounded-xl bg-black shadow">
      <table className="w-full text-left text-white">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-3">Company</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td className="p-3 text-slate-300" colSpan={4}>No applications found.</td>
            </tr>
          ) : (
            jobs.map((job) => (
              <tr key={job._id} className="border-b border-slate-800">
                <td className="p-3">{job.company}</td>
                <td className="p-3">{job.role || job.position}</td>
                <td className="p-3">
                  <span className="rounded bg-gray-500 px-2 py-1 text-sm">{job.status}</span>
                </td>
                <td className="p-3">
                  <button onClick={() => deleteJob(job._id)} className="text-red-400 hover:text-red-300">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default JobTable;
