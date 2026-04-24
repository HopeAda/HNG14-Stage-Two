import type { Invoice } from "../../Context/DataContext";
import "./Banner.css";

type BannerProps = {
	data: Invoice["items"];
	total: number;
};

type BannerItemProps = {
	data: Invoice["items"][number];
};

const BannerInvoiceItem = ({ data }: BannerItemProps) => {
	return (
		<article className="banner-item">
			<div className="details-info">
				<span className="name">{data.name}</span>
				<span className="qty">
					{data.qty} x £ {data.price.toLocaleString('en-US')}
				</span>
			</div>
			<div className="item-total">£ {data.total.toLocaleString('en-US')}</div>
		</article>
	);
};

const Banner = ({ data, total }: BannerProps) => {
	return (
		<section className="total-banner">
			<div className="banner-invoice-list">
				{data.map((itm) => (
					<BannerInvoiceItem key={itm.id} data={itm} />
				))}
			</div>
			<div className="total">
				<span className="title">Amount Due</span>
				<span className="total-price">£ {total.toLocaleString('en-US')}</span>
			</div>
		</section>
	);
};

export default Banner;
