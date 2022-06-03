export interface ITokopediaWarehouseInfo {
  warehouse_id: number;
  is_fulfillment: string;
  district_id: string;
  postal_code: string;
  geolocation: string;
}

export interface ITokopediaWarehouse {
  product_id: number;
  stock: string;
  stock_wording: string;
  price: string;
  warehouse_info: ITokopediaWarehouseInfo;
}
