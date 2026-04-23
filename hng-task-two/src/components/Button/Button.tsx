import "./Button.css";

type buttonProviderProps = {
	name: string; // edit , delete or mark as paid
	clickHandler?: () => void;
	type?: "button" | "submit";
	disabled?: boolean;
	// operation: (id: string) => void;
	// id: string;
};

const Button = ({
	name,
	clickHandler,
	type,
	disabled,
}: buttonProviderProps) => {
	let className;
	if (name === "Mark as Paid") {
		className = "mark";
	} else if (name === "save & send") {
		className = "save-send";
	} else if (name === "Save as Draft") {
		className = "save-draft";
	} else if (name == "save changes") {
		className = "save-changes";
	} else {
		className = name;
	}

	return (
		<button
			className={`button ${className}`}
			onClick={clickHandler}
			disabled={disabled}
			type={type || "button"}
		>
			{name}
		</button>
	);
};

export default Button;
