import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import InvoiceRoutes from "./routes/invoiceRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.VITE_PORT;
const MONGO_URI = process.env.VITE_MONGO_URI;

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use("/api/invoices", InvoiceRoutes);

mongoose
	.connect(`${MONGO_URI}`)
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	})
	.catch((err) => console.error("MongoDB connection error:", err));
