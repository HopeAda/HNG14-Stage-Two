import "./Banner.css";

const BannerInvoiceItem = () => {
	return (
		<article className="banner-item">
			<div className="details-info">
				<span className="name">Banner Design</span>
				<span className="qty">1 x $ 156.00</span>
			</div>
			<div className="item-total">$ 156.00</div>
		</article>
	);
};

const Banner = () => {
	return (
		<section className="total-banner">
			<div className="banner-invoice-list">
				<BannerInvoiceItem />
				<BannerInvoiceItem />
			</div>
			<div className="total">
				<span className="title">Amount Due</span>
				<span className="total-price">$ 566.00</span>
			</div>
		</section>
	);
};

export default Banner;
