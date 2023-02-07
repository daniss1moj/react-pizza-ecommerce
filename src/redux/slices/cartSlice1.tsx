import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getCartFromLS } from '../../utils/getCartFromLS';

export type TCartItem = {
	id:string,
	title: string,
	price: number,
	imageUrl: string,
	type: string,
	size: number,
	count: number
}

interface CartSliceState {
	totalPrice: number,
	items: TCartItem[],
	totalCount: number
}

const {totalPrice, items, totalCount} = getCartFromLS()

const initialState:CartSliceState = {
	totalPrice,
	items,
	totalCount
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<TCartItem>) {
			const existingItem = state.items.find((item) => item.id === action.payload.id);
			if (existingItem) {
				existingItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}
			state.totalPrice = state.items.reduce((sum, curr) => {
				return sum + Math.ceil(curr.price * curr.count);
			}, 0);
			state.totalCount = state.items.reduce((sum, curr) => {
				return sum + curr.count;
			}, 0);
		},
		removeItem(state, action:PayloadAction<string>) {
			const existingItem = state.items.find((item) => item.id === action.payload);
			if (existingItem) {
				if (existingItem.count === 1) {
					state.items = state.items.filter((obj) => obj.id !== action.payload);
				} else {
					 existingItem.count--;
				}
				state.totalPrice = state.totalPrice - existingItem.price;
				state.totalCount = state.items.reduce((sum, curr) => {
					return sum + curr.count;
				}, 0);
			}
		},
		deleteItemFromCart(state, action:PayloadAction<string>) {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},
		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
			state.totalCount = 0;
		},
	},
});

export const selectCart = (state:RootState) => state.cart;
export const selectCartItemById = (id:string) => (state:RootState) => state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, deleteItemFromCart, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
