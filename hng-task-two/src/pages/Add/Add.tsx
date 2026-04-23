import type { Invoice } from "../../Context/DataContext";
import InvoiceForm from "../../components/InvoiceForm/InvoiceForm";

const Add = () => {
	const emptyInvoice: Invoice = {
		id: "",
		description: "",
		client: {
			name: "",
			email: "",
			address: {
				street: "",
				city: "",
				postcode: "",
				country: "",
			},
		},
		sender: {
			street: "",
			city: "",
			postcode: "",
			country: "",
		},
		items: [],
		dueDate: "",
		dateCreated: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
		paymentTerm: 1,
		status: "draft",
		total: 0,
	};

	return <InvoiceForm mode="add" initialData={emptyInvoice} />;
};

export default Add;
