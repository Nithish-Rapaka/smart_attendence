import { FaBars, FaBell } from "react-icons/fa";

const Navbar = ({ setIsOpen }) => {
  return (
    <div className="relative z-10 bg-white shadow px-4 md:px-8 py-4 flex justify-between items-center">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* Hamburger Button - Visible only on mobile/tablet */}
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden text-2xl text-gray-700"
        >
          <FaBars />
        </button>

        <h1 className="text-xl md:text-2xl font-semibold">Welcome 👋</h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4 md:gap-6">
        <FaBell className="text-xl cursor-pointer" />

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            className="w-10 h-10 rounded-full"
          />

          {/* Hide details on small screens */}
          <div className="hidden sm:block">
            <p className="font-semibold">Teacher</p>
            <p className="text-sm text-gray-500">teacher@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
