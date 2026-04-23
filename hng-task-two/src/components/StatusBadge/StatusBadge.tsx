import "./StatusBadge.css";
import type { Status } from "../../Context/DataContext";

type statusProps = {
	type: Status;
};

const StatusBadge = ({ type }: statusProps) => {
	return (
		<div className={`status-badge ${type}`}>
			<span className="dot"></span>
			<span className="status">{type}</span>
		</div>
	);
};

export default StatusBadge;
