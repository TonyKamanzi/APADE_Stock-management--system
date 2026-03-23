import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import session from "express-session";
import itemRoute from "./routes/items.route.js";
import categoryRoute from "./routes/category.route.js";
import supplierRoute from "./routes/suppplier.route.js";
import stockInRoute from "./routes/stock_in.route.js";
import stockOutRoute from "./routes/stock_out.route.js";
import departmentRoute from "./routes/department.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(
  session({
    secret: "dihwehdihe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
  }),
);

// Routes
app.use("/auth", authRoutes);
app.use("/items", itemRoute);
app.use("/category", categoryRoute);
app.use("/supplier", supplierRoute);
app.use("/stockin", stockInRoute);
app.use("/stockout", stockOutRoute);
app.use("/department", departmentRoute);
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is running");
});
