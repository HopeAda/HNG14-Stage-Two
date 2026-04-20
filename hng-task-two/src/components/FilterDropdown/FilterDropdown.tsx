import "./FilterDropdown.css";
import Caret from "../../assets/caret-down.svg";

const FilterDropdown = () => {
	return (
		<div className="filter">
			<button className="display">
				<span className="display-name">Filter by status</span>
				<span>
					<img src={Caret} alt="" />
				</span>
			</button>
			<div className="filter-list">
				<ul>
					<li>
						<input type="checkbox" name="draft" id="draft" />
						<span>Draft</span>
					</li>

					<li>
						<input type="checkbox" name="pending" id="pending" />
						<span>Pending</span>
					</li>

					<li>
						<input type="checkbox" name="paid" id="paid" />
						<span>Paid</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default FilterDropdown;
