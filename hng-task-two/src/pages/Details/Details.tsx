import "./Details.css";
import Back from "../../assets/back.svg";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import Banner from "../../components/Banner/Banner";
import Button from "../../components/Button/Button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import DataContext from "../../Context/DataContext";

const Details = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const ctx = useContext(DataContext);
	if (!ctx) return null;
	const { id } = useParams();
	const itemData = ctx.invoices.find((itm) => itm.id == id);
	if (!itemData) {
		navigate("/");
		return null;
	}

	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const overlayRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleEscBtn = (e: KeyboardEvent) => {
			if (overlayRef.current && e.key == "Escape") {
				setDeleteModalOpen(false);
			}
		};

		document.addEventListener("keydown", handleEscBtn);

		return () => {
			document.removeEventListener("keydown", handleEscBtn);
		};
	});

	return (
		<div className="details-page">
			<button className="back">
				<img src={Back} alt="" />
				<span>Go back</span>
			</button>

			<section className="status">
				<div className="status-info">
					<p>Status</p>
					<StatusBadge type={itemData.status || "draft"} />
				</div>
				<div className="buttons">
					{itemData.status !== "paid" ? (
						<Button
							name="edit"
							clickHandler={() => {
								navigate(`/edit/${id}`, {
									state: { backgroundLocation: location },
								});
							}}
						/>
					) : (
						""
					)}
					<Button
						name="delete"
						clickHandler={() => {
							setDeleteModalOpen(true);
						}}
					/>
					{itemData.status !== "paid" ? (
						<Button
							name="Mark as Paid"
							disabled={itemData.status == "draft"}
							clickHandler={() => {
								if (itemData.status == "pending") {
									ctx.editInvoice(itemData.id, {
										...itemData,
										status: "paid",
									});
								}
							}}
						/>
					) : (
						""
					)}
				</div>
			</section>

			<section className="invoice-details">
				<div className="invoice-info">
					<span className="id">
						#<span className="id-name"> {itemData.id} </span>
					</span>
					<span className="description small-muted-text">
						{itemData.description}
					</span>
				</div>

				<div className="sender-address small-muted-text">
					<span> {itemData.sender.street} </span>
					<span>{itemData.sender.city} </span>
					<span>{itemData.sender.postcode} </span>
					<span>{itemData.sender.country} </span>
				</div>

				<div className="invoice-date">
					<span className="small-muted-text">Invoice Date</span>
					<span className="large-white-text">
						{" "}
						{new Date(itemData.dateCreated).toLocaleDateString(
							"en-US",
							{ day: "numeric", month: "short", year: "numeric" },
						)}{" "}
					</span>
				</div>

				<div className="payment-due">
					<span className="small-muted-text">Payment Due</span>
					<span className="large-white-text">
						{new Date(itemData.dueDate).toLocaleDateString(
							"en-US",
							{ day: "numeric", month: "short", year: "numeric" },
						)}
					</span>
				</div>

				<div className="receiver-details small-muted-text">
					<p>Bill To</p>
					<span className="receiver-name large-white-text">
						{itemData.client.name}
					</span>
					<div className="receiver-address">
						<span>{itemData.client.address.street}</span>
						<span>{itemData.client.address.city}</span>
						<span>{itemData.client.address.postcode}</span>
						<span> {itemData.client.address.country} </span>
					</div>
				</div>

				<div className="receiver-email ">
					<span className="small-muted-text">Sent To</span>
					<span className="large-white-text">
						{itemData.client.email}
					</span>
				</div>
				<Banner data={itemData.items} total={itemData.total} />
			</section>

			{deleteModalOpen ? (
				<div className="delete-modal-overlay" ref={overlayRef}>
					<div className="delete-modal-card">
						<h1>Confirm Deletion</h1>
						<span>
							Are you sure you want to delete invoice #
							{itemData.id.toUpperCase()}? This action cannot be
							undone.
						</span>

						<div className="buttons">
							<Button
								name={"cancel"}
								clickHandler={() => {
									setDeleteModalOpen(false);
								}}
							/>
							<Button
								name="delete"
								clickHandler={() => {
									ctx.deleteInvoice(itemData.id);
									navigate("/");
								}}
							/>
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default Details;
