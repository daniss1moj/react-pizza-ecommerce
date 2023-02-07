import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
const PizzaPage: React.FC = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [pizza, setPizza] = useState<{
		imageUrl: string,
		title: string,
		price: number,
	}>();
	useEffect(() => {
		async function fetchPizza() {
			try {
				const response = await axios.get(
					`https://637bbe7b6f4024eac2174f3a.mockapi.io/pizzas/${id}`,
				);
				const { data } = response;
				setPizza(data.items);
			} catch (error) {
				alert('Ошибка при получении пиццы');
				navigate('/');
			}
		}
		fetchPizza();
	}, []);

	if (!pizza) {
		return <h2>Идет загрузка</h2>;
	}

	return (
		<div className="container">
			<img src={pizza.imageUrl} alt="pizza" />
			<h2>{pizza.title}</h2>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur animi
				blanditiis voluptas magni vitae. Iusto ipsam, ea explicabo, culpa nisi est laborum,
				obcaecati cum laboriosam sapiente voluptatibus unde. Sequi, expedita?{' '}
			</p>
			<h4>{pizza.price} UAH</h4>
		</div>
	);
};

export default PizzaPage;
