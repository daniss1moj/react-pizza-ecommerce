import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type fetchPizzasArgs = {
	category: string,
	sortBy: string,
	order: string,
	search: string,
	currentPage: number,
	itemsPerPage: number
} 
type ResponseData = {
	items: PizzaItem[],
	count: number
}
export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (params:fetchPizzasArgs, { dispatch }) => {
	const { category, sortBy, order, search, currentPage, itemsPerPage } = params;
	const response = await axios.get<ResponseData>(
		`https://637bbe7b6f4024eac2174f3a.mockapi.io/pizzas?page=${currentPage}&limit=${itemsPerPage}&${category}&sortBy=${sortBy}&order=${order}&${search}`,
	);
	dispatch(setTotalItemsCount(response.data.count));
	return response.data.items as PizzaItem[];
});

type PizzaItem = {
	id: string,
	title: string,
	price: number,
	imageUrl: string,
	sizes: number[],
	types: number[],
	rating: number
}
enum Status  {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

interface PizzaSliceState {
	items: PizzaItem[],
	status: Status,
	totalItemsCount: number,
}

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
	totalItemsCount: 0,
};

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<PizzaItem[]>) {
			state.items = action.payload;
		},
		setTotalItemsCount(state, action: PayloadAction<number>) {
			state.totalItemsCount = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state, action) => {
			state.status = Status.LOADING;
			state.items = [];
		})
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		})
		builder.addCase(fetchPizzas.rejected, (state, action) => {
			state.status = Status.ERROR;
			state.items = [];
		})
	}
	// extraReducers: {
	// 	[fetchPizzas.pending]: (state) => {
	// 		state.status = 'loading';
	// 		state.items = [];
	// 	},
	// 	[fetchPizzas.fulfilled]: (state, action) => {
	// 		state.items = action.payload;
	// 		state.status = 'success';
	// 	},
	// 	[fetchPizzas.rejected]: (state) => {
	// 		state.status = 'error';
	// 		state.items = [];
	// 	},
	// },
});

export const selectPizzaData = (state:RootState) => state.pizza;

export const { setItems, setTotalItemsCount } = pizzaSlice.actions;

export default pizzaSlice.reducer;
