import "./Button.css";

type buttonProviderProps = {
	name: string; // edit , delete or mark as paid
	// operation: (id: string) => void;
	// id: string;
};

const Button = ({ name }: buttonProviderProps) => {
	return (
		<div className={`button ${name !== "Mark as Paid" ? name : "mark"}`}>
			{name}
		</div>
	);
};

export default Button;
