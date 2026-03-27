import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddDapartment({ onDepartmentAdded }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name is required");
      return;
    }
    try {
      await axios.post("http://localhost:5000/department/add-department", {
        name,
        description,
      });
      toast.success("Department added succefully");
      setName("");
      setDescription("");
      if (onDepartmentAdded) onDepartmentAdded();
    } catch (error) {
      toast.error("Failed to add the department");
      console.error(error);
    }
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <form
        onSubmit={handelSubmit}
        className="md:flex gap-4 items-center md:flex-row"
      >
        <input
          className="border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-600 rounded-md w-full px-4 py-2 my-2"
          type="text"
          name="department"
          id="department"
          placeholder="Department Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-600 rounded-md w-full px-4 py-2 my-2"
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          type="submit"
        >
          + Add
        </button>
      </form>
    </div>
  );
}
