import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import DataContext from "../../Context/DataContext";
import InvoiceForm from "../../components/InvoiceForm/InvoiceForm";

const Edit = () => {
	const location = useLocation();
	const { id } = useParams();
	const ctx = useContext(DataContext);
	const navigate = useNavigate();

	const state = location.state as { backgroundLocation?: Location };

	useEffect(() => {
		if (!state?.backgroundLocation) {
			navigate("/", { replace: true });
		}
	}, [state, navigate]);

	const invoice = ctx?.invoices.find((itm) => itm.id === id);

	if (!invoice) return null;

	return <InvoiceForm mode="edit" initialData={invoice} />;
};

export default Edit;
