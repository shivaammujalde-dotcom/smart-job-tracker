const STATUS_STYLES = {
  Applied: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/30',
  Interviewing: 'bg-amber-500/20 text-amber-200 border-amber-400/30',
  Offered: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30',
  Rejected: 'bg-rose-500/20 text-rose-200 border-rose-400/30',
};

function formatDate(value) {
  if (!value) return 'Unknown date';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown date';

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function JobCard({ job, onEdit, onDelete }) {
  return (
    <article className="panel-card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{job.role}</h3>
          <p className="mt-1 text-sm text-slate-300">{job.company}</p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_STYLES[job.status] || STATUS_STYLES.Applied}`}>
          {job.status}
        </span>
      </div>

      {job.notes ? <p className="mt-4 text-sm leading-6 text-slate-300">{job.notes}</p> : null}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Added {formatDate(job.createdAt)}</p>
        <div className="flex items-center gap-2">
          <button type="button" className="btn-muted" onClick={() => onEdit(job)}>
            Edit
          </button>
          <button type="button" className="btn-danger" onClick={() => onDelete(job._id)}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
