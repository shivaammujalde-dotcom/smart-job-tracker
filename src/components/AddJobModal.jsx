import { useState } from "react";

function AddJobModal({ addJob }) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");

  return (
    <div className="bg-black p-6 rounded-xl shadow mb-6">
      <h2 className="text-lg font-bold mb-4">Add New Job</h2>

      <input
        className="border p-2 mr-2"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        className="border p-2 mr-2"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />

      <button
        onClick={() => addJob(company, position)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
  );
}

export default AddJobModal;