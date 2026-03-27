import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number, // ✅ fixed
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // ✅ fixed
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
  },
  {
    timestamps: true,
  },
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
