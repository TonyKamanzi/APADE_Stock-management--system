import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Package,
  FolderOpen,
  Truck,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalItems: 0,
    totalCategories: 0,
    totalSuppliers: 0,
    lowStockItems: 0,
    recentItems: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [itemsRes, categoriesRes, suppliersRes] = await Promise.all([
          axios.get("http://localhost:5000/items/all-items"),
          axios.get("http://localhost:5000/category/get-all-categories"),
          axios.get("http://localhost:5000/supplier/all-suppliers"),
        ]);

        const items = itemsRes.data;
        const categories = categoriesRes.data;
        const suppliers = suppliersRes.data;

        // Calculate statistics
        const totalItems = items.length;
        const totalCategories = categories.length;
        const totalSuppliers = suppliers.length;
        const lowStockItems = items.filter((item) => item.quantity < 10).length;
        const recentItems = items.slice(0, 5); // Get 5 most recent items

        setStats({
          totalItems,
          totalCategories,
          totalSuppliers,
          lowStockItems,
          recentItems,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100 px-4 py-10 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="flex gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0ms]" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce [animation-delay:150ms]" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce [animation-delay:300ms]" />
            </div>
            <p className="text-stone-400 text-sm tracking-widest uppercase">
              Loading Dashboard…
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-stone-100 px-4 py-10 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 border-l-4 border-l-red-500 rounded-xl px-4 py-3 text-red-700 text-sm font-medium">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 px-4 py-10 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-1">
            Dashboard Overview
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight mb-3">
            Welcome Back
          </h1>
          <div className="h-px bg-linear-to-r from-amber-400 via-amber-200 to-transparent" />
        </div>

        {/* ── Stats Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Items */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-stone-900">
                {stats.totalItems}
              </p>
              <p className="text-sm text-stone-500">Total Items</p>
            </div>
          </div>

          {/* Total Categories */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-amber-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-stone-900">
                {stats.totalCategories}
              </p>
              <p className="text-sm text-stone-500">Categories</p>
            </div>
          </div>

          {/* Total Suppliers */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-stone-900">
                {stats.totalSuppliers}
              </p>
              <p className="text-sm text-stone-500">Suppliers</p>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              {stats.lowStockItems > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Alert
                </span>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-stone-900">
                {stats.lowStockItems}
              </p>
              <p className="text-sm text-stone-500">Low Stock Items</p>
            </div>
          </div>
        </div>

        {/* ── Recent Items & Alerts ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Items */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-600" />
              Recent Items
            </h3>
            <div className="space-y-3">
              {stats.recentItems.length > 0 ? (
                stats.recentItems.map((item, index) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between py-2 border-b border-stone-100 last:border-b-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-stone-900">{item.name}</p>
                      <p className="text-sm text-stone-500">
                        {item.quantity} {item.unit} •{" "}
                        {item.category?.name || "No category"}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          item.quantity < 10
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.quantity < 10 ? "Low Stock" : "In Stock"}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-stone-500 text-sm italic">
                  No items added yet
                </p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="/dashboard/items"
                className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl p-4 text-center transition-colors duration-200 group"
              >
                <Package className="w-6 h-6 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-blue-900">Add Item</p>
              </a>
              <a
                href="/dashboard/categories"
                className="bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl p-4 text-center transition-colors duration-200 group"
              >
                <FolderOpen className="w-6 h-6 text-amber-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-amber-900">
                  Add Category
                </p>
              </a>
              <a
                href="/dashboard/suppliers"
                className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl p-4 text-center transition-colors duration-200 group"
              >
                <Truck className="w-6 h-6 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-green-900">
                  Add Supplier
                </p>
              </a>
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-center opacity-60 cursor-not-allowed">
                <AlertTriangle className="w-6 h-6 text-stone-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-stone-500">Reports</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
