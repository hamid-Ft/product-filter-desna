export interface Option {
  OptionID: number;
  OptionName: string;
}

export interface Filter {
  FilterID: number;
  FilterName: string;
  Options: Option[];
}

export interface Product {
  ProductName: string;
  Stock: boolean;
  Price: number;
  Image: string;
  CategoryID: number;
  Filters: { Filter: number; Option: number }[];
  className?: string;
}

export interface Category {
  CategoryID: number;
  CategoryName: string;
}

export interface Data {
  Products: Product[];
  Filters: Filter[];
  Categories: Category[];
}

export interface RootObject {
  Data: Data;
}
