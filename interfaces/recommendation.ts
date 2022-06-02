import {ITokopediaRecommendationProduct} from "./product.ts"

export interface ITokopediaRecommendationProductGetHomeRecommendationRecommendationProduct {
  hasNextPage: boolean;
  product: ITokopediaRecommendationProduct[]
}

export interface ITokopediaRecommendationProductGetHomeRecommendation {
  // @TODO recommendation_tabs
  recommendation_product: ITokopediaRecommendationProductGetHomeRecommendationRecommendationProduct
}

export interface ITokopediaRecommendationProductData {
  get_home_recommendation: ITokopediaRecommendationProductGetHomeRecommendation
}

export interface ITokopediaRecommendationProductResponse {
  data: ITokopediaRecommendationProductData
}
