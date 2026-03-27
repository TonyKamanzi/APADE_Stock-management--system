import axios from "axios";
import { useEffect, useState } from "react";
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

export default function AddItem({onSuccess}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    unit: "",
    category: "",
    quantity: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    axios
      .get("http://localhost:5000/category/get-all-categories")
      .then(({ data }) => setCategories(data))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/items/add-item", form);
      toast.success("Item added successfully");
      setForm({
        name: "",
        description: "",
        unit: "",
        category: "",
        quantity: "",
      });
      if(onSuccess) onSuccess()
    } catch {
      toast.error("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-1">
          Inventory Management
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight mb-3">
          Add Item
        </h1>
        <div className="h-px bg-linear-to-r from-amber-400 via-amber-200 to-transparent mb-8" />

        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm px-6 py-7">
          <p className="text-xs font-bold tracking-widest uppercase text-amber-600 mb-6">
            + New Item
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={lbl}>Item Name</label>
              <input
                className={inp}
                type="text"
                placeholder="e.g. Rice, Cement…"
                value={form.name}
                onChange={set("name")}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lbl}>Quantity</label>
                <input
                  className={inp}
                  type="number"
                  placeholder="0"
                  min="0"
                  value={form.quantity}
                  onChange={set("quantity")}
                  required
                />
              </div>
              <div>
                <label className={lbl}>Unit</label>
                <div className="relative">
                  <select
                    className={sel}
                    value={form.unit}
                    onChange={set("unit")}
                    required
                  >
                    <option value="">Select unit</option>
                    {[
                      ["pcs", "Pieces"],
                      ["kg", "Kg"],
                      ["g", "Gram"],
                      ["l", "Liter"],
                    ].map(([v, l]) => (
                      <option key={v} value={v}>
                        {l}
                      </option>
                    ))}
                  </select>
                  <Chevron />
                </div>
              </div>
            </div>

            <div>
              <label className={lbl}>Category</label>
              <div className="relative">
                <select
                  className={sel}
                  value={form.category}
                  onChange={set("category")}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <Chevron />
              </div>
            </div>

            <div>
              <label className={lbl}>Description</label>
              <input
                className={inp}
                type="text"
                placeholder="Short description (optional)"
                value={form.description}
                onChange={set("description")}
              />
            </div>

            <div className="h-px bg-stone-100" />

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white text-sm font-bold px-7 py-2.5 rounded-xl transition-colors duration-200"
              >
                {loading ? (
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
                    Adding…
                  </>
                ) : (
                  "+ Add Item"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
