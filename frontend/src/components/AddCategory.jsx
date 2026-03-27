import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddCategory({ onCategoryAdded }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/category/add-category", {
        name,
        description,
      });

      toast.success("Category added successfully");

      // 🔹 Reset form
      setName("");
      setDescription("");

      // 🔹 Notify parent to refresh table
      if (onCategoryAdded) onCategoryAdded();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add category");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center gap-4"
      >
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md w-full md:w-auto"
        >
         + Add
        </button>
      </form>
    </div>
  );
}
