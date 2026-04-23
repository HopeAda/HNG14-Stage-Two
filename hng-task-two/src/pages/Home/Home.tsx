import "./Home.css";
import Plus from "../../assets/plus.svg";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";
import InvoiceItem from "../../components/InvoiceItem/InvoiceItem";
import EmptyImg from "../../assets/empty-list.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../../Context/DataContext";

const Home = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const ctx = useContext(DataContext);

	const invoiceList = ctx?.invoices || [];

	if (invoiceList.length === 0)
		return (
			<div className="empty-list">
				<img src={EmptyImg} alt="" />
				<h2>There is nothing here</h2>
				<p>
					Create an invoice by clicking the New button and get started
				</p>
			</div>
		);
	return (
		<div className="home">
			<header>
				<section>
					<h1>Invoices</h1>
					<p>
						<span>7</span> invoices
					</p>
				</section>
				<section>
					<FilterDropdown />

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

			<main className="invoice-list">
				{invoiceList.map((itm) => (
					<InvoiceItem data={itm} key={itm.id} />
				))}
			</main>
		</div>
	);
};

export default Home;
