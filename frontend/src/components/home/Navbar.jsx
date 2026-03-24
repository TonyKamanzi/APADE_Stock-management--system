import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to={"/"} className="flex items-center gap-2">
          <img
            src="/apade.png"
            alt="Logo"
            className="w-10 h-10 object-cover rounded-full"
          />
          <h1 className="text-xl font-bold text-gray-800">APADE STOCK</h1>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link to={"/"} className="hover:text-blue-600 cursor-pointer">Home</Link>
          <Link to={"/about"} className="hover:text-blue-600 cursor-pointer">About</Link>
          <Link to={"/contact"} className="hover:text-blue-600 cursor-pointer">Contact</Link>
        </ul>

        {/* Right Button */}
        <div className="hidden md:block">
          <Link to={"/login"} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4">
          <ul className="flex flex-col gap-4 text-gray-700 font-medium">
            <Link to={"/"}>Home</Link>
            <Link to={"/about"}>About</Link>
            <Link to={"/contact"}>Contact</Link>
            <Link to={"/login"} className="bg-blue-600 text-white py-2 rounded-lg mt-2">
              Login
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
}
