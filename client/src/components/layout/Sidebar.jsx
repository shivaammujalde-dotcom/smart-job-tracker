import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { name: "Dashboard", icon: "DB", path: "/dashboard" },
    { name: "Applications", icon: "AP", path: "/applications" },
    { name: "Add Job", icon: "+", path: "/add-job" },
    { name: "Analytics", icon: "AN", path: "/analytics" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-50 flex h-14 w-full items-center bg-gray-900 px-4 md:hidden">
        <button type="button" onClick={() => setMobileOpen(true)} className="text-white">
          Menu
        </button>
        <h1 className="ml-4 font-semibold text-white">Smart ATS</h1>
      </div>

      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed z-50 h-screen bg-gray-900 p-4 text-white transition-all duration-300 md:z-40 ${
          mobileOpen ? "left-0" : "-left-[300px] md:left-0"
        }`}
        style={{ width: collapsed ? 80 : 250 }}
      >
        <div className="mb-10 flex items-center justify-between">
          {!collapsed ? <h1 className="hidden text-xl font-bold text-blue-400 md:block">Smart ATS</h1> : null}

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setCollapsed((prev) => !prev)} className="hidden md:block">
              {collapsed ? ">" : "<"}
            </button>
            <button type="button" onClick={() => setMobileOpen(false)} className="md:hidden">
              Close
            </button>
          </div>
        </div>

        <nav className="mt-8 space-y-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg p-3 transition ${isActive ? "bg-blue-600" : "hover:bg-gray-800"}`
              }
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-slate-800 text-xs font-bold">
                {item.icon}
              </span>
              {!collapsed ? <span>{item.name}</span> : null}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-6 left-4">
          <button type="button" onClick={handleLogout} className="flex items-center gap-3 text-red-400 hover:text-red-500">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-slate-800 text-xs font-bold">
              LO
            </span>
            {!collapsed ? <span>Logout</span> : null}
          </button>
        </div>
      </aside>
    </>
  );
}
