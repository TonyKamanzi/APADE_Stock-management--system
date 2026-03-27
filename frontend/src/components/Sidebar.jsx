import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  BarChart3,
  Package,
  Truck,
  Warehouse,
  Grid,
  LogOut,
  SendIcon,
  SendHorizonal,
  Settings,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { icon: <BarChart3 size={20} />, label: "Dashboard", path: "/dashboard" },
    { icon: <Grid size={20} />, label: "Categories", path: "/dashboard/categories" },
    { icon: <Truck size={20} />, label: "Suppliers", path: "/dashboard/suppliers" },
    { icon: <Warehouse size={20} />, label: "Departments", path: "/dashboard/departments" },
    { icon: <Package size={20} />, label: "Items", path: "/dashboard/items" },
    { icon: <SendHorizonal size={20} />, label: "Stock In", path: "/dashboard/stock-in" },
    { icon: <SendIcon size={20} />, label: "Stock Out", path: "/dashboard/stock-out" },
    { icon: <BarChart3 size={20} />, label: "Reports", path: "/dashboard/reports" },
  ];

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/logout", {
        withCredentials: true,
      });
      if (res.data.message) {
        navigate("/login");
        toast.success("Logged out successfully");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <div
      className={`${isOpen ? "w-64" : "w-20"} bg-linear-to-b from-blue-600 to-blue-800 text-white transition-all duration-300 shrink-0 h-screen shadow-lg overflow-y-auto flex flex-col`}
    >
      {/* Toggle Button */}
      <div className="flex justify-between items-center p-4">
        {isOpen && <h1 className="text-2xl font-bold">APADE</h1>}
        <button onClick={toggleSidebar} className="p-2 hover:bg-blue-700 rounded-lg">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="mt-8 space-y-2 px-4 flex-1">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {item.icon}
            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-blue-700 flex items-center">
        <Settings size={20} className="mx-3" />
        {isOpen && <span className="text-sm font-medium">Settings</span>}
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-blue-700">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-4 w-full px-4 py-3 rounded-lg hover:bg-red-600 transition-colors duration-200 ${!isOpen ? "justify-center" : ""}`}
        >
          <LogOut size={20} />
          {isOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}
