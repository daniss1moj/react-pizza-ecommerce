import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TSort = {
	name: string,
	sortProperty: 'rating' | 'price' | 'title'
}

interface FilterSliceState {
	categoryId: number,
	sort: TSort,
	orderType: string,
	currentPage: number,
	searchValue: string,
}

const initialState: FilterSliceState = {
	categoryId: 0,
	sort: {
		name: 'популярности',
		sortProperty: 'rating',
	},
	orderType: 'asc',
	currentPage: 1,
	searchValue: '',
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		setSortType(state, action: PayloadAction<TSort>) {
			state.sort = action.payload;
		},
		setOrderType(state, action: PayloadAction<string>) {
			state.orderType = action.payload;
		},
		setCurrentPage(state, action:PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setFilters(state, action: PayloadAction<FilterSliceState>) {
			state.currentPage = Number(action.payload.currentPage);
			state.sort = action.payload.sort;
			state.categoryId = Number(action.payload.categoryId);
			state.orderType = action.payload.orderType
			state.searchValue = action.payload.searchValue
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
	},
});

export const {
	setCategoryId,
	setSortType,
	setOrderType,
	setCurrentPage,
	setFilters,
	setSearchValue,
} = filterSlice.actions;

export const selectFilter = (state:RootState) => state.filter

export default filterSlice.reducer;
