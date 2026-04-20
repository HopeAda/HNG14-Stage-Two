import StatusBadge from "../StatusBadge/StatusBadge";
import "./InvoiceItem.css";
import Caret from "../../assets/caret-down.svg";

const InvoiceItem = () => {
	return (
		<article className="invoice-item">
			<div className="id">
				#<span>RT3080</span>
			</div>
			<div className="username">Jensen Huang</div>
			<span className="due-date">Due 19 Aug 2021</span>
			<span className="price">€ 1,800.90</span>
			<div className="extra">
				<StatusBadge />
				<img src={Caret} className="open-icon" />
			</div>
		</article>
	);
};

export default InvoiceItem;
