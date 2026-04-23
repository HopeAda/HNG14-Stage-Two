import "./TextInput.css";

type InputProviderProps = {
	label: string;
	itemId: string;
	error?: boolean;
	emailerror?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextInput = ({
	label,
	itemId,
	error,
	emailerror,
	...props
}: InputProviderProps) => {
	return (
		<div
			className={`text-input ${itemId} ${error || emailerror ? "error" : ""}`}
		>
			<div>
				<label htmlFor={itemId}>{label}</label>
				<p className="err-msg">
					{error
						? "can't be empty"
						: emailerror
							? "invalid email"
							: "can't be empty"}
				</p>
			</div>
			<input id={itemId} name={itemId} {...props} />
		</div>
	);
};

export default TextInput;
