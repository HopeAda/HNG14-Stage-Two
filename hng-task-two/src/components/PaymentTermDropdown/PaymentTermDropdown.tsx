import "./PaymentTermDropdown.css";
import { useState, useEffect, useRef } from "react";
import Caret from "../../assets/caret-down.svg";

type DropdownOption = {
	label: string;
	value: number;
};

export const PaymentTermDropdown: React.FC<{
	options: DropdownOption[];
	onChange: (value: number) => void;
}> = ({ options, onChange }) => {
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const [open, setOpen] = useState(false);

	useEffect(() => {
		const handleOutsideClick = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleOutsideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	const [selected, setSelected] = useState(options[0]);

	const handleSelect = (opt: DropdownOption) => {
		setSelected(opt);
		setOpen(false);
		onChange(opt.value);
	};

	return (
		<div className="dropdown" ref={dropdownRef}>
			<div className="dropdown-header" onClick={() => setOpen(!open)}>
				{selected.label}
				<span className="arrow">
					<img src={Caret} alt="" />
				</span>
			</div>

			{open && (
				<div className="dropdown-list">
					{options.map((opt) => (
						<div
							key={opt.value}
							className={`dropdown-item ${
								opt.value === selected.value ? "active" : ""
							}`}
							onClick={() => handleSelect(opt)}
						>
							{opt.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default PaymentTermDropdown;
