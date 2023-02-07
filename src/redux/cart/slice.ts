import { CartSliceState, TCartItem } from "./types";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from "../../utils/getCartFromLS";

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


export const { addItem, removeItem, deleteItemFromCart, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
