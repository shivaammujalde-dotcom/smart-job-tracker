import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg p-3 transition ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'}`;

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-lg"
        onClick={() => setOpen(!open)}
      >
        Menu
      </button>

      <aside
        className={`bg-gray-900 text-white w-64 h-screen fixed p-6 z-40 ${
          open ? 'block' : 'hidden'
        } md:block`}
      >
        <h1 className="text-2xl font-bold mb-10 text-blue-400">Smart ATS</h1>

        <nav className="space-y-4">
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/applications" className={linkClass}>
            Applications
          </NavLink>

          <NavLink to="/add-job" className={linkClass}>
            Add Job
          </NavLink>

          <div className="pt-10">
            <button type="button" className="flex items-center gap-3 text-red-400 hover:text-red-500">
              Logout
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
