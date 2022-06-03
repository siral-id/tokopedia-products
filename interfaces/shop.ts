/*
 *
 * SHOP
 * **/

export interface ITokopediaShop {
  id: string;
  name: string;
  url: string;
  city: string;
  isOfficial: boolean;
  isPowerBadge: boolean;
}

export interface ITokopediaPdpShopCloseInfoDetail {
  openDate: string;
}

export interface ITokopediaPdpShopFavorite {
  totalFavorite: string;
  alreadyFavorite: number;
}

export interface ITokopediaPdpShopCreateInfo {
  epochShopCreated: string;
}

export interface ITokopediaPdpShopShopAssets {
  avatar: string;
}

export interface ITokopediaPdpShopCore {
  domain: string;
  shopID: string;
  name: string;
  shopScore: string;
  url: string;
}

export interface ITokopediaPdpShopStatusInfo {
  statusMessage: string;
  shopStatus: number;
  isIdle: boolean;
}

export interface ITokopediaPdpShopCloseInfo {
  closeNote: string;
  reason: string;
  detail: ITokopediaPdpShopCloseInfoDetail;
}

export interface ITokopediaPdpShopInfo {
  shopTier: number;
  badgeUrl: string;
  closeInfo: ITokopediaPdpShopCloseInfo;
  favoriteData: ITokopediaPdpShopFavorite;
  activeProduct: string;
  createInfo: ITokopediaPdpShopCreateInfo;
  shopAssets: ITokopediaPdpShopShopAssets;
  shopCore: ITokopediaPdpShopCore;
  shopLastActive: string;
  location: string;
  statusInfo: ITokopediaPdpShopStatusInfo;
  isAllowManage: number;
  isOwner: number;
  isCOD: boolean;
  shop: number;
}

export interface ITokopediaPdpShopTopChatSpeed {
  messageResponseTime: string;
}

export interface ITokopediaPdpShopRatingsQuery {
  ratingScore: number;
}

export interface ITokopediaPdpShopPackSpeed {
  speedFmt: string;
  hour: number;
}

export interface ITokopediaPdpShopFeature {
  isGoApotik: boolean;
}
