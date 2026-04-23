import "./ItemList.css";
import Trash from "../../assets/trash.svg";
import TextInput from "../TextInput/TextInput";
import type { Invoice } from "../../Context/DataContext";

type ItemListProps = {
	data: Invoice["items"];
	setData: (items: Invoice["items"]) => void;
};

type ItemListItemProps = {
	item: Invoice["items"][number];
	index: number;
	updateItem: (index: number, item: Invoice["items"][number]) => void;
	deleteItem: (index: number) => void;
};

const ItemListItem = ({
	item,
	index,
	updateItem,
	deleteItem,
}: ItemListItemProps) => {
	return (
		<div className="item-list-item">
			<TextInput
				label="Item Name"
				itemId={`input-name`}
				value={item.name}
				onChange={(e) => {
					updateItem(index, { ...item, name: e.target.value });
				}}
			/>
			<TextInput
				label="Qty."
				itemId="input-qty"
				value={item.qty}
				onChange={(e) => {
					updateItem(index, { ...item, qty: Number(e.target.value) });
				}}
			/>
			<TextInput
				label="Price"
				itemId="input-price"
				value={item.price}
				onChange={(e) => {
					updateItem(index, {
						...item,
						price: Number(e.target.value),
					});
				}}
			/>
			<span className="total">
				<label htmlFor="calc-total">Total</label>
				<p id={`calc-total-${index}`}>{item.total.toFixed(2)}</p>
			</span>
			<button
				className="delete-item"
				onClick={() => deleteItem(index)}
				type="button"
			>
				<img src={Trash} alt="delete-button" />
			</button>
		</div>
	);
};

const ItemList = ({ data, setData }: ItemListProps) => {
	const addItem = () => {
		setData([
			...data,
			{ id: crypto.randomUUID(), name: "", qty: 0, price: 0, total: 0 },
		]);
	};

	const updateItem = (
		index: number,
		updatedItem: Invoice["items"][number],
	) => {
		const newItems = [...data];
		newItems[index] = {
			...updatedItem,
			total: updatedItem.qty * updatedItem.price,
		};
		setData(newItems);
	};

	const deleteItem = (index: number) => {
		setData(data.filter((_, id) => id !== index));
	};

	return (
		<div className="item-list">
			<div className="header">
				<span className="item-name">Item Name</span>
				<span className="qty">Qty.</span>
				<span className="price">Price</span>
				<span className="total">Total</span>
			</div>
			<div className="body">
				{data.map((itm, index) => (
					<ItemListItem
						index={index}
						key={itm.id}
						item={itm}
						deleteItem={deleteItem}
						updateItem={updateItem}
					/>
				))}
			</div>

			<button className="add-item" onClick={addItem} type="button">
				+ Add New Item
			</button>
		</div>
	);
};

export default ItemList;
