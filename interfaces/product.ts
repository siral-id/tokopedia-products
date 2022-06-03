import { ITokopediaAds } from "./ads.ts";
import { ITokopediaBadge } from "./badge.ts";
import { ITokopediaLabel } from "./label.ts";
import { ITokopediaShop } from "./shop.ts";
import { ITokopediaCategory } from "./category.ts";
import { ITokopediaMenu } from "./menu.ts";
import { ITokopediaTransactionStats } from "./transaction.ts";
import { ITokopediaComponentProductContent } from "./component.ts";
import {
  ITokopediaPdpShopFeature,
  ITokopediaPdpShopInfo,
  ITokopediaPdpShopPackSpeed,
  ITokopediaPdpShopRatingsQuery,
  ITokopediaPdpShopTopChatSpeed,
} from "./shop.ts";
import { ITokopediaMerchantVoucher } from "./voucher.ts";
import { ITokopediaWarehouse } from "./warehouse.ts";
import { ITokopediaInstallmentRecommendation } from "./installment.ts";
import { ITokopediaWishlist } from "./wishlist.ts";
import { ITokopediaRateEstimate } from "./rate.ts";
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
  imageUrl: string;
  labelGroups: ITokopediaLabel[];
  price: string;
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
  imageUrl: string;
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

export interface ITokopediaProductStats {
  countView: number;
  countReview: number;
  countTalk: number;
  rating: number;
}

export interface ITokopediaProductBasicInfo {
  defaultOngkirEstimation: number;
  id: number;
  category: ITokopediaCategory;
  menu: ITokopediaMenu;
  shopID: number;
  shopName: string;
  alias: string;
  minOrder: number;
  maxOrder: number;
  status: string;
  url: string;
  catalogID: number;
  needPrescription: boolean;
  weight: number;
  weightUnit: string;
  txStats: ITokopediaTransactionStats;
  stats: ITokopediaProductStats;
  isTokoNow: boolean;
  totalStockFmt: string;
}

export interface ITokopediaPdpGetLayout {
  name: string;
  pdpSession: string;
  basicInfo: ITokopediaProductBasicInfo;
  components: ITokopediaComponentProductContent[];
}

export interface ITokopediaPdpGetDataError {
  Code: number;
  Message: string;
  DevMessage: string;
}

export interface ITokopediaPdpGetDataCallsError {
  shopInfo: ITokopediaPdpGetDataError;
  cartRedirection: ITokopediaPdpGetDataError;
  nearestWarehouse: ITokopediaPdpGetDataError;
}

export interface ITokopediaPdpGetData {
  error: ITokopediaPdpGetDataError;
  callsError: ITokopediaPdpGetDataError;
  productView: string;
  wishlistCount: string;
  shopInfo: ITokopediaPdpShopInfo;
  merchantVoucher: ITokopediaMerchantVoucher;
  nearestWarehouse: ITokopediaWarehouse[];
  installmentRecommendation: ITokopediaInstallmentRecommendation;
  productWishlistQuery: ITokopediaWishlist;
  shopTopChatSpeed: ITokopediaPdpShopTopChatSpeed;
  shopRatingsQuery: ITokopediaPdpShopRatingsQuery;
  shopPackSpeed: ITokopediaPdpShopPackSpeed;
  shopFeature: ITokopediaPdpShopFeature;
  ratesEstimate: ITokopediaRateEstimate[];
}

export interface ITokopediaProductResponseData {
  pdpGetLayout: ITokopediaPdpGetLayout;
  pdpGetData: ITokopediaPdpGetData;
}

export interface ITokopediaProductResponse {
  data: ITokopediaProductResponseData;
}
