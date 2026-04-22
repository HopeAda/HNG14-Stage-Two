import "./TextInput.css";

type InputProviderProps = {
	label: string;
	itemId: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextInput = ({ label, itemId, ...props }: InputProviderProps) => {
	return (
		<div className={`text-input ${itemId}`}>
			<label htmlFor={itemId}>{label}</label>
			<input id={itemId} name={itemId} {...props} />
		</div>
	);
};

export default TextInput;
