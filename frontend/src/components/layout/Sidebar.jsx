import {
  FaHome,
  FaUserGraduate,
  FaClipboardCheck,
  FaFilePdf,
  FaUserCircle,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { FaSchool } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { logout } from "../../utils/auth";

const sidebar = ({ isOpen, setIsOpen }) => {
  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Students",
      path: "/students",
      icon: <FaUserGraduate />,
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: <FaClipboardCheck />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FaFilePdf />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUserCircle />,
    },
    {
      name: "Academic Classes",
      icon: <FaSchool />,
      path: "/academic-classes",
    },
  ];
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <>
      {/* Overlay (Mobile Only) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
    fixed
    top-0
    left-0
    z-50
    h-screen
    w-64
    bg-slate-900
    text-white
    flex
    flex-col
    transform
    transition-transform
    duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
  `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold">Smart Attendance</h1>

          {/* Close Button (Mobile Only) */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1">
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-4 transition-all duration-300
                ${isActive ? "bg-blue-600" : "hover:bg-slate-800"}`
              }
            >
              <span className="text-lg">{menu.icon}</span>

              {menu.name}
            </NavLink>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-5 py-3 text-white hover:bg-red-600 rounded-lg transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </aside>
    </>
  );
};

export default sidebar;
