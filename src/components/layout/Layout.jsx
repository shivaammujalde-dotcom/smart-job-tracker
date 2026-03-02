import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 dark:bg-gray-900 min-h-screen md:ml-[250px] pt-14 md:pt-0 transition-all duration-300">
        <Navbar />
        <div className="p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}