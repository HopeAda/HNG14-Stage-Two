import type { Invoice } from "../../Context/DataContext";
import "./InvoiceForm.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import TextInput from "../TextInput/TextInput";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import DataContext from "../../Context/DataContext";
import PaymentTermDropdown from "../PaymentTermDropdown/PaymentTermDropdown";
import DatePicker from "../DatePicker/DatePicker";

type InvoiceFormProps = {
	mode: "add" | "edit";
	initialData: Invoice;
};

type InputErrors = {
	clientName: boolean;
	clientStreet: boolean;
	clientCity: boolean;
	clientPostCode: boolean;
	clientCountry: boolean;
	projectDescription: boolean;
	senderStreet: boolean;
	senderCity: boolean;
	senderPostCode: boolean;
	senderCountry: boolean;
	clientEmail: boolean;
};

const InvoiceForm = ({ mode, initialData }: InvoiceFormProps) => {
	const location = useLocation();
	const navigate = useNavigate();
	const overlayRef = useRef<HTMLDivElement | null>(null);
	const ctx = useContext(DataContext);
	const generateInvoiceId = (): string => {
		return (
			Math.random().toString(36).substring(2, 4) + // letters
			Math.floor(1000 + Math.random() * 9000)
		);
	};

	const [formData, setFormData] = useState<Invoice>(initialData);

	useEffect(() => {
		setFormData(initialData);
	}, [initialData]);

	const [errors, setErrors] = useState({
		emailError: false,
		requiredFieldsError: false,
		itemError: false,
		inputErrors: {
			clientName: false,
			clientStreet: false,
			clientCity: false,
			clientPostCode: false,
			clientCountry: false,
			projectDescription: false,
			senderStreet: false,
			senderCity: false,
			senderPostCode: false,
			senderCountry: false,
			clientEmail: false,
		},
	});

	const isValidEmail = (email: string) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const validateForm = () => {
		let emailError = false;
		let requiredError = false;
		let itemError = false;

		if (!isValidEmail(formData.client.email)) {
			emailError = true;
		}

		if (
			!formData.client.name ||
			!formData.client.email ||
			!formData.sender.street ||
			!formData.items.length
		) {
			requiredError = true;
		}

		if (formData.items.length == 0) {
			itemError = true;
		}

		const fieldMap = {
			clientName: formData.client.name,
			clientStreet: formData.client.address.street,
			clientCity: formData.client.address.city,
			clientPostCode: formData.client.address.postcode,
			clientCountry: formData.client.address.country,
			projectDescription: formData.description,
			senderStreet: formData.sender.street,
			senderCity: formData.sender.city,
			senderPostCode: formData.sender.postcode,
			senderCountry: formData.sender.country,
			clientEmail: formData.client.email,
		};

		const inputErrors = Object.fromEntries(
			Object.entries(fieldMap).map(([key, value]) => [
				key,
				!value || value.trim() === "",
			]),
		) as InputErrors;

		setErrors({
			emailError,
			requiredFieldsError: requiredError,
			itemError,
			inputErrors,
		});

		return !emailError && !requiredError;
	};

	const dueDate = (() => {
		const createdDate = new Date(formData.dateCreated);

		createdDate.setHours(0, 0, 0, 0);

		createdDate.setDate(createdDate.getDate() + formData.paymentTerm);

		return createdDate.toISOString();
	})();

	useEffect(() => {
		const handleEscBtn = (e: KeyboardEvent) => {
			if (overlayRef.current && e.key == "Escape") {
				navigate(-1);
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

	const hasAtLeastOneValue = () => {
		const values = [
			formData.client.name,
			formData.client.email,
			formData.client.address.street,
			formData.client.address.city,
			formData.client.address.postcode,
			formData.client.address.country,
			formData.sender.street,
			formData.sender.city,
			formData.sender.postcode,
			formData.sender.country,
			formData.description,
		];

		return (
			values.some((val) => val.trim() !== "") || formData.items.length > 0
		);
	};

	const canSaveDraft = hasAtLeastOneValue();

	return (
		<div
			className="overlay"
			ref={overlayRef}
			onClick={() => {
				navigate(-1);
			}}
		>
			<div
				className="form-cont"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<form className="add-form">
					<h1>
						{mode == "add" ? "New Invoice" : `Edit #${formData.id}`}
					</h1>
					<section className="sender-address">
						<h3>Bill Form</h3>
						<TextInput
							label="Street Address"
							itemId="input-sender-street"
							value={formData.sender.street}
							error={errors.inputErrors.senderStreet}
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
								error={errors.inputErrors.senderCity}
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
								error={errors.inputErrors.senderPostCode}
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
								error={errors.inputErrors.senderCountry}
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
							error={errors.inputErrors.clientName}
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
							emailerror={errors.emailError}
							error={errors.inputErrors.clientEmail}
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
							error={errors.inputErrors.clientStreet}
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
								error={errors.inputErrors.clientCity}
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
								error={errors.inputErrors.clientPostCode}
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
								error={errors.inputErrors.clientCountry}
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
						<div className="invoice-dates">
							<div>
								<span>Invoice Date</span>
								<DatePicker
									onChange={(val) => {
										setFormData((prev) => {
											return {
												...prev,
												dateCreated: val,
											};
										});
									}}
								/>
							</div>
							<div>
								<span>Payment Terms</span>
								<PaymentTermDropdown
									options={[
										{ label: "Net 1 Day", value: 1 },
										{ label: "Net 7 Days", value: 7 },
										{ label: "Net 14 Days", value: 14 },
										{ label: "Net 30 Days", value: 30 },
									]}
									onChange={(val) => {
										setFormData((prev) => {
											return {
												...prev,
												paymentTerm: val,
											};
										});
									}}
								/>
							</div>
						</div>
						<TextInput
							itemId="input-desc"
							label="Project Description"
							error={errors.inputErrors.projectDescription}
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
										(sum, i) => sum + i.qty * i.price,
										0,
									),
								}))
							}
						/>
					</section>

					<section className="error-msgs">
						<p
							className={`field-error ${errors.requiredFieldsError ? "show" : ""}`}
						>
							-All fields must be added
						</p>
						<p
							className={`item-error ${errors.itemError ? "show" : ""}`}
						>
							-An item must be added
						</p>
					</section>

					{mode == "add" ? (
						<section className="buttons">
							<div>
								<Button
									name={"discard"}
									clickHandler={() => {
										navigate("/");
									}}
								/>
							</div>
							<div>
								<Button
									name={"Save as Draft"}
									disabled={!canSaveDraft}
									clickHandler={() => {
										const createdDate = new Date(
											formData.dateCreated,
										);
										createdDate.setHours(0, 0, 0, 0);
										createdDate.setDate(
											createdDate.getDate() +
												formData.paymentTerm,
										);
										const dueDate =
											createdDate.toISOString();
										ctx?.addInvoice({
											...formData,
											status: "draft",
											id: generateInvoiceId(),
											dueDate,
										});
										navigate("/");
									}}
								/>
								<Button
									name={"save & send"}
									clickHandler={() => {
										if (!validateForm()) return;

										const createdDate = new Date(
											formData.dateCreated,
										);
										createdDate.setHours(0, 0, 0, 0);
										createdDate.setDate(
											createdDate.getDate() +
												formData.paymentTerm,
										);
										const dueDate =
											createdDate.toISOString();

										const totalAmount =
											formData.items.reduce(
												(sum, i) =>
													sum + i.qty * i.price,
												0,
											);
										ctx?.addInvoice({
											...formData,
											status: "pending",
											id: generateInvoiceId(),
											dueDate,
											total: totalAmount,
										});
										navigate("/");
									}}
								/>
							</div>
						</section>
					) : (
						<section className="buttons edit">
							<Button
								name="cancel"
								clickHandler={() => {
									navigate(-1);
								}}
							/>
							<Button
								name="save changes"
								clickHandler={() => {
									if (!validateForm()) return;

									ctx?.editInvoice(formData.id, {
										...formData,
										status: "pending",
									});
									navigate(-1);
								}}
							/>
						</section>
					)}
				</form>
			</div>
		</div>
	);
};

export default InvoiceForm;
