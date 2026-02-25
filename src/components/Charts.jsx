export default function Charts({ jobs = [] }) {
  const statusCount = jobs.reduce(
    (acc, job) => {
      const key = job.status || 'Applied';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {},
  );

  return (
    <section className="rounded-xl border border-white/10 bg-slate-900/50 p-4 text-slate-200 shadow">
      <h3 className="text-lg font-semibold">Status Snapshot</h3>
      <div className="mt-3 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
        {Object.entries(statusCount).length === 0 ? (
          <p className="text-slate-400">No data yet.</p>
        ) : (
          Object.entries(statusCount).map(([status, count]) => (
            <div key={status} className="rounded-lg bg-slate-800/70 p-3">
              <p className="text-slate-400">{status}</p>
              <p className="mt-1 text-xl font-bold">{count}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
