import { Request, Response } from "express";
import InvoiceModel from "../models/InvoiceModel";

export const getInvoices = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const invoices = await InvoiceModel.find();
		res.json(invoices);
	} catch (err) {
		res.status(500).json({ message: "Failed to fetch invoices" });
	}
};

export const createInvoice = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const invoice = new InvoiceModel(req.body);
		const savedInvoice = await invoice.save();

		res.status(201).json(savedInvoice);
	} catch (err) {
		res.status(500).json({ message: "Failed to create Invoice" });
	}
};

export const updateInvoice = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const updated = await InvoiceModel.findOneAndUpdate(
			{ id: req.params.id as string },
			req.body,
			{ returnDocument: "after" },
		);

		if (!updated) {
			res.status(404).json({ message: "Invoice not found" });
			return;
		}

		res.json(updated);
	} catch (err) {
		res.status(500).json({ message: "Failed to update Invoice" });
	}
};

export const deleteInvoice = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const deleted = await InvoiceModel.findOneAndDelete({
			id: req.params.id as string,
		});
		if (!deleted) {
			res.status(404).json({ message: "Invoice not found" });
		}
		res.json({ message: "Deleted" });
	} catch (err) {
		res.status(500).json({ message: "Failed to delete Invoice" });
	}
};
