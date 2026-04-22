import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ItemList from "../../components/ItemList/ItemList";
import TextInput from "../../components/TextInput/TextInput";
import "./Add.css";
import { useNavigate } from "react-router-dom";

const Add = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const overlayRef = useRef<HTMLDivElement | null>(null);

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
						/>
						<div className="sender-address-more">
							<TextInput
								label="City"
								itemId="input-sender-city"
							/>
							<TextInput
								label="Post Code"
								itemId="input-sender-postcode"
							/>
							<TextInput
								label="Country"
								itemId="input-sender-country"
							/>
						</div>
					</section>
					<section className="client-details">
						<h3>Bill To</h3>
						<TextInput
							label="Client's Name"
							itemId="input-client-name"
						/>
						<TextInput
							label="Client's Email"
							itemId="input-client-email"
						/>
						<TextInput
							label="Street Address"
							itemId="input-client-street"
						/>
						<div className="client-address-more">
							<TextInput
								label="City"
								itemId="input-client-city"
							/>
							<TextInput
								label="Post Code"
								itemId="input-client-postcode"
							/>
							<TextInput
								label="Country"
								itemId="input-client-country"
							/>
						</div>
					</section>
					<section className="invoice-details-technical">
						<div className="invoice-dates">dAte</div>
						<TextInput
							itemId="input-desc"
							label="Project Description"
						/>
					</section>
					<section className="item-list-container">
						<h2>Item List</h2>
						<ItemList />
					</section>
				</form>
			</div>
		</div>
	);
};

export default Add;
