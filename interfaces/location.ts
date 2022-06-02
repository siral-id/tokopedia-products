export interface ITokopediaFilterSortProductFilterSearch {
  searchable: number;
  placeholder: string;
}

export interface ITokopediaFilterSortProductFilterOption {
  name: string;
  Description: string;
  key: string;
  icon: string;
  value: string;
  inputType: string;
  totalData: string;
  valMax: string;
  valMin: string;
  hexColor: string;
  child: string[];
  isPopular: boolean;
  isNew: boolean;
}

export interface ITokopediaFilterSortProductSort {
  name: string;
  key: string;
  value: string;
  inputType: string;
  applyFilter: string;
}

export interface ITokopediaFilterSortProductFilter {
  title: string;
  template_name: string;
  search: ITokopediaFilterSortProductFilterSearch
  options: ITokopediaFilterSortProductFilterOption[]
}

export interface ITokopediaFilterSortProductFilterSortProductData {
  filter: ITokopediaFilterSortProductFilter[];
  sort: ITokopediaFilterSortProductSort[];
}

export interface ITokopediaFilterSortProductFilterSortProduct {
  data: ITokopediaFilterSortProductFilterSortProductData
}

export interface ITokopediaFilterSortProductData {
  filter_sort_product: ITokopediaFilterSortProductFilterSortProduct
}

export interface ITokopediaFilterSortProductResponse {
  data: ITokopediaFilterSortProductData
}

export interface ITokopediaLocation {
  name: string;
  cityId: string;
}
