export interface ITokopediaComponentProductContentPrice {
  value: number;
  currency: string;
  lastUpdateUnix: number;
}

export interface ITokopediaComponentProductContentCampaign {
  campaignID: number;
  campaign: string;
  campaignName: string;
  percentageAmount: number;
  originalPrice: number;
  discountedPrice: number;
  originalStock: number;
  stock: number;
  stockSoldPercentage: number;
  endDateUnix: number;
  isActive: boolean;
  hideGimmick: boolean;
  isUsingOvo: boolean;
  campaignIdentifier: number;
  background: string;
  paymentInfoWording: string;
}

export interface ITokopediaComponentProductContentThematicCampaign {
  campaignName: string;
  icon: string;
  background: string;
}

export interface ITokopediaComponentProductContentStock {
  useStock: boolean;
  value: number;
  stockWording: string;
}

export interface ITokopediaComponentProductContentPreorder {
  duration: number;
  timeUnit: string;
  isActive: boolean;
  preorderInDays: number;
}

export interface ITokopediaComponentProductContentVariant {
  isVariant: boolean;
}

export interface ITokopediaComponentProductContentFreeOngkir {
  isActive: boolean;
}

export interface ITokopediaComponentProductContentCashback {
  percentage: number;
}

export interface ITokopediaComponentDataProductContent {
  productID: number;
  name: string;
  optionID: string[];
  price: ITokopediaComponentProductContentPrice;
  campaign: ITokopediaComponentProductContentCampaign;
  thematicCampaign: ITokopediaComponentProductContentThematicCampaign;
  stock: ITokopediaComponentProductContentStock;
  preorder: ITokopediaComponentProductContentPreorder;
  variant: ITokopediaComponentProductContentVariant;
  wholesale: number[];
  isFreeOngkir: ITokopediaComponentProductContentFreeOngkir;
  cashback: ITokopediaComponentProductContentCashback;
  isTradeIn: boolean;
  isOS: boolean;
  isPowerMerchant: boolean;
  isWishlist: boolean;
  isCOD: boolean;
}

export interface ITokopediaComponentProductVariantOptionPicture {
  url: string;
  url100: string;
}

export interface ITokopediaComponentProductVariantOption {
  productVariantOptionID: number;
  variantUnitValueID: number;
  value: string;
  hex: string;
  picture: ITokopediaComponentProductVariantOptionPicture;
}

export interface ITokopediaComponentProductVariantVariant {
  productVariantID: number;
  variantID: number;
  name: string;
  identifier: string;
  option: ITokopediaComponentProductVariantOption[];
  stock: ITokopediaComponentProductContentStock;
}

export interface ITokopediaComponentDataProductVariant {
  parentID: number;
  defaultChild: number;
  sizeChart: string;
  variants: ITokopediaComponentProductVariantVariant[];
  children: ITokopediaComponentDataProductContent[];
}

export interface ITokopediaComponentProductContent {
  name: string;
  type: string;
  data: ITokopediaComponentDataProductContent[];
}

export interface ITokopediaComponentProductVariant {
  name: string;
  type: string;
  data: ITokopediaComponentDataProductVariant[];
}
