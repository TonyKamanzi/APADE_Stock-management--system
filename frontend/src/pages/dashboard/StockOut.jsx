import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Package, Users, Calendar, Trash2 } from "lucide-react";
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

export default function StockOut() {
  const [stockOuts, setStockOuts] = useState([]);
  const [items, setItems] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    item: "",
    department: "",
    quantity: "",
    date: "",
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [stockOutRes, itemsRes, departmentsRes] = await Promise.all([
          axios.get("http://localhost:5000/stockout/all-stock-outs"),
          axios.get("http://localhost:5000/items/all-items"),
          axios.get("http://localhost:5000/department/all-departments"),
        ]);

        setStockOuts(stockOutRes.data);
        setItems(itemsRes.data);
        setDepartments(departmentsRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load stock-out data");
        toast.error("Failed to load stock-out data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.item || !form.department || !form.quantity) {
      toast.error("Item, department and quantity are required");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post("http://localhost:5000/stockout/make-stock-out", form);
      toast.success("Stock-out record added successfully");

      setForm({ item: "", department: "", quantity: "", date: "" });
      const res = await axios.get(
        "http://localhost:5000/stockout/all-stock-outs",
      );
      setStockOuts(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add stock-out record");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this stock-out record?")
    )
      return;

    try {
      await axios.delete(
        `http://localhost:5000/stockout/delete-stock-out/${id}`,
      );
      setStockOuts(stockOuts.filter((row) => row._id !== id));
      toast.success("Stock-out record deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete stock-out record");
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

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
              Loading Stock-Out Records…
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 px-4 py-10 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-3">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-1">
              Inventory Management
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 leading-tight tracking-tight">
              Stock Out
            </h1>
          </div>
          {!loading && (
            <span className="bg-stone-900 text-stone-100 text-xs font-bold px-4 py-2 rounded-full tracking-wide">
              {stockOuts.length}
              {stockOuts.length === 1 ? " Record" : " Records"}
            </span>
          )}
        </div>

        <div className="h-px bg-linear-to-r from-amber-400 via-amber-200 to-transparent mb-8" />

        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-stone-900 mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-amber-600" />
            Record New Stock Exit
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
              <label className={lbl}>Department</label>
              <div className="relative">
                <select
                  className={sel}
                  value={form.department}
                  onChange={set("department")}
                  required
                >
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name}
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
              <label className={lbl}>Date (optional)</label>
              <input
                className={inp}
                type="datetime-local"
                value={form.date}
                onChange={set("date")}
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
                    </svg>
                    Recording…
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Record Stock Out
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 border-l-4 border-l-red-500 rounded-xl px-4 py-3 mb-6 text-red-700 text-sm font-medium">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        {stockOuts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <span className="text-5xl opacity-30">📤</span>
            <p className="text-stone-400 text-sm italic">
              No stock-out records yet. Add one above to get started.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-200">
              <h3 className="text-lg font-semibold text-stone-900">
                Stock-Out History
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
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Quantity
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
                  {stockOuts.map((stock) => (
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
                          <Users className="w-4 h-4 text-stone-400 mr-2" />
                          <div className="text-sm text-stone-900">
                            {stock.department?.name || "Unknown Department"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900">
                        {stock.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-stone-400" />
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
