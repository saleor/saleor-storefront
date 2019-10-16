interface Attributes {
  [key: string]: string[];
}
export interface IFilters {
  attributes: Attributes;
  pageSize: number;
  sortBy: string;
  priceLte: number;
  priceGte: number;
}
