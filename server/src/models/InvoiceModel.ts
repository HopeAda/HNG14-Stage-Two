<<<<<<< Updated upstream
import mongoose, { Schema, Document } from "mongoose";
=======
import mongoose, { Schema } from "mongoose";
>>>>>>> Stashed changes
import { Invoice } from "../types/invoice";

const AddressSchema = new Schema({
	street: String,
	city: String,
	postcode: String,
	country: String,
});

const ItemSchema = new Schema({
<<<<<<< Updated upstream
=======
	id: String,
>>>>>>> Stashed changes
	name: String,
	qty: Number,
	price: Number,
	total: Number,
});

const InvoiceSchema = new Schema<Invoice>({
	id: { type: String, required: true },
	description: { type: String, required: true },

	sender: AddressSchema,

	client: {
		name: String,
		email: String,
		address: AddressSchema,
	},

	items: [ItemSchema],

	dueDate: String,

	status: {
		type: String,
		enum: ["draft", "pending", "paid"],
<<<<<<< Updated upstream
		default: "pending",
=======
		default: "draft",
>>>>>>> Stashed changes
	},
});

export default mongoose.model<Invoice>("Invoice", InvoiceSchema);
