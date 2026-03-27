import StockIn from "../models/stock_in.js";

export const createStockIn = async (req, res) => {
  try {
    const { item, supplier, quantity, unitPrice } = req.body;

    if (!item || !supplier || !quantity || !unitPrice) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const totalPrice = quantity * unitPrice;

    const newStockIn = new StockIn({
      item,
      supplier,
      quantity,
      unitPrice,
      totalPrice,
      // recordedBy: req.session.userId, // TODO: Add user authentication
    });

    await newStockIn.save();

    res.status(201).json({ message: "Stock-in record created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal sever error", error: error.message });
  }
};

export const getStockins = async (req, res) => {
  try {
    const stockins = await StockIn.find()
      .populate("item", "name unit")
      .populate("supplier", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(stockins);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal sever error", error: error.message });
  }
};

export const getStockinById = async (req, res) => {
  try {
    const stockin = await StockIn.findById(req.params.id);
    if (!stockin) {
      return res.status(404).json({ message: "Stockin not found" });
    }
    res.status(200).json(stockin);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal sever error", error: error.message });
  }
};

export const updateStockin = async (req, res) => {
  try {
    const stockin = await StockIn.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!stockin) {
      return res.status(404).json({ message: "Stockin not found" });
    }
    res.status(200).json(stockin);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal sever error", error: error.message });
  }
};

export const deleteStockin = async (req, res) => {
  try {
    const stockin = await StockIn.findByIdAndDelete(req.params.id);
    if (!stockin) {
      return res.status(404).json({ message: "Stockin not found" });
    }
    res.status(200).json({ message: "Stockin deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal sever error", error: error.message });
  }
};
