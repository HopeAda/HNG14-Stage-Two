import "./FilterDropdown.css";
import Caret from "../../assets/caret-down.svg";
import { useState, useRef, useEffect } from "react";

type Filter = {
	draft: boolean;
	pending: boolean;
	paid: boolean;
};

const FilterDropdown = () => {
	const [filterConditions, setFilterConditions] = useState<Filter>({
		draft: false,
		pending: false,
		paid: false,
	});

	const filterHandler = (condition: keyof Filter) => {
		setFilterConditions((prev) => ({
			...prev,
			[condition]: !prev[condition],
		}));
	};

	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const [filterOpen, setFilterOpen] = useState(false);

	useEffect(() => {
		const handleOutsideClick = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setFilterOpen(false);
			}
		};
		document.addEventListener("mousedown", handleOutsideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	return (
		<div className={`filter ${filterOpen ? "open" : ""}`} ref={dropdownRef}>
			<button
				className="display"
				onClick={() => {
					setFilterOpen((prev) => !prev);
				}}
			>
				<span className="display-name">Filter by status</span>
				<span className="img-cont">
					<img src={Caret} alt="" />
				</span>
			</button>
			<div className="filter-list">
				<ul>
					<li>
						<input
							type="checkbox"
							name="draft"
							id="draft"
							checked={filterConditions.draft}
							onChange={() => filterHandler("draft")}
						/>
						<label htmlFor="draft">Draft</label>
					</li>

					<li>
						<input
							type="checkbox"
							name="pending"
							id="pending"
							checked={filterConditions.pending}
							onChange={() => filterHandler("pending")}
						/>
						<label htmlFor="pending">Pending</label>
					</li>

					<li>
						<input
							type="checkbox"
							name="paid"
							id="paid"
							checked={filterConditions.paid}
							onChange={() => filterHandler("paid")}
						/>
						<label htmlFor="paid">Paid</label>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default FilterDropdown;
