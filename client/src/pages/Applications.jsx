
// import { useEffect , useState } from "react";
// import API from "../api/axios";
// import { Trash2 } from "lucide-react";

// export default function Applications() {
//   const [jobs, setJobs] = useState([]);
//   const [ search, setSearch ] = useState("");
//   const [ statusFilter, setStatusFilter ] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   // pagination variablle
//   const [page , setPage] = useState(1);
//   const [totalpages , setTotalPages] = useState(1);

//    const [deleteId, setDeleteId] = useState(null)

//   const normalizeJobs = (payload) => {
//     if (Array.isArray(payload)) return payload;
//     if (Array.isArray(payload?.jobs)) return payload.jobs;
//     return [];
//   };

//   const fetchJobs = async () => {
//     try {
//       const { data } = await API.get('/jobs', {
//         params: { page, limit: 5 },
//       });
//       setJobs(normalizeJobs(data));
//       setTotalPages(data?.totalPages ?? 1);
//       setErrorMessage("");
//     } catch (error) {
//       console.error("Failed to fetch jobs:", error?.response?.data || error.message);
//       setJobs([]);
//       setTotalPages(1);
//       setErrorMessage("Unable to load jobs. Make sure backend server is running on port 5000.");
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, [page]);

//   const confirmDelete = async () => {
//     if (!deleteId) return;
//     try {
//       await API.delete(`/jobs/${deleteId}`);
//       setDeleteId(null);
//       fetchJobs();
//     } catch (error) {
//       console.error(error);
//       setErrorMessage("Unable to delete this job right now.");
//     }
//   };
  
//   const updateStatus = async (id, status ) => {
//     try {
//       await API.patch(`/jobs/${id}`, { status });
//       fetchJobs();
//     } catch (error) {
//       console.error(error);
//       setErrorMessage("Unable to update job status right now.");
//     }
//   };

//   const safeJobs = Array.isArray(jobs) ? jobs : [];
//   const filteredJobs = safeJobs.filter((job) => {
//     const companyName = (job?.company || "").toLowerCase();
//     const matchesSearch = companyName.includes(search.toLowerCase());
//     const matchesStatus = statusFilter ? job?.status === statusFilter : true;
//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
//       <div className="max-w-7xl mx-auto">

//         <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
//           Applications
//         </h1>

//         {errorMessage && (
//           <p className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-700 dark:bg-red-950 dark:text-red-300">
//             {errorMessage}
//           </p>
//         )}

//         {/* Search + Filter */}
//         <div className="flex gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Search by company..."
//             className="px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <select
//             className="px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white"
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value="">All Status</option>
//             <option value="Interview">Interview</option>
//             <option value="Pending">Pending</option>
//             <option value="Rejected">Rejected</option>
//           </select>
//         </div>

//         {/* Table */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">
//               <tr>
//                 <th className="p-4">Company</th>
//                 <th className="p-4">Position</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredJobs.map((job) => (
//                 <tr
//                   key={job._id}
//                   className="border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
//                 >
//                   <td className="p-4">{job.company}</td>
//                   <td className="p-4">{job.position}</td>

//                   <td className="p-4">
//                     <select
//                       value={job.status}
//                       onChange={(e) =>
//                         updateStatus(job._id, e.target.value)
//                       }
//                       className="px-3 py-1 rounded-lg dark:bg-gray-900"
//                     >
//                       <option value="Interview">Interview</option>
//                       <option value="Pending">Pending</option>
//                       <option value="Rejected">Rejected</option>
//                     </select>
//                   </td>

//                   <td className="p-4">
//                     <button
//                       onClick={() => setDeleteId(job._id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//               {filteredJobs.length === 0 && (
//                 <tr>
//                   <td colSpan="4" className="p-6 text-center text-gray-500">
//                     No applications found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {deleteId && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="w-96 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
//               <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
//                 Delete Application
//               </h2>

//               <p className="mt-2 text-gray-500">
//                 Are you sure you want to delete this application?
//               </p>

//               <div className="mt-6 flex justify-end gap-4">
//                 <button
//                   onClick={() => setDeleteId(null)}
//                   className="rounded bg-gray-300 px-4 py-2"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={confirmDelete}
//                   className="rounded bg-red-500 px-4 py-2 text-white"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import API from "../api/axios";
import { Trash2 } from "lucide-react";

export default function Applications() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Delete Modal
  const [deleteId, setDeleteId] = useState(null);

  // Normalize API response
  const normalizeJobs = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.jobs)) return payload.jobs;
    return [];
  };

  // Fetch Jobs
  const fetchJobs = async () => {
    try {
      const { data } = await API.get("/jobs", {
        params: {
          page,
          limit: 5,
        },
      });

      setJobs(normalizeJobs(data));
      setTotalPages(data?.totalPages ?? 1);

      setErrorMessage("");
    } catch (error) {
      console.error(
        "Failed to fetch jobs:",
        error?.response?.data || error.message
      );

      setJobs([]);
      setTotalPages(1);

      setErrorMessage(
        "Unable to load jobs. Make sure backend server is running on port 5000."
      );
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  // Delete Job
  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await API.delete(`/jobs/${deleteId}`);

      setDeleteId(null);

      fetchJobs();
    } catch (error) {
      console.error(error);

      setErrorMessage(
        "Unable to delete this job right now."
      );
    }
  };

  // Update Status
  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/jobs/${id}`, {
        status,
      });

      fetchJobs();

      setErrorMessage("");
    } catch (error) {
      console.error(
        error?.response?.data || error.message
      );

      setErrorMessage(
        "Unable to update job status right now."
      );
    }
  };

  // Safe jobs array
  const safeJobs = Array.isArray(jobs) ? jobs : [];

  // Search + Filter
  const filteredJobs = safeJobs.filter((job) => {
    const companyName = (
      job?.company || ""
    ).toLowerCase();

    const matchesSearch =
      companyName.includes(search.toLowerCase());

    const matchesStatus = statusFilter
      ? job?.status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Applications
        </h1>

        {/* Error Message */}
        {errorMessage && (
          <p className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-700 dark:bg-red-950 dark:text-red-300">
            {errorMessage}
          </p>
        )}

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          
          <input
            type="text"
            placeholder="Search by company..."
            className="px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            className="px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="">All Status</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Hired">Hired</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
          
          <table className="w-full text-left">
            
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">
              <tr>
                <th className="p-4">Company</th>
                <th className="p-4">Position</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredJobs.map((job) => (
                <tr
                  key={job._id}
                  className="border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {/* Company */}
                  <td className="p-4">
                    {job.company}
                  </td>

                  {/* Position */}
                  <td className="p-4">
                    {job.position}
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <select
                      value={job.status}
                      onChange={(e) =>
                        updateStatus(
                          job._id,
                          e.target.value
                        )
                      }
                      className="px-3 py-1 rounded-lg border dark:bg-gray-900 dark:text-white"
                    >
                      <option value="Applied">
                        Applied
                      </option>

                      <option value="Interview">
                        Interview
                      </option>

                      <option value="Rejected">
                        Rejected
                      </option>

                      <option value="Hired">
                        Hired
                      </option>
                    </select>
                  </td>

                  {/* Delete */}
                  <td className="p-4">
                    <button
                      onClick={() =>
                        setDeleteId(job._id)
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}

              {/* Empty State */}
              {filteredJobs.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="p-6 text-center text-gray-500"
                  >
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-6">
          
          <button
            disabled={page === 1}
            onClick={() =>
              setPage((prev) => prev - 1)
            }
            className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-gray-400"
          >
            Prev
          </button>

          <span className="text-gray-700 dark:text-white">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() =>
              setPage((prev) => prev + 1)
            }
            className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-gray-400"
          >
            Next
          </button>
        </div>

        {/* Delete Modal */}
        {deleteId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            
            <div className="w-96 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
              
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Delete Application
              </h2>

              <p className="mt-2 text-gray-500">
                Are you sure you want to delete this application?
              </p>

              <div className="mt-6 flex justify-end gap-4">
                
                <button
                  onClick={() =>
                    setDeleteId(null)
                  }
                  className="rounded bg-gray-300 px-4 py-2"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="rounded bg-red-500 px-4 py-2 text-white"
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}