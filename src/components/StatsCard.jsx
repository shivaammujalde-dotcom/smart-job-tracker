function StatsCard({ jobs = [] }) {
  const total = jobs.length;
  const applied = jobs.filter((j) => j.status === 'Applied').length;
  const interviewing = jobs.filter((j) => j.status === 'Interviewing' || j.status === 'Interview').length;
  const offered = jobs.filter((j) => j.status === 'Offered' || j.status === 'Offer').length;

  const cards = [
    { title: 'Total', value: total, tone: 'bg-slate-800 text-white' },
    { title: 'Applied', value: applied, tone: 'bg-cyan-900/40 text-cyan-100' },
    { title: 'Interviewing', value: interviewing, tone: 'bg-amber-900/40 text-amber-100' },
    { title: 'Offered', value: offered, tone: 'bg-emerald-900/40 text-emerald-100' },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
      {cards.map((card) => (
        <article key={card.title} className={`rounded-xl p-4 shadow ${card.tone}`}>
          <p className="text-sm opacity-80">{card.title}</p>
          <p className="mt-2 text-2xl font-bold">{card.value}</p>
        </article>
      ))}
    </div>
  );
}

export default StatsCard;
