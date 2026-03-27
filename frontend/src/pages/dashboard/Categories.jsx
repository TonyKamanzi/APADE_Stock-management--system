import React, { useEffect, useState } from "react";
import AddCategory from "../../components/AddCategory";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Delete, Edit } from "lucide-react";

export default function Categories() {
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/category/get-all-categories",
      );
      setCategories(res.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await axios.delete(
        `http://localhost:5000/category/delete-category/${id}`,
      );
      setCategories(categories.filter((cat) => cat._id !== id));
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-stone-100 px-4 py-10 sm:px-8">
      <div className="max-w-5xl mx-auto">
        {/* ── Header ── */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-3">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-1">
              Content Management
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 leading-tight tracking-tight">
              Categories
            </h1>
          </div>
          {!loading && (
            <span className="bg-stone-900 text-stone-100 text-xs font-bold px-4 py-2 rounded-full tracking-wide">
              {categories.length}
              {categories.length === 1 ? " Category" : " Categories"}
            </span>
          )}
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-linear-to-r from-amber-400 via-amber-200 to-transparent mb-8" />

        {/* ── Add Category Form ── */}
        <AddCategory onCategoryAdded={fetchCategories} />

        {/* ── Error Banner ── */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 border-l-4 border-l-red-500 rounded-xl px-4 py-3 mb-6 text-red-700 text-sm font-medium">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        {/* ── Loading ── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="flex gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0ms]" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce [animation-delay:150ms]" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce [animation-delay:300ms]" />
            </div>
            <p className="text-stone-400 text-sm tracking-widest uppercase">
              Loading…
            </p>
          </div>
        ) : categories.length === 0 ? (
          /* ── Empty State ── */
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <span className="text-5xl opacity-30">🗂</span>
            <p className="text-stone-400 text-sm italic">
              No categories yet. Add one above to get started.
            </p>
          </div>
        ) : (
          /* ── Grid ── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {categories.map((cat, index) => (
              <div
                key={cat._id}
                className="group relative bg-white border border-stone-200 rounded-2xl px-6 pt-6 pb-5 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-amber-300 transition-all duration-300 overflow-hidden"
              >
                {/* Top accent bar revealed on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-amber-400 to-yellow-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

                {/* Index badge */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-stone-100 group-hover:bg-amber-50 transition-colors duration-300 flex items-center justify-center text-[11px] font-extrabold text-amber-500 tracking-tight">
                  #{String(index + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="pr-12 mt-1">
                  <h3 className="text-base font-bold text-stone-900 leading-snug mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-[13px] text-stone-500 leading-relaxed font-light line-clamp-3">
                    {cat.description || "No description provided."}
                  </p>
                </div>

                {/* Footer actions */}
                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-3">
                  <Link
                    to={`/dashboard/edit-category/${cat._id}`}
                    className="font-semibold text-blue-500 hover:text-blue-700 transition-colors duration-150 flex"
                  >
                    Edit
                    <Edit />
                  </Link>
                  <span className="w-1 h-1 rounded-full bg-stone-300" />
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className=" font-semibold text-red-400 hover:text-red-600 transition-colors duration-150 flex"
                  >
                    Delete
                    <Delete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
