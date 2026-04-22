import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import InvoiceRoutes from "./routes/invoiceRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api/invoices", InvoiceRoutes);

mongoose
	.connect(`${MONGO_URI}`)
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	})
	.catch((err) => console.error("MongoDB connection error:", err));
