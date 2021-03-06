import { ITokopediaSearchProduct } from "./product.ts";

export interface ITokopediaSearchProductAceSearchProductV4Data {
  // @TODO backendFilters
  // @TODO isQuerySafe
  // @TODO ticker
  // @TODO redirection
  // @TODO related
  // @TODO suggestion
  products: ITokopediaSearchProduct[];
}

export interface ITokopediaSearchProductAceSearchProductV4 {
  // @TODO header
  data: ITokopediaSearchProductAceSearchProductV4Data;
}

export interface ITokopediaSearchProductData {
  ace_search_product_v4: ITokopediaSearchProductAceSearchProductV4;
}

export interface ITokopediaSearchProductResponse {
  data: ITokopediaSearchProductData;
}
