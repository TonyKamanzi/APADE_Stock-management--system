import Item from "../models/items.js";

export const createItem = async (req, res) => {
  try {
    const { name, quantity, unit, description, category } = req.body;
    const item = await Item.create({
      name,
      quantity,
      unit,
      description,
      category,
    });
    res.status(201).json({ message: "New item added", item });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getAllItmes = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findOneAndDelete(req.params.id)
    if (!item) {
      res.status(404).json({message:"Item to be deleted not found"})
    }
    res.status(200).json({message:"Item deleted succefully"})
  } catch (error) {
     res
       .status(500)
       .json({ message: "Internal server error", error: error.message });
  }
};
