export type fetchPizzasArgs = {
	category: string,
	sortBy: string,
	order: string,
	search: string,
	currentPage: number,
	itemsPerPage: number
} 
export type ResponseData = {
	items: PizzaItem[],
	count: number
}

export type PizzaItem = {
	id: string,
	title: string,
	price: number,
	imageUrl: string,
	sizes: number[],
	types: number[],
	rating: number
}
export enum Status  {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

export interface PizzaSliceState {
	items: PizzaItem[],
	status: Status,
	totalItemsCount: number,
}