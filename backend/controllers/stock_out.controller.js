import StockOut from "../models/stock_out.js";

export const createStockOut = async (req, res) => {
  try {
    const { item, department, quantity, date } = req.body;

    if (!item || !department || !quantity) {
      return res
        .status(400)
        .json({ message: "Item, department, and quantity are required" });
    }

    const stockOut = new StockOut({
      item,
      department,
      quantity,
      date: date || Date.now(),
      recordedBy: req.session.userId,
    });

    await stockOut.save();
    res.status(201).json(stockOut);
  } catch (error) {
    console.error("Error creating stock out:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getStockouts = async (req, res) => {
  try {
    const stockouts = await StockOut.find()
      .populate("item", "name unit")
      .populate("department", "name");
    res.status(200).json(stockouts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal sever error", error: error.message });
  }
};

export const getStockOutById = async (req, res) => {
  try {
    const stockout = await StockOut.findById(req.params.id);
    if (!stockout) {
      return res.status(404).json({ message: "Stockout not found" });
    }
    res.status(200).json(stockout);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal sever error", error: error.message });
  }
};

export const updateStockout = async (req, res) => {
  try {
    const stockout = await StockOut.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!stockout) {
      return res.status(404).json({ message: "Stockout not found" });
    }
    res.status(200).json(stockout);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal sever error", error: error.message });
  }
};

export const deleteStockout = async (req, res) => {
  try {
    const stockout = await StockOut.findByIdAndDelete(req.params.id);
    if (!stockout) {
      return res.status(404).json({ message: "Stockout not found" });
    }
    res.status(200).json({ message: "Stockout deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal sever error", error: error.message });
  }
};
