import StatusBadge from "../StatusBadge/StatusBadge";
import "./InvoiceItem.css";
import Caret from "../../assets/caret-down.svg";
import type { Invoice } from "../../Context/DataContext";

type ItemProviderProps = {
	data: Invoice;
};

const InvoiceItem = ({ data }: ItemProviderProps) => {
	return (
		<article className="invoice-item">
			<div className="id">
				#<span>{data.id}</span>
			</div>
			<div className="username">{data.client.name}</div>
			<span className="due-date">Due 19 Aug 2021</span>
			<span className="price">€ 1,800.90</span>
			<div className="extra">
				<StatusBadge type={data.status} />
				<img src={Caret} className="open-icon" />
			</div>
		</article>
	);
};

export default InvoiceItem;
