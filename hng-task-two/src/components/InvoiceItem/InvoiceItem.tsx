import StatusBadge from "../StatusBadge/StatusBadge";
import "./InvoiceItem.css";
import Caret from "../../assets/caret-down.svg";
import type { Invoice } from "../../Context/DataContext";
import { useNavigate } from "react-router-dom";

type ItemProviderProps = {
	data: Invoice;
};

const InvoiceItem = ({ data }: ItemProviderProps) => {
	const navigate = useNavigate();
	return (
		<article
			className="invoice-item"
			onClick={() => {
				navigate(`/details/${data.id}`);
			}}
		>
			<div className="id">
				#<span>{data.id}</span>
			</div>
			<div className="username">{data.client.name || "--"}</div>
			<span className="due-date">
				{new Date(data.dueDate).toLocaleDateString("en-US", {
					day: "numeric",
					month: "short",
					year: "numeric",
				})}
			</span>
			<span className="price">£ {data.total}</span>
			<div className="extra">
				<StatusBadge type={data.status} />
				<img src={Caret} className="open-icon" />
			</div>
		</article>
	);
};

export default InvoiceItem;
