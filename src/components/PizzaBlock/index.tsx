import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../../redux/cart/slice';
import { Link } from 'react-router-dom';
import React from 'react';
import { selectCartItemById } from '../../redux/cart/selectors';
import { TCartItem } from '../../redux/cart/types';

type PizzaBlockProps = {
	id: string;
	imageUrl: string;
	title: string;
	types: string[];
	sizes: number[];
	price: number;
};

const typesPizza = ['thin', 'traditional'];
const sizesPizza = [26, 30, 40];

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, imageUrl, title, types, sizes, price }) => {
	const cartItem = useSelector(selectCartItemById(id));
	const currentCount = cartItem ? cartItem.count : 0;

	const dispatch = useDispatch();

	const [activeTypeId, setActiveTypeId] = useState(0);
	const [activeSizeId, setActiveSizeId] = useState(0);

	const onClickAdd = () => {
		const obj: TCartItem = {
			id,
			imageUrl,
			title,
			price,
			type: typesPizza[activeTypeId],
			size: sizesPizza[activeSizeId],
			count: 0,
		};
		dispatch(addItem(obj));
	};

	return (
		<div className="pizza-block">
			<Link to={`/pizzas/${id}`}>
				<img className="pizza-block__image" src={imageUrl} alt="Pizza" />
				<h4 className="pizza-block__title">{title}</h4>
			</Link>
			<div className="pizza-block__selector">
				<ul>
					{types.map((type, index) => {
						return (
							<li
								key={type}
								className={activeTypeId === index ? 'active' : ''}
								onClick={() => setActiveTypeId(index)}>
								{typesPizza[index]}
							</li>
						);
					})}
				</ul>
				<ul>
					{sizes.map((size, index) => {
						return (
							<li
								key={index}
								className={activeSizeId === index ? 'active' : ''}
								onClick={() => setActiveSizeId(index)}>
								{size} см.
							</li>
						);
					})}
				</ul>
			</div>
			<div className="pizza-block__bottom">
				<div className="pizza-block__price">{price} UAH</div>
				<button className="button button--outline button--add" onClick={onClickAdd}>
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
							fill="white"
						/>
					</svg>
					<span>Add</span>
					<i>{currentCount > 0 ? currentCount : 0}</i>
				</button>
			</div>
		</div>
	);
};

export default PizzaBlock;
