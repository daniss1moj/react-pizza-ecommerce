import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchPizzasArgs, PizzaItem, PizzaSliceState, ResponseData, Status } from './type';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (params:fetchPizzasArgs, { dispatch }) => {
	const { category, sortBy, order, search, currentPage, itemsPerPage } = params;
	const response = await axios.get<ResponseData>(
		`https://637bbe7b6f4024eac2174f3a.mockapi.io/pizzas?page=${currentPage}&limit=${itemsPerPage}&${category}&sortBy=${sortBy}&order=${order}&${search}`,
	);
	dispatch(setTotalItemsCount(response.data.count));
	return response.data.items as PizzaItem[];
});


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
			state.items = action.payload
			state.status = Status.SUCCESS;
		})
		builder.addCase(fetchPizzas.rejected, (state, action) => {
			state.status = Status.ERROR;
			state.items = [];
		})
	}
});


export const { setItems, setTotalItemsCount } = pizzaSlice.actions;

export default pizzaSlice.reducer;
