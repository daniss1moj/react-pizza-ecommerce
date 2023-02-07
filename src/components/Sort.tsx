import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType, setOrderType } from '../redux/filter/slice';
import { TSort } from '../redux/filter/type';
import React from 'react';
import { selectFilter } from '../redux/filter/selectors';

export const sortNames: TSort[] = [
	{ name: 'rating', sortProperty: 'rating' },
	{ name: 'price', sortProperty: 'price' },
	{ name: 'a-z', sortProperty: 'title' },
];

const Sort: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);
	const sortRef = useRef<HTMLDivElement>(null);
	const { sort, orderType } = useSelector(selectFilter);
	const dispatch = useDispatch();

	const onClickSortName = (obj: TSort) => {
		dispatch(setSortType(obj));
		setIsVisible(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
				setIsVisible(false);
			}
		};
		document.body.addEventListener('click', handleClickOutside);
		return () => {
			document.body.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<div className="sort" ref={sortRef}>
			<div className="sort__label" onClick={() => setIsVisible((isVisible) => !isVisible)}>
				<svg
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
				</svg>
				<b>Sort by:</b>
				<span>{sort.name}</span>
			</div>
			<div className="order-buttons">
				<button
					className={orderType === 'asc' ? 'active' : ''}
					onClick={() => dispatch(setOrderType('asc'))}>
					↑
				</button>
				<button
					className={orderType === 'desc' ? 'active' : ''}
					onClick={() => dispatch(setOrderType('desc'))}>
					↓
				</button>
			</div>
			{isVisible && (
				<div className="sort__popup">
					<ul>
						{sortNames.map((obj, i) => {
							return (
								<li
									key={obj.name}
									className={
										obj.sortProperty === sort.sortProperty ? 'active' : ''
									}
									onClick={() => onClickSortName(obj)}>
									{obj.name}
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
};

export default React.memo(Sort);
