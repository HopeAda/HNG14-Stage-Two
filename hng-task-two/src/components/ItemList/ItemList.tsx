import "./ItemList.css";
import Trash from "../../assets/trash.svg";
import TextInput from "../TextInput/TextInput";

const ItemListItem = () => {
	return (
		<div className="item-list-item">
			<TextInput label="Item Name" itemId="input-name" />
			<TextInput label="Qty." itemId="input-qty" />
			<TextInput label="Price" itemId="input-price" />
			<span className="total">
				<label htmlFor="calc-total">Total</label>
				<p id="calc-total">156.00</p>
			</span>
			<button className="delete-item">
				<img src={Trash} alt="delete-button" />
			</button>
		</div>
	);
};

const ItemList = () => {
	return (
		<div className="item-list">
			<div className="header">
				<span className="item-name">Item Name</span>
				<span className="qty">Qty.</span>
				<span className="price">Price</span>
				<span className="total">Total</span>
			</div>
			<div className="body">
				<ItemListItem />
				<ItemListItem />
			</div>

			<button className="add-item">+ Add New Item</button>
		</div>
	);
};

export default ItemList;
