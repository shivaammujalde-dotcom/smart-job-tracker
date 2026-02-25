function StatsCards({ jobs }) {
  const total = jobs.length;
  const applied = jobs.filter(j => j.status === "Applied").length;
  const interview = jobs.filter(j => j.status === "Interview").length;
  const offer = jobs.filter(j => j.status === "Offer").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card title="Total" value={total} />
      <Card title="Applied" value={applied} color="bg-yellow-100" />
      <Card title="Interview" value={interview} color="bg-blue-100" />
      <Card title="Offer" value={offer} color="bg-green-100" />
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className={`${color || "bg-white"} p-4 rounded-xl shadow`}>
      <h2 className="text-gray-600">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default StatsCards;