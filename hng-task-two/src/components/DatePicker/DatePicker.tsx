import "./DatePicker.css";
import { useState, useEffect, useRef } from "react";
import Caret from "../../assets/caret-down.svg";
import Calendar from "../../assets/calendar.svg";

const getDaysInMonth = (year: number, month: number) => {
	return new Date(year, month + 1, 0).getDate();
};

const DatePicker: React.FC<{
	onChange: (iso: string) => void;
}> = ({ onChange }) => {
	const today = new Date();

	const [open, setOpen] = useState(false);
	const [current, setCurrent] = useState(today);
	const [selected, setSelected] = useState<Date | null>(today);

	const year = current.getFullYear();
	const month = current.getMonth();

	const daysInMonth = getDaysInMonth(year, month);

	const handleSelect = (day: number) => {
		const date = new Date(year, month, day);

		// Normalize to midnight (important)
		date.setHours(0, 0, 0, 0);

		setSelected(date);
		setOpen(false);

		onChange(date.toISOString());
	};

	const changeMonth = (dir: number) => {
		setCurrent(new Date(year, month + dir, 1));
	};

	const dropdownRef = useRef<HTMLDivElement | null>(null);

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

	return (
		<div className="datepicker" ref={dropdownRef}>
			<div className="datepicker-input" onClick={() => setOpen(!open)}>
				{selected
					? selected.toLocaleDateString("en-GB", {
							day: "2-digit",
							month: "short",
							year: "numeric",
						})
					: "Select Date"}
				<span className="calendar-icon">
					<img src={Calendar} alt="" />
				</span>
			</div>

			{open && (
				<div className="calendar">
					<div className="calendar-header">
						<button type="button" onClick={() => changeMonth(-1)}>
							<img
								src={Caret}
								alt=""
								style={{ transform: "rotate(90deg)" }}
							/>
						</button>
						<span>
							{current.toLocaleString("default", {
								month: "short",
							})}{" "}
							{year}
						</span>
						<button type="button" onClick={() => changeMonth(1)}>
							<img
								src={Caret}
								alt=""
								style={{ transform: "rotate(270deg)" }}
							/>
						</button>
					</div>

					<div className="calendar-grid">
						{[...Array(daysInMonth)].map((_, i) => {
							const day = i + 1;

							const isSelected =
								selected &&
								selected.getDate() === day &&
								selected.getMonth() === month &&
								selected.getFullYear() === year;

							return (
								<div
									key={day}
									className={`day ${isSelected ? "selected" : ""}`}
									onClick={() => handleSelect(day)}
								>
									{day}
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default DatePicker;
