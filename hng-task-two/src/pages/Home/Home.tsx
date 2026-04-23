import "./Home.css";
import Plus from "../../assets/plus.svg";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";
import InvoiceItem from "../../components/InvoiceItem/InvoiceItem";
import EmptyImg from "../../assets/empty-list.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import DataContext from "../../Context/DataContext";

export type Filter = {
	draft: boolean;
	pending: boolean;
	paid: boolean;
};

const Home = () => {
	const ctx = useContext(DataContext);
	const navigate = useNavigate();
	const location = useLocation();

	const [filter, setFilter] = useState<Filter>({
		draft: false,
		pending: false,
		paid: false,
	});

	const invoiceList = ctx?.invoices || [];

	const filteredInvoiceList = Object.values(filter).every((v) => v === false)
		? invoiceList
		: invoiceList.filter((item) => filter[item.status]);

	return (
		<div className="home">
			<header>
				<section>
					<h1>Invoices</h1>
					<p>
						{filteredInvoiceList.length == 0
							? "No Invoices"
							: filter.draft && !filter.pending && !filter.paid
								? `${filteredInvoiceList.length} drafted invoice${filteredInvoiceList.length == 1 ? "" : "s"}`
								: !filter.draft &&
									  filter.pending &&
									  !filter.paid
									? `${filteredInvoiceList.length} pending invoice${filteredInvoiceList.length == 1 ? "" : "s"}`
									: !filter.draft &&
										  !filter.pending &&
										  filter.paid
										? `${filteredInvoiceList.length} paid invoice${filteredInvoiceList.length == 1 ? "" : "s"}`
										: `${invoiceList.length} total invoice${invoiceList.length == 1 ? "" : "s"}`}
					</p>
				</section>
				<section>
					<FilterDropdown filterFunction={setFilter} />

					<button
						className="add-btn"
						onClick={() => {
							navigate("/add", {
								state: { backgroundLocation: location },
							});
						}}
					>
						<span className="img-cont">
							<img src={Plus} alt="" />
						</span>
						<span className="btn-display">
							<span>New </span>
							<span className="extra"> Invoice</span>
						</span>
					</button>
				</section>
			</header>

			{filteredInvoiceList.length === 0 ? (
				<div className="empty-list">
					<img src={EmptyImg} alt="" />
					<h2>There is nothing here</h2>
					<p>
						Create an invoice by clicking the New button and get
						started
					</p>
				</div>
			) : (
				<main className="invoice-list">
					{filteredInvoiceList.map((itm) => (
						<InvoiceItem data={itm} key={itm.id} />
					))}
				</main>
			)}
		</div>
	);
};

export default Home;
