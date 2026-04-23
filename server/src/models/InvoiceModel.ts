import mongoose, { Schema } from "mongoose";
import { Invoice } from "../types/invoice";

const AddressSchema = new Schema({
	street: String,
	city: String,
	postcode: String,
	country: String,
});

const ItemSchema = new Schema({
	id: String,
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
		default: "draft",
	},
});

export default mongoose.model<Invoice>("Invoice", InvoiceSchema);
