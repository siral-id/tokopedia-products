import { Bson } from "https://deno.land/x/mongo@v0.30.0/mod.ts";
import { ITokopediaRecommendationProduct } from "./product.ts";

export interface ITokopediaRecommendationProductGetHomeRecommendationRecommendationProduct {
  hasNextPage: boolean;
  product: ITokopediaRecommendationProduct[];
}

export interface ITokopediaRecommendationProductGetHomeRecommendation {
  // @TODO recommendation_tabs
  recommendation_product:
    ITokopediaRecommendationProductGetHomeRecommendationRecommendationProduct;
}

export interface ITokopediaRecommendationProductData {
  get_home_recommendation: ITokopediaRecommendationProductGetHomeRecommendation;
}

export interface ITokopediaRecommendationProductResponse {
  data: ITokopediaRecommendationProductData;
}

export interface ITokopediaRecommendationProductSchema
  extends ITokopediaRecommendationProduct {
  _id: Bson.ObjectId;
  source: string;
}
