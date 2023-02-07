export type TSort = {
	name: string,
	sortProperty: 'rating' | 'price' | 'title'
}

export interface FilterSliceState {
	categoryId: number,
	sort: TSort,
	orderType: string ,
	currentPage: number,
	searchValue: string,
}
