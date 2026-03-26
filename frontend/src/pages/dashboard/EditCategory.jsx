import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditCategory() {
  const { id } = useParams(); // Get category ID from URL
  const navigate = useNavigate();
  const [category, setCategory] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch category data on mount
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/category/get-category/${id}`,
        );
        setCategory(res.data);
      } catch (error) {
        console.error("Error fetching category:", error);
        toast.error("Failed to load category");
        navigate("/dashboard/categories"); // Redirect back if error
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id, navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axios.put(
        `http://localhost:5000/category/edit-category/${id}`,
        category,
      );
      toast.success("Category updated successfully");
      navigate("/dashboard/categories"); // Redirect back to categories list
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
    } finally {
      setUpdating(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  if (loading) return <p className="text-center p-6">Loading category...</p>;

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-700 mb-4">
          Edit Category
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={category.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={category.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={updating}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {updating ? "Updating..." : "Update Category"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/categories")}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
