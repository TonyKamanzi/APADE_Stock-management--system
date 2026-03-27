import Item from "../models/items.js";

// ✅ CREATE ITEM
export const createItem = async (req, res) => {
  try {
    const { name, quantity, unit, description, category } = req.body;

    if (!name || !quantity || !unit || !category) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const item = await Item.create({
      name,
      quantity,
      unit,
      description,
      category,
    });

    res.status(201).json({
      message: "Item created successfully",
      item,
    });
  } catch (error) {
    console.error("CREATE ITEM ERROR:", error.message);

    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ✅ GET ALL ITEMS
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate("category", "name") // only return category name
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json(items);
  } catch (error) {
    console.error("GET ITEMS ERROR:", error.message);

    res.status(500).json({
      message: "Failed to fetch items",
      error: error.message,
    });
  }
};

// ✅ GET SINGLE ITEM
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate(
      "category",
      "name",
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("GET ITEM ERROR:", error.message);

    res.status(500).json({
      message: "Failed to fetch item",
      error: error.message,
    });
  }
};

// ✅ UPDATE ITEM
export const updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("category", "name");

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item updated successfully",
      updatedItem,
    });
  } catch (error) {
    console.error("UPDATE ITEM ERROR:", error.message);

    res.status(500).json({
      message: "Failed to update item",
      error: error.message,
    });
  }
};

// ✅ DELETE ITEM
export const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ITEM ERROR:", error.message);

    res.status(500).json({
      message: "Failed to delete item",
      error: error.message,
    });
  }
};
