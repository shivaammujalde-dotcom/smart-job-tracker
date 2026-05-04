import { Bell, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b dark:border-gray-800 flex items-center justify-between px-6">
      
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Dashboard
      </h2>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        
        {/* Notification */}
        <button className="relative text-gray-600 dark:text-gray-300 hover:text-blue-500">
          <Bell size={22} />
        </button>

        {/* User */}
        <div className="flex items-center gap-2">
          <UserCircle
            size={32}
            className="text-gray-700 dark:text-gray-300"
          />

          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
            User
          </span>
        </div>
      </div>
    </header>
  );
}