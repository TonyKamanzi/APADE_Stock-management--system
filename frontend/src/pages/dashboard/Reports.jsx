import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart3,
  Package,
  FolderOpen,
  Truck,
  SendIcon,
  SendHorizonal,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
} from "lucide-react";

export default function Reports() {
  const [stats, setStats] = useState({
    totalItems: 0,
    totalCategories: 0,
    totalSuppliers: 0,
    totalStockIn: 0,
    totalStockOut: 0,
    totalStockInQty: 0,
    totalStockOutQty: 0,
    netMovement: 0,
    lowStockItems: 0,
    lastStockIn: [],
    lastStockOut: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);
        const [itemsRes, categoriesRes, suppliersRes, stockInRes, stockOutRes] =
          await Promise.all([
            axios.get("http://localhost:5000/items/all-items"),
            axios.get("http://localhost:5000/category/get-all-categories"),
            axios.get("http://localhost:5000/supplier/all-suppliers"),
            axios.get("http://localhost:5000/stockin/all-stockins"),
            axios.get("http://localhost:5000/stockout/all-stock-outs"),
          ]);

        const items = itemsRes.data;
        const categories = categoriesRes.data;
        const suppliers = suppliersRes.data;
        const stockIns = stockInRes.data;
        const stockOuts = stockOutRes.data;

        const totalStockInQty = stockIns.reduce(
          (acc, r) => acc + Number(r.quantity || 0),
          0,
        );
        const totalStockOutQty = stockOuts.reduce(
          (acc, r) => acc + Number(r.quantity || 0),
          0,
        );

        const lowStockItems = items.filter(
          (item) => Number(item.quantity) < 10,
        ).length;

        setStats({
          totalItems: items.length,
          totalCategories: categories.length,
          totalSuppliers: suppliers.length,
          totalStockIn: stockIns.length,
          totalStockOut: stockOuts.length,
          totalStockInQty,
          totalStockOutQty,
          netMovement: totalStockInQty - totalStockOutQty,
          lowStockItems,
          lastStockIn: stockIns.slice(0, 5),
          lastStockOut: stockOuts.slice(0, 5),
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load report data.");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
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
              Loading report data…
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
          <div className="bg-red-50 border border-red-200 border-l-4 border-l-red-500 p-4 rounded-xl text-red-700">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const printReport = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-stone-100 px-4 py-10 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-1">
              Reports
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
              Inventory Financial & Movement Summary
            </h1>
            <div className="h-px bg-linear-to-r from-amber-400 via-amber-200 to-transparent mt-4" />
          </div>
          <button
            onClick={printReport}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
          >
            Print Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 flex items-start gap-3">
            <div className="w-11 h-11 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center">
              <Package size={20} />
            </div>
            <div>
              <p className="text-3xl font-bold text-stone-900">
                {stats.totalItems}
              </p>
              <p className="text-sm text-stone-500">Total Items</p>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-6 flex items-start gap-3">
            <div className="w-11 h-11 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center">
              <FolderOpen size={20} />
            </div>
            <div>
              <p className="text-3xl font-bold text-stone-900">
                {stats.totalCategories}
              </p>
              <p className="text-sm text-stone-500">Total Categories</p>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-6 flex items-start gap-3">
            <div className="w-11 h-11 bg-green-100 text-green-700 rounded-xl flex items-center justify-center">
              <Truck size={20} />
            </div>
            <div>
              <p className="text-3xl font-bold text-stone-900">
                {stats.totalSuppliers}
              </p>
              <p className="text-sm text-stone-500">Total Suppliers</p>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-6 flex items-start gap-3">
            <div className="w-11 h-11 bg-red-100 text-red-700 rounded-xl flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-3xl font-bold text-stone-900">
                {stats.lowStockItems}
              </p>
              <p className="text-sm text-stone-500">Low stock items (&lt;10)</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-stone-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <SendHorizonal size={20} />
              </div>
              <p className="text-sm font-semibold text-stone-700">Stock In</p>
            </div>
            <p className="text-3xl font-bold text-stone-900">
              {stats.totalStockIn}
            </p>
            <p className="text-sm text-stone-500">Entries</p>
            <p className="text-xs text-stone-500 mt-2">
              Qty: {stats.totalStockInQty}
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <SendIcon size={20} />
              </div>
              <p className="text-sm font-semibold text-stone-700">Stock Out</p>
            </div>
            <p className="text-3xl font-bold text-stone-900">
              {stats.totalStockOut}
            </p>
            <p className="text-sm text-stone-500">Entries</p>
            <p className="text-xs text-stone-500 mt-2">
              Qty: {stats.totalStockOutQty}
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <BarChart3 size={20} />
              </div>
              <p className="text-sm font-semibold text-stone-700">
                Net Movement
              </p>
            </div>
            <p className="text-3xl font-bold text-stone-900">
              {stats.netMovement}
            </p>
            <p className="text-sm text-stone-500">In - Out</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">
              Latest Stock In
            </h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-stone-500 uppercase text-xs">
                  <th className="py-2 px-2">Item</th>
                  <th className="py-2 px-2">Qty</th>
                  <th className="py-2 px-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.lastStockIn.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-3 text-stone-500">
                      No stock in records.
                    </td>
                  </tr>
                ) : (
                  stats.lastStockIn.map((record) => (
                    <tr key={record._id} className="border-t border-stone-100">
                      <td className="py-2 px-2">
                        {record.item?.name || "Unknown"}
                      </td>
                      <td className="py-2 px-2">{record.quantity}</td>
                      <td className="py-2 px-2">
                        {new Date(record.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">
              Latest Stock Out
            </h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-stone-500 uppercase text-xs">
                  <th className="py-2 px-2">Item</th>
                  <th className="py-2 px-2">Qty</th>
                  <th className="py-2 px-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.lastStockOut.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-3 text-stone-500">
                      No stock out records.
                    </td>
                  </tr>
                ) : (
                  stats.lastStockOut.map((record) => (
                    <tr key={record._id} className="border-t border-stone-100">
                      <td className="py-2 px-2">
                        {record.item?.name || "Unknown"}
                      </td>
                      <td className="py-2 px-2">{record.quantity}</td>
                      <td className="py-2 px-2">
                        {new Date(record.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
