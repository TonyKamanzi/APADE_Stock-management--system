import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/Home/About";
import Contact from "./pages/Home/Contact";
import Login from "./pages/auth/Login";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Categories from "./pages/dashboard/Categories";
import Departments from "./pages/dashboard/Departments";
import Items from "./pages/dashboard/Items";
import StockIn from "./pages/dashboard/StockIn";
import StockOut from "./pages/dashboard/StockOut";
import Suppliers from "./pages/dashboard/Suppliers";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="categories" element={<Categories />} />
          <Route path="departments" element={<Departments />} />
          <Route path="items" element={<Items />} />
          <Route path="stock-in" element={<StockIn />} />
          <Route path="stock-out" element={<StockOut />} />
          <Route path="suppliers" element={<Suppliers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
