import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import { setCurrentPage } from '../../redux/filter/slice';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { selectPizzaData } from '../../redux/pizza/selectors';
import { selectFilter } from '../../redux/filter/selectors';


type PaginationProps = {
	itemsPerPage: number
}

const Pagination:React.FC<PaginationProps> = ({ itemsPerPage }) => {
	const {currentPage} = useSelector(selectFilter);
	const {totalItemsCount} = useSelector(selectPizzaData);
	const dispatch = useDispatch();

	const onPageChange = (page:number) => {
		dispatch(setCurrentPage(page));
	};

	return (
		<div className={styles.root}>
			<ReactPaginate
				breakLabel="..."
				nextLabel=">"
				onPageChange={(event) => onPageChange(event.selected + 1)}
				pageRangeDisplayed={itemsPerPage}
				pageCount={Math.ceil(totalItemsCount / itemsPerPage)}
				previousLabel="<"
				forcePage={currentPage - 1}
			/>
		</div>
	);
};

export default Pagination;
