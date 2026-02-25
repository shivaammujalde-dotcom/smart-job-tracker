export default function Navbar() {
  return (
    <div className="h-16 bg-white dark:bg-gray-800 shadow-md flex justify-between items-center px-8 ml-0 md:ml-64">
      <h2 className="font-semibold text-lg">Dashboard</h2>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  );
}