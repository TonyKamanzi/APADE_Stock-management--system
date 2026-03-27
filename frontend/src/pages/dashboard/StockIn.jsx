import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Package,
  Truck,
  DollarSign,
  Calendar,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";

const inp =
  "w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200";
const sel = inp + " appearance-none cursor-pointer text-stone-700";
const lbl =
  "block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5";

const Chevron = () => (
  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </div>
);

export default function StockIn() {
  const [stockIns, setStockIns] = useState([]);
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    item: "",
    supplier: "",
    quantity: "",
    unitPrice: "",
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [stockInsRes, itemsRes, suppliersRes] = await Promise.all([
          axios.get("http://localhost:5000/stockin/all-stockins"),
          axios.get("http://localhost:5000/items/all-items"),
          axios.get("http://localhost:5000/supplier/all-suppliers"),
        ]);

        setStockIns(stockInsRes.data);
        setItems(itemsRes.data);
        setSuppliers(suppliersRes.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load data");
        toast.error("Failed to load stock-in data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.item || !form.supplier || !form.quantity || !form.unitPrice) {
      toast.error("All fields are required");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post("http://localhost:5000/stockin/make-stockin", form);
      toast.success("Stock-in record added successfully");

      // Reset form
      setForm({
        item: "",
        supplier: "",
        quantity: "",
        unitPrice: "",
      });

      // Refresh data
      const res = await axios.get("http://localhost:5000/stockin/all-stockins");
      setStockIns(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add stock-in record");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this stock-in record?")
    )
      return;

    try {
      await axios.delete(`http://localhost:5000/stockin/delete-stockin/${id}`);
      setStockIns(stockIns.filter((stock) => stock._id !== id));
      toast.success("Stock-in record deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete stock-in record");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
              Loading Stock-In Records…
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 px-4 py-10 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-3">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-1">
              Inventory Management
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 leading-tight tracking-tight">
              Stock In
            </h1>
          </div>
          {!loading && (
            <span className="bg-stone-900 text-stone-100 text-xs font-bold px-4 py-2 rounded-full tracking-wide">
              {stockIns.length}
              {stockIns.length === 1 ? " Record" : " Records"}
            </span>
          )}
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-linear-to-r from-amber-400 via-amber-200 to-transparent mb-8" />

        {/* ── Add Stock-In Form ── */}
        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-stone-900 mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-amber-600" />
            Record New Stock Entry
          </h3>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div>
              <label className={lbl}>Item</label>
              <div className="relative">
                <select
                  className={sel}
                  value={form.item}
                  onChange={set("item")}
                  required
                >
                  <option value="">Select item</option>
                  {items.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <Chevron />
              </div>
            </div>

            <div>
              <label className={lbl}>Supplier</label>
              <div className="relative">
                <select
                  className={sel}
                  value={form.supplier}
                  onChange={set("supplier")}
                  required
                >
                  <option value="">Select supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier._id} value={supplier._id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
                <Chevron />
              </div>
            </div>

            <div>
              <label className={lbl}>Quantity</label>
              <input
                className={inp}
                type="number"
                placeholder="0"
                min="1"
                value={form.quantity}
                onChange={set("quantity")}
                required
              />
            </div>

            <div>
              <label className={lbl}>Unit Price ($)</label>
              <input
                className={inp}
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={form.unitPrice}
                onChange={set("unitPrice")}
                required
              />
            </div>

            <div className="md:col-span-2 lg:col-span-4 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white text-sm font-bold px-7 py-2.5 rounded-xl transition-colors duration-200"
              >
                {submitting ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>{" "}
                    Recording…
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Record Stock In
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* ── Error Banner ── */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 border-l-4 border-l-red-500 rounded-xl px-4 py-3 mb-6 text-red-700 text-sm font-medium">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        {/* ── Stock-In Records ── */}
        {stockIns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <span className="text-5xl opacity-30">📦</span>
            <p className="text-stone-400 text-sm italic">
              No stock-in records yet. Add one above to get started.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-200">
              <h3 className="text-lg font-semibold text-stone-900">
                Stock-In History
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-stone-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Supplier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Unit Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-stone-200">
                  {stockIns.map((stock) => (
                    <tr key={stock._id} className="hover:bg-stone-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Package className="w-4 h-4 text-stone-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-stone-900">
                              {stock.item?.name || "Unknown Item"}
                            </div>
                            <div className="text-sm text-stone-500">
                              {stock.item?.unit || ""}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Truck className="w-4 h-4 text-stone-400 mr-2" />
                          <div className="text-sm text-stone-900">
                            {stock.supplier?.name || "Unknown Supplier"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900">
                        {stock.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900">
                        <div className="flex items-center">
                          <span className="text-green-500 mr-1">Rwf</span>
                          {stock.unitPrice?.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900">
                        <div className="flex items-center">
                        <span className="text-green-500 mr-1">Rwf</span>
                          {stock.totalPrice?.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-stone-400 mr-1" />
                          {formatDate(stock.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDelete(stock._id)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-150"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
