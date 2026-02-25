import Layout from "../components/layout/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">
        Welcome Back 👋
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          Total Applications
          <h2 className="text-3xl font-bold mt-2">25</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          Interviews
          <h2 className="text-3xl font-bold mt-2">5</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          Pending
          <h2 className="text-3xl font-bold mt-2">10</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          Rejected
          <h2 className="text-3xl font-bold mt-2">10</h2>
        </div>
      </div>
    </Layout>
  );
}