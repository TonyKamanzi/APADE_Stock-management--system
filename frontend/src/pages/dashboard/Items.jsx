import AddItem from "../../components/AddItem";
import axios from "axios";
import { Delete, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Items() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchItem = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/items/all-items");
      setItems(res.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(`Do you want to delete this item`)) return;
    try {
      await axios.delete(`http://localhost:5000/items/delete-item/${id}`);
      setItems(items.filter((it) => it._id !== id));
      toast.success("Item delete succefully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete the item");
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 px-4 py-10 sm:px-8">
      <div className="max-w-5xl mx-auto">
        {/* ── Header ── */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-3">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-1">
              Inventory Management
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 leading-tight tracking-tight">
              Items
            </h1>
          </div>
          {!loading && (
            <span className="bg-stone-900 text-stone-100 text-xs font-bold px-4 py-2 rounded-full tracking-wide">
              {items.length}
              {items.length === 1 ? " Item" : " Items"}
            </span>
          )}
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-linear-to-r from-amber-400 via-amber-200 to-transparent mb-8" />

        {/* ── Add Item Form ── */}
        <AddItem onSuccess={fetchItem} />

        {/* ── Error Banner ── */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 border-l-4 border-l-red-500 rounded-xl px-4 py-3 mb-6 text-red-700 text-sm font-medium">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        {/* ── Items Grid ── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 mt-6">
            <div className="flex gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0ms]" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce [animation-delay:150ms]" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce [animation-delay:300ms]" />
            </div>
            <p className="text-stone-400 text-sm tracking-widest uppercase">
              Loading…
            </p>
          </div>
        ) : items.length == 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 mt-6">
            <span className="text-5xl opacity-30">📦</span>
            <p className="text-stone-400 text-sm italic">
              No items yet. Add one above to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {items.map((it, index) => (
              <div key={it._id}>
                <div className="group relative bg-white border border-stone-200 rounded-2xl px-6 pt-6 pb-5 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-amber-300 transition-all duration-300 overflow-hidden">
                  <p className="text-xs text-gray-400">{index + 1}</p>

                  <h2 className="text-lg font-semibold">{it.name}</h2>

                  <p className="text-gray-600">
                    {it.quantity} <span className="text-sm">{it.unit}</span>
                  </p>

                  <p className="text-sm text-amber-600">
                    {it.category?.name || "No category"}
                  </p>

                  <p className="text-sm text-blue-600">
                    {it.supplier?.name || "No supplier"}
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    {it.description || "No description"}
                  </p>
                  <div className="flex gap-2 py-2">
                    <Link
                      to={`/dashboard/edit-item/${it._id}`}
                      className="text-blue-500 hover:text-blue-700 tracking-widest transition-colors flex"
                    >
                      <span>Edit</span>
                      <Edit />
                    </Link>
                    <button
                      onClick={() => handleDelete(it._id)}
                      className="flex text-sm text-red-500 hover:text-red-600 tracking-widest transition-colors "
                    >
                      <span>Delete</span>
                      <Delete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
