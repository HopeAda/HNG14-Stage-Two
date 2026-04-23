export type Status = "draft" | "pending" | "paid";

export type Address = {
	street: string;
	city: string;
	postcode: string;
	country: string;
};

export type InvoiceItem = {
	id: string;
	name: string;
	qty: number;
	price: number;
	total: number;
};

export type Client = {
	name: string;
	email: string;
	address: Address;
};

export type Invoice = {
	id: string;
	description: string;
	client: Client;
	sender: Address;
	items: InvoiceItem[];
	dueDate: string;
	status: Status;
	total: number;
};
