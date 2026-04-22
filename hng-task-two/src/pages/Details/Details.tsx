import "./Details.css";
import Back from "../../assets/back.svg";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import Banner from "../../components/Banner/Banner";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const Details = () => {
	const navigate = useNavigate();

	return (
		<div className="details-page">
			<button
				className="back"
				onClick={() => {
					navigate("/");
				}}
			>
				<img src={Back} alt="" />
				<span>Go back</span>
			</button>

			<section className="status">
				<div className="status-info">
					<p>Status</p>
					<StatusBadge />
				</div>
				<div className="buttons">
					<Button name="edit" />
					<Button name="delete" />
					<Button name="Mark as Paid" />
				</div>
			</section>

			<section className="invoice-details">
				<div className="invoice-info">
					<span className="id">
						#<span className="id-name">XM9141</span>
					</span>
					<span className="description small-muted-text">
						Graphic Design
					</span>
				</div>

				<div className="sender-address small-muted-text">
					<span>19 Union Terrace</span>
					<span>London</span>
					<span>E1 3EZ</span>
					<span>United Kingdom</span>
				</div>

				<div className="invoice-date">
					<span className="small-muted-text">Invoice Date</span>
					<span className="large-white-text">21 Aug 2021</span>
				</div>

				<div className="payment-due">
					<span className="small-muted-text">Payment Due</span>
					<span className="large-white-text">20 Sep 2021</span>
				</div>

				<div className="receiver-details small-muted-text">
					<p>Bill To</p>
					<span className="receiver-name large-white-text">
						Alex Grim
					</span>
					<div className="receiver-address">
						<span>84 Church Way</span>
						<span>Bradford</span>
						<span>BD1 9PB</span>
						<span>United Kingdom</span>
					</div>
				</div>

				<div className="receiver-email ">
					<span className="small-muted-text">Sent to</span>
					<span className="large-white-text">alexgrim@mail.com</span>
				</div>
				<Banner />
			</section>
		</div>
	);
};

export default Details;
