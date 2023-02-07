import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/filter/slice';
import React from 'react';
import { RootState } from '../redux/store';
const Categories: React.FC = () => {
	const categories = ['All', 'Meaty', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

	const dispatch = useDispatch();
	const activeCategoryId = useSelector((state: RootState) => state.filter.categoryId);

	const onChangeCategory = (id: number) => {
		dispatch(setCategoryId(id));
	};

	return (
		<div className="categories">
			<ul>
				{categories.map((category, index) => {
					return (
						<li
							key={category}
							className={activeCategoryId === index ? 'active' : ''}
							onClick={() => onChangeCategory(index)}>
							{category}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Categories;
