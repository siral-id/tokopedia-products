import { ITokopediaAds } from "./ads.ts";
import { ITokopediaBadge } from "./badge.ts";
import { ITokopediaLabel } from "./label.ts";
import { ITokopediaShop } from "./shop.ts";
// import { ITokopediaCategory } from "./category.ts";
// import { ITokopediaMenu } from "./menu.ts";
// import { ITokopediaTransactionStats } from "./transaction.ts";
// import { ITokopediaComponentProductContent } from "./component.ts";
// import {
//   ITokopediaPdpShopFeature,
//   ITokopediaPdpShopInfo,
//   ITokopediaPdpShopPackSpeed,
//   ITokopediaPdpShopRatingsQuery,
//   ITokopediaPdpShopTopChatSpeed,
// } from "./shop.ts";
// import { ITokopediaMerchantVoucher } from "./voucher.ts";
// import { ITokopediaWarehouse } from "./warehouse.ts";
// import { ITokopediaInstallmentRecommendation } from "./installment.ts";
// import { ITokopediaWishlist } from "./wishlist.ts";
// import { ITokopediaRateEstimate } from "./rate.ts";
/*
 *
 * PRODUCT
 * **/
export interface ITokopediaProduct {
  id: number;
  name: string;
  badges: ITokopediaBadge[];
  category: number;
  countReview: number;
  discountPercentage: number;
  imageURL: string;
  labelGroups: ITokopediaLabel[];
  price: string;
  priceInt: number;
  rating: number;
  ratingAverage: string;
  shop: ITokopediaShop;
  url: string;
}

export interface ITokopediaSearchProduct extends ITokopediaProduct {
  ads: ITokopediaAds;
  categoryBreadcrumb: string;
  categoryId: number;
  categoryName: string;
  customVideoURL: string;
  gaKey: string;
  stock: number;
  discountPercentage: number;
  imageURL: string;
  originalPrice: string;
  priceRange: string;
  wishlist: boolean;
  sourceEngine: string;
}

export interface ITokopediaRecommendationProduct extends ITokopediaProduct {
  clickUrl: string;
  clusterID: number;
  isRating: boolean;
  isShop: boolean;
  isTopads: boolean;
  isWishlist: boolean;
  recommendationType: string;
  slashedPrice: string;
  slashedPriceInt: number;
  trackerImageUrl: string;
}
