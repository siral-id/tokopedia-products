export interface ITokopediaRateEstimateData {
  destination: string;
  title: string;
  subtitle: string;
  courierLabel: string;
  eTAText: string;
  cheapestShippingPrice: string;
}

export interface ITokopediaRateEstimateBottomsheet {
  title: string;
  iconURL: string;
  subtitle: string;
  buttonCopy: string;
}

export interface ITokopediaRateEstimate {
  warehouseID: string;
  products: string[];
  data: ITokopediaRateEstimateData;
  bottomsheet: ITokopediaRateEstimateBottomsheet;
}
