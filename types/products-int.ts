export interface ProductInt {
  id: string,
  name: string,
  image: string,
  price: string,
  rating: number,
}

export interface ProductsResInt {
  items: ProductInt[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface PaginationParamsInt {
  [param: string]: string| number| boolean| ReadonlyArray<string | number | boolean>;
  page: number;
  perPage: number;
}