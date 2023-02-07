import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components';
import qs from 'qs';
import { selectFilter } from '../redux/filter/selectors';
import { setFilters } from '../redux/filter/slice';
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { sortNames } from '../components/Sort';
import { selectPizzaData } from '../redux/pizza/selectors';
import { fetchPizzas } from '../redux/pizza/slice';
import { useAppDispatch } from '../redux/store';

const MainPage: React.FC = () => {
	const { categoryId, sort, orderType, currentPage, searchValue } = useSelector(selectFilter);
	const { items, status } = useSelector(selectPizzaData);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const itemsPerPage = 4;
	const getPizzas = async () => {
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const sortBy = sort.sortProperty.replace('-', '');
		const order = orderType;
		const search = searchValue ? `search=${searchValue}` : '';

		dispatch(
			fetchPizzas({
				category,
				sortBy,
				order,
				search,
				currentPage,
				itemsPerPage,
			}),
		);
	};

	// При изминении параметров после первого рендера  вшиваем параметры фильтрации в URL из Redux store
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
				orderType,
				search: searchValue,
			});
			navigate(`?${queryString}`);
		}

		isMounted.current = true;
	}, [categoryId, sort.sortProperty, currentPage, orderType, searchValue]);

	// При первом рендере при перезагрузке страницы в случаи наличия параметров в URL сохраняем ИХ В Redux store из URL
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortNames.find((sort) => sort.sortProperty === params.sortProperty);

			dispatch(
				setFilters({
					categoryId: Number(params.categoryId),
					sort: sort || sortNames[0],
					orderType: String(params.orderType),
					currentPage: Number(params.currentPage),
					searchValue: String(params.search),
				}),
			);

			isSearch.current = true;
		}
	}, []);

	// Заппрашиваем пиццы при первым рендере если адресная строка пустая, в случае если в адресной строке есть параметры то сохраняем параметры из URL в Redux store, из Redux store в URL комплнент делает перерендер и запрошиваем пиццы
	useEffect(() => {
		// window.scrollTo(0, 0);
		if (!isSearch.current) {
			getPizzas();
		}

		isSearch.current = false;
	}, [categoryId, sort.sortProperty, currentPage, searchValue, orderType]);

	const pizzas = items.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />);

	const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
	const errorMessage = (
		<div className="content__error-info">
			<h2>
				An error has occurred <span>😕</span>
			</h2>
		</div>
	);
	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">All pizzas</h2>
			{status === 'error' ? (
				errorMessage
			) : (
				<div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
			)}
			<Pagination itemsPerPage={itemsPerPage} />
		</div>
	);
};

export default MainPage;
