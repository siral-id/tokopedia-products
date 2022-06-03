import { Bson } from "https://deno.land/x/mongo@v0.30.0/mod.ts";
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

export interface ITokopediaSearchProductSchema extends ITokopediaSearchProduct {
  _id: Bson.ObjectId;
  source: string;
}
