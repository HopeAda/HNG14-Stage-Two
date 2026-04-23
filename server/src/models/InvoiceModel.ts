import mongoose, { Schema } from "mongoose";
import { Invoice } from "../types/invoice.js";

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
	description: { type: String },

	sender: AddressSchema,

	client: {
		name: String,
		email: String,
		address: AddressSchema,
	},

	items: [ItemSchema],

	dateCreated: String,
	dueDate: String,
	paymentTerm: Number,

	status: {
		type: String,
		enum: ["draft", "pending", "paid"],
	},

	total: Number,
});

export default mongoose.model<Invoice>("Invoice", InvoiceSchema);
