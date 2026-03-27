import AddItem from "../../components/home/AddItem";
import axios from "axios";
import { Delete, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Items() {
  const [items, setItems] = useState([]);
  // const [loading, setLoading] = useState(true);

  const fetchItem = async () => {
    // setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/items/all-items");
      setItems(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(`Do you want to delete this item`)) return;
      try {
        await axios.delete(`http://localhost:5000/items/delete-item/${id}`,);
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
        {/* Add Item Form */}
        <AddItem onSuccess={fetchItem} />

        {/* Header */}
        <div>
          <h1 className="text-2xl mt-6 mb-1 font-extrabold uppercase tracking-widest">
            Items Stored
          </h1>
          <div className="h-px bg-linear-to-r from-amber-400 via-amber-300 to-transparent mb-8" />
        </div>

        {/* Items Grid */}
        {items.length == 0 ? (
          <p>No items added to get started</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
