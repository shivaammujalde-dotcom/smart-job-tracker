import { useEffect, useState } from "react";
import API from "../api/axios";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import SkeletonCard from "../components/SkeletonCard";
import EmptyState from "../components/EmptyState";
import { CSVLink } from "react-csv";

export default function Applications() {
  const normalizeStatus = (status) => {
    if (status === "Interviewing") return "Interview";
    if (status === "Offered") return "Hired";
    return status;
  };

  const [jobs, setJobs] = useState([]);

  const [search, setSearch] =
    useState("");

  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [sort, setSort] =
    useState("latest");

  // Pagination
  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  // Delete Modal
  const [deleteId, setDeleteId] =
    useState(null);

  // Normalize API response
  const normalizeJobs = (payload) => {
    if (Array.isArray(payload)) {
      return payload.map((job) => ({
        ...job,
        status: normalizeStatus(job.status),
      }));
    }

    if (Array.isArray(payload?.jobs)) {
      return payload.jobs.map((job) => ({
        ...job,
        status: normalizeStatus(job.status),
      }));
    }

    return [];
  };

  // Fetch Jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(
        "/jobs",
        {
          params: {
            page,
            limit: 5,
            search: debouncedSearch,
            status: statusFilter,
            sort,
          },
        }
      );

      setJobs(normalizeJobs(data));

      setTotalPages(
        data?.totalPages ?? 1
      );

      setErrorMessage("");
    } catch (error) {
      console.error(
        "Failed to fetch jobs:",
        error?.response?.data ||
          error.message
      );

      setJobs([]);

      setTotalPages(1);

      setErrorMessage(
        "Unable to load jobs."
      );

      toast.error(
        "Failed to load applications"
      );
    } finally {
      setLoading(false);
    }
  };

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch Data
  useEffect(() => {
    fetchJobs();
  }, [
    page,
    debouncedSearch,
    statusFilter,
    sort,
  ]);

  // Delete Job
  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await API.delete(
        `/jobs/${deleteId}`
      );

      toast.success(
        "Application deleted"
      );

      setDeleteId(null);

      fetchJobs();
    } catch (error) {
      console.error(
        error?.response?.data ||
          error.message
      );

      toast.error(
        "Failed to delete application"
      );
    }
  };

  // Update Status
  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await API.patch(
        `/jobs/${id}`,
        {
          status,
        }
      );

      toast.success(
        "Status updated"
      );

      fetchJobs();

      setErrorMessage("");
    } catch (error) {
      console.error(
        error?.response?.data ||
          error.message
      );

      toast.error(
        "Failed to update status"
      );
    }
  };

  // Safe Jobs
  const safeJobs = Array.isArray(jobs)
    ? jobs
    : [];

  // Server-side filtering
  const filteredJobs = safeJobs;

  const exportJobs = filteredJobs.map((job) => ({
    ...job,
    role: job.role || job.position,
  }));

  // CSV Headers
  const csvHeaders = [
    {
      label: "Company",
      key: "company",
    },
    {
      label: "Role",
      key: "role",
    },
    {
      label: "Status",
      key: "status",
    },
    {
      label: "Created At",
      key: "createdAt",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">

          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Applications
          </h1>

          {/* Export CSV */}
          <CSVLink
            data={exportJobs}
            headers={csvHeaders}
            filename="job-applications.csv"
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition-all text-center"
          >
            Export CSV
          </CSVLink>
        </div>

        {/* Error */}
        {errorMessage && (
          <p className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-700 dark:bg-red-950 dark:text-red-300">
            {errorMessage}
          </p>
        )}

        {/* Search + Filter + Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">

          {/* Search */}
          <input
            type="text"
            placeholder="Search by company..."
            className="px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          {/* Filter */}
          <select
            className="px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
          >
            <option value="">
              All Status
            </option>

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

          {/* Sort */}
          <select
            className="px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white"
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >
            <option value="latest">
              Latest
            </option>

            <option value="oldest">
              Oldest
            </option>

            <option value="a-z">
              Company A-Z
            </option>

            <option value="z-a">
              Company Z-A
            </option>
          </select>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[1, 2, 3, 4, 5, 6].map(
              (item) => (
                <SkeletonCard
                  key={item}
                />
              )
            )}
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">

              <table className="w-full text-left">

                <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">

                  <tr>
                    <th className="p-4">
                      Company
                    </th>

                    <th className="p-4">
                      Role
                    </th>

                    <th className="p-4">
                      Status
                    </th>

                    <th className="p-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredJobs.map(
                    (job) => (
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
                          {job.role || job.position}
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
                              setDeleteId(
                                job._id
                              )
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2
                              size={18}
                            />
                          </button>
                        </td>
                      </tr>
                    )
                  )}

                  {/* Empty State */}
                  {filteredJobs.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className="p-6"
                      >
                        <EmptyState
                          title="No Applications Found"
                          description="Start adding jobs to track your applications."
                        />
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
                  setPage(
                    (prev) =>
                      prev - 1
                  )
                }
                className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-gray-400"
              >
                Prev
              </button>

              <span className="text-gray-700 dark:text-white">
                Page {page} of{" "}
                {totalPages}
              </span>

              <button
                disabled={
                  page === totalPages
                }
                onClick={() =>
                  setPage(
                    (prev) =>
                      prev + 1
                  )
                }
                className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-gray-400"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Delete Modal */}
        {deleteId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

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
                  onClick={
                    confirmDelete
                  }
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
