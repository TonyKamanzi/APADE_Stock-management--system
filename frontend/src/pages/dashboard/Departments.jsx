import React, { useEffect, useState } from "react";
import AddDapartment from "../../components/AddDapartment";
import axios from "axios";
import { AlertCircle, Delete, DeleteIcon, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/department/all-departments",
      );
      setDepartments(res.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load the departments");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this Department?")) return;
    try {
      await axios.delete(
        `http://localhost:5000/department/delete-department/${id}`,
      );
      setDepartments(departments.filter((dap) => dap._id !== id));
      toast.success("Department deleted succefully")
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete department");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);
  return (
    <div className="min-h-screen bg-stone-100 px-4 py-10 sm-px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-3">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-1">
              Department Management
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 leading-tight tracking-tight">
              Departments
            </h1>
          </div>
          {!loading && (
            <span className="bg-stone-900 text-stone-100 text-xs font-bold px-4 py-2 rounded-full tracking-wide">
              {departments.length}
              {departments.length == 1 ? " Department" : " Departments"}
            </span>
          )}
        </div>
        <div className="h-px bg-linear-to-r from-amber-400 via-amber-200 to-transparent mb-8" />
        <div className="bg-white border-stone-200 rounded-2xl shadow-sm px-6 py-6 mb-10 ">
          <p className="text-sm font-bold tracking-widest text-amber-600 mb-4">
            + New Department
          </p>
          <AddDapartment onDepartmentAdded={fetchDepartments} />
        </div>
        {error && (
          <div className="flex items-center bg-red-50 border border-red-200 border-l-4 border-l-red-500 px-4 py-3 mb-6 text-red-700 gap-4">
            <span>
              <AlertCircle className="text-red-600" />
            </span>
            <span>{error}</span>
          </div>
        )}
        {loading ? (
          <div>
            <div className="flex gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0ms]" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce [animation-delay:150ms]" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce [animation-delay:300ms]" />
            </div>
            <p className="text-stone-400 text-sm tracking-widest uppercase">
              Loading…
            </p>
          </div>
        ) : departments.length == 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <span className="text-5xl opacity-30">🗂</span>
            <p className="text-stone-400 text-sm italic">
              No categories yet. Add one above to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {departments.map((dap, index) => (
              <div
                key={dap._id}
                className="group relative bg-white border border-stone-200 rounded-2xl px-6 pt-6 pb-5 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-amber-300 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-amber-400 to-yellow-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

                <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-stone-100 group-hover:bg-amber-50 transition-colors duration-300 flex items-center justify-center text-[11px] font-extrabold text-amber-500 tracking-tight">
                  #{String(index + 1).padStart(2, "0")}
                </div>
                <div className="pr-12 mt-1">
                  <h3 className="text-base font-bold text-stone-900 leading-snug mb-2">
                    {dap.name}
                  </h3>
                  <p className="text-[13px] text-stone-500 leading-relaxed font-light line-clamp-3">
                    {dap.description || "No description provided"}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-3">
                  <Link
                    className="text-blue-500 hover:text-blue-600 transition-colors duration-150 flex gap-1"
                    to={`/dashboard/edit-department/${dap._id}`}
                  >
                    <Edit />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(dap._id)}
                    className="text-red-500 hover:text-red-600 transition-colors duration-150 flex gap-1"
                  >
                    <DeleteIcon />
                    Delete
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
