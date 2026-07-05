import { FaBars, FaBell } from "react-icons/fa";

const navbar = ({ setIsOpen }) => {
  return (
    <div className="relative z-10 bg-white shadow px-4 md:px-8 py-4 flex justify-between items-center">
      {/* Left Side */}
      <div className="flex items-center gap-4 cursor-pointer">
        {/* Hamburger Button - Visible only on mobile/tablet */}
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden text-2xl text-gray-700 cursor-pointer"
        >
          <FaBars />
        </button>

        <h1 className="text-xl md:text-2xl font-semibold">Welcome 👋</h1>
      </div>
    </div>
  );
};

export default navbar;
