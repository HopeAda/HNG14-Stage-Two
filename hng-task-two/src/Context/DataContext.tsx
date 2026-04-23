import { createContext, useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api/invoices";

export type Status = "draft" | "pending" | "paid";

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
	id: string;
};

type Client = {
	name: string;
	email: string;
	address: Address;
};

export type Invoice = {
<<<<<<< HEAD
=======
	id: string;
>>>>>>> feature/addinvoice-page
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

	useEffect(() => {
		const fetchInvoices = async () => {
			try {
				const res = await fetch(API_URL);

				if (!res.ok) {
					throw new Error("Failed to fetch");
				}

				const data = await res.json();

				// console.log(data);
				setInvoices(data || []);
			} catch (error) {
				console.error(error);
			}
		};

		fetchInvoices();
	}, []);

	const addInvoice = async (invoice: Invoice) => {
		try {
			const res = await fetch(API_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(invoice),
			});

			if (!res.ok) throw new Error("Failed to create new invoice");

			const data: Invoice = await res.json();

			setInvoices((prev) => [...prev, data]);
		} catch (error) {
			console.error(error);
		}
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

	const deleteInvoice = async (id: string) => {
		try {
			const res = await fetch(`${API_URL}/${id}`, {
				method: "DELETE",
			});

			if (!res.ok) throw new Error("Failed to delete");

			setInvoices((prev) => prev.filter((itm) => itm.id !== id));
		} catch (error) {
			console.error(error);
		}
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
