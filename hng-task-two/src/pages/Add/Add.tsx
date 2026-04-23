import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ItemList from "../../components/ItemList/ItemLIst";
import TextInput from "../../components/TextInput/TextInput";
import "./Add.css";
import { useNavigate } from "react-router-dom";
import type { Invoice } from "../../Context/DataContext";

const Add = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const overlayRef = useRef<HTMLDivElement | null>(null);
	const [formData, setFormData] = useState<Invoice>({
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
		status: "draft",
		total: 0,
	});

	useEffect(() => {
		console.log(formData);
	}, [formData]);

	useEffect(() => {
		const handleEscBtn = (e: KeyboardEvent) => {
			if (overlayRef.current && e.key == "Escape") {
				navigate("/");
			}
		};

		document.addEventListener("keydown", handleEscBtn);

		return () => {
			document.removeEventListener("keydown", handleEscBtn);
		};
	});

	const state = location.state as { backgroundLocation?: Location };

	useEffect(() => {
		if (!state?.backgroundLocation) {
			navigate("/", { replace: true });
		}
	}, [state, navigate]);

	return (
		<div
			className="overlay"
			ref={overlayRef}
			onClick={() => {
				navigate("/");
			}}
		>
			<div
				className="form-cont"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<form className="add-form">
					<h1>New Invoice</h1>
					<section className="sender-address">
						<h3>Bill Form</h3>
						<TextInput
							label="Street Address"
							itemId="input-sender-street"
							value={formData.sender.street}
							onChange={(e) => {
								setFormData((prev) => ({
									...prev,
									sender: {
										...prev.sender,
										street: e.target.value,
									},
								}));
							}}
						/>
						<div className="sender-address-more">
							<TextInput
								label="City"
								itemId="input-sender-city"
								value={formData.sender.city}
								onChange={(e) => {
									setFormData((prev) => ({
										...prev,
										sender: {
											...prev.sender,
											city: e.target.value,
										},
									}));
								}}
							/>
							<TextInput
								label="Post Code"
								itemId="input-sender-postcode"
								value={formData.sender.postcode}
								onChange={(e) => {
									setFormData((prev) => ({
										...prev,
										sender: {
											...prev.sender,
											postcode: e.target.value,
										},
									}));
								}}
							/>
							<TextInput
								label="Country"
								itemId="input-sender-country"
								value={formData.sender.country}
								onChange={(e) => {
									setFormData((prev) => ({
										...prev,
										sender: {
											...prev.sender,
											country: e.target.value,
										},
									}));
								}}
							/>
						</div>
					</section>
					<section className="client-details">
						<h3>Bill To</h3>
						<TextInput
							label="Client's Name"
							itemId="input-client-name"
							value={formData.client.name}
							onChange={(e) => {
								setFormData((prev) => ({
									...prev,
									client: {
										...prev.client,
										name: e.target.value,
									},
								}));
							}}
						/>
						<TextInput
							label="Client's Email"
							itemId="input-client-email"
							value={formData.client.email}
							onChange={(e) => {
								setFormData((prev) => ({
									...prev,
									client: {
										...prev.client,
										email: e.target.value,
									},
								}));
							}}
						/>
						<TextInput
							label="Street Address"
							itemId="input-client-street"
							value={formData.client.address.street}
							onChange={(e) => {
								setFormData((prev) => ({
									...prev,
									client: {
										...prev.client,
										address: {
											...prev.client.address,
											street: e.target.value,
										},
									},
								}));
							}}
						/>
						<div className="client-address-more">
							<TextInput
								label="City"
								itemId="input-client-city"
								value={formData.client.address.city}
								onChange={(e) => {
									setFormData((prev) => ({
										...prev,
										client: {
											...prev.client,
											address: {
												...prev.client.address,
												city: e.target.value,
											},
										},
									}));
								}}
							/>
							<TextInput
								label="Post Code"
								itemId="input-client-postcode"
								value={formData.client.address.postcode}
								onChange={(e) => {
									setFormData((prev) => ({
										...prev,
										client: {
											...prev.client,
											address: {
												...prev.client.address,
												postcode: e.target.value,
											},
										},
									}));
								}}
							/>
							<TextInput
								label="Country"
								itemId="input-client-country"
								value={formData.client.address.country}
								onChange={(e) => {
									setFormData((prev) => ({
										...prev,
										client: {
											...prev.client,
											address: {
												...prev.client.address,
												country: e.target.value,
											},
										},
									}));
								}}
							/>
						</div>
					</section>
					<section className="invoice-details-technical">
						<div className="invoice-dates">dAte</div>
						<TextInput
							itemId="input-desc"
							label="Project Description"
							value={formData.description}
							onChange={(e) => {
								setFormData((prev) => ({
									...prev,
									description: e.target.value,
								}));
							}}
						/>
					</section>
					<section className="item-list-container">
						<h2>Item List</h2>
						<ItemList
							data={formData.items}
							setData={(items) =>
								setFormData((prev) => ({
									...prev,
									items,
									total: items.reduce(
										(sum, i) => sum + i.total,
										0,
									),
								}))
							}
						/>
					</section>
				</form>
			</div>
		</div>
	);
};

export default Add;
