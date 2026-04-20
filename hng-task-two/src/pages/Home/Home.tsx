import "./Home.css";
import Plus from "../../assets/plus.svg";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";
import InvoiceItem from "../../components/InvoiceItem/InvoiceItem";
import EmptyImg from "../../assets/empty-list.svg";

const Home = () => {
	const invoiceList = [];

	if (invoiceList.length == 0)
		return (
			<div className="empty-list">
				<img src={EmptyImg} alt="" />
				<h1>There is nothing here</h1>
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

					<button className="add-btn">
						<span className="img-cont">
							<img src={Plus} alt="" />
						</span>
						<span className="btn-display">New Invoice</span>
					</button>
				</section>
			</header>

			<main className="invoice-list">
				<InvoiceItem />
				<InvoiceItem />
				<InvoiceItem />
				<InvoiceItem />
			</main>
		</div>
	);
};

export default Home;
