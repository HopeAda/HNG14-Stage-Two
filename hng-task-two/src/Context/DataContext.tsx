import { createContext, useState } from "react";

type Status = "draft" | "pending" | "paid";

type Address = {
	street: string;
	city: string;
	postcode: string;
	country: string;
};

type InvoiceItem = {
	name: string;
	qty: number;
	price: number;
	total: number;
};

type Client = {
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
	dateCreated: string;
	paymentTerm: number;
	dueDate: string;
	status: Status;
	total: number;
};

type InvoiceContextType = {
	invoices: Invoice[];
	addInvoice: (invoice: Invoice) => void;
	editInvoice: (id: string, updatedInvoice: Invoice) => void;
	deleteInvoice: (id: string) => void;
	getInvoiceById: (id: string) => Invoice | undefined;
};

const DataContext = createContext<InvoiceContextType | null>(null);

type DataProviderProps = { children: React.ReactNode };

export const DataContextProvider = ({ children }: DataProviderProps) => {
	const [invoices, setInvoices] = useState<Invoice[]>([]);

	const addInvoice = (invoice: Invoice) => {
		setInvoices((prev) => [...prev, invoice]);
	};

	const editInvoice = async (id: string, updatedInvoice: Invoice) => {
		try {
			const res = await fetch(`${API_URL}/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedInvoice),
			});

			if (!res.ok) throw new Error("Failed to update invoice");

			const data: Invoice = await res.json();

			setInvoices((prev) =>
				prev.map((itm) => (itm.id === id ? data : itm)),
			);
		} catch (error) {
			console.error(error);
		}
	};

	const deleteInvoice = (id: string) => {
		setInvoices((prev) => prev.filter((itm) => itm.id !== id));
	};

	const getInvoiceById = (id: string) => {
		return invoices.find((itm) => itm.id === id);
	};

	return (
		<DataContext.Provider
			value={{
				invoices,
				addInvoice,
				editInvoice,
				deleteInvoice,
				getInvoiceById,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export default DataContext;
