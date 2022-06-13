import { ITokopediaCategory } from "./category.ts";
import { ITokopediaMenu } from "./menu.ts";
import { ITokopediaTransactionStats } from "./transaction.ts";

export interface ITokopediaPdpGetLayoutDataMedia {
  media: {
    type: string;
    urlThumbnail: string;
    videoUrl?: string;
    prefix: string;
    suffix: string;
    description?: string;
  };
  videos?: {
    type: string;
    urlThumbnail: string;
    videoUrl?: string;
    prefix: string;
    suffix: string;
    description?: string;
  };
}

export interface ITokopediaPicture {
  urlOriginal: string;
  urlThumbnail: string;
}

export interface ITokopediaStock {
  stock: string;
  isBuyable: boolean;
  stockWordingHTML: string;
  minimumOrder: string;
  maximumOrder: string;
}

export interface ITokopediaPdpGetLayoutDataVariantInfoVariants {
  productVariantID: string;
  variantID: string;
  name: string;
  identifier: string;
  option: {
    picture: ITokopediaPicture;
    productVariantOptionID: string;
    variantUnitValueID: string;
    value: string;
    hex: string;
  }[];
}

export interface ITokopediaPdpGetLayoutDataChildren {
  productID: string;
  price: number;
  priceFmt: string;
  optionID: number[];
  productName: string;
  productURL: string;
  picture: ITokopediaPicture;
  stock: ITokopediaStock;
  isCOD: boolean;
  isWishlist: boolean;
  campaignInfo: {
    campaignID: string;
    campaignType: string;
    campaignTypeName: string;
    campaignIdentifier: number;
    background: string;
    discountPercentage: number;
    originalPrice: number;
    discountPrice: number;
    stock: number;
    stockSoldPercentage: number;
    startDate: string;
    endDate: string;
    endDateUnix: string;
    appLinks: string;
    isAppsOnly: boolean;
    isActive: boolean;
    hideGimmick: boolean;
    isCheckImei: boolean;
    minOrder: number;
  };
  thematicCampaign: {
    additionalInfo: string;
    background: string;
    campaignName: string;
    icon: string;
  };
}

export interface ITokopediaPdpGetLayoutDataProductContent {
  name: string;
  price: {
    value: number;
    currency: string;
  };
  campaign: {
    campaignID: string;
    campaignType: string;
    campaignTypeName: string;
    campaignIdentifier: number;
    background: string;
    percentageAmount: number;
    originalPrice: number;
    discountedPrice: number;
    originalStock: number;
    stock: number;
    stockSoldPercentage: number;
    threshold: number;
    startDate: string;
    endDate: string;
    endDateUnix: string;
    appLinks: string;
    isAppsOnly: boolean;
    isActive: boolean;
    hideGimmick: boolean;
  };
  thematicCampaign: {
    additionalInfo: string;
    background: string;
    campaignName: string;
    icon: string;
  };
  stock: {
    useStock: boolean;
    value: string;
    stockWording: string;
  };
  variant: {
    isVariant: boolean;
    parentID: string;
  };
  //wholesale: [],
  isCashback: {
    percentage: number;
  };
  isTradeIn: boolean;
  isOS: boolean;
  isPowerMerchant: boolean;
  isWishlist: boolean;
  isCOD: boolean;
  isFreeOngkir: {
    isActive: boolean;
  };
  preorder: {
    duration: number;
    timeUnit: string;
    isActive: boolean;
    preorderInDays: boolean;
  };
}

export interface ITokopediaPdpGetLayoutDataProductDetail {
  title: string;
  subtitle: string;
  applink: string;
  showAtFront: boolean;
  isAnnotation: boolean;
}

export interface ITokopediaComponentPdpGetLayoutComponentDataVariantInfo {
  errorCode: number;
  parentID: string;
  defaultChild: string;
  sizeChart?: string;
  variants: ITokopediaPdpGetLayoutDataVariantInfoVariants[];
}

export interface ITokopediaPdpGetLayoutDataContentProductDetail {
  content: ITokopediaPdpGetLayoutDataProductDetail[];
}

export interface ITokopediaPdpGetLayoutComponent {
  name: string;
  type: string;
  position: number[];
  data:
    | ITokopediaPdpGetLayoutDataMedia[]
    | ITokopediaPdpGetLayoutDataChildren[]
    | ITokopediaPdpGetLayoutDataProductContent[]
    | ITokopediaPdpGetLayoutDataContentProductDetail[];
}

export interface ITokopediaProductStats {
  countView: number;
  countReview: number;
  countTalk: number;
  rating: number;
}

export interface ITokopediaPdpGetLayoutBasicInfo {
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
  basicInfo: ITokopediaPdpGetLayoutBasicInfo;
  components: ITokopediaPdpGetLayoutComponent[];
}

export interface ITokopediaPdpGetLayoutResponseData {
  pdpGetLayout: ITokopediaPdpGetLayout;
  // pdpGetData: ITokopediaPdpGetData;
}

export interface ITokopediaPdpGetLayoutResponse {
  data: ITokopediaPdpGetLayoutResponseData;
}
