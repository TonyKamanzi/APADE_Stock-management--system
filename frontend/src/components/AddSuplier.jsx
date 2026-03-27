import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const inp =
  "w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200";
const lbl =
  "block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5";

export default function AddSuplier({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/supplier/add-supplier", form);
      toast.success("Supplier added successfully");
      setForm({
        name: "",
        contact: "",
        address: "",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add supplier");
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
          Add Supplier
        </h1>
        <div className="h-px bg-linear-to-r from-amber-400 via-amber-200 to-transparent mb-8" />

        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm px-6 py-7">
          <p className="text-xs font-bold tracking-widest uppercase text-amber-600 mb-6">
            + New Supplier
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={lbl}>Supplier Name</label>
              <input
                className={inp}
                type="text"
                placeholder="e.g. ABC Suppliers"
                value={form.name}
                onChange={set("name")}
                required
              />
            </div>

            <div>
              <label className={lbl}>Contact</label>
              <input
                className={inp}
                type="text"
                placeholder="Phone or email"
                value={form.contact}
                onChange={set("contact")}
                required
              />
            </div>

            <div>
              <label className={lbl}>Address</label>
              <input
                className={inp}
                type="text"
                placeholder="Full address"
                value={form.address}
                onChange={set("address")}
                required
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
                  "+ Add Supplier"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
