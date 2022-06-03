export interface ITokopediaMerchantVoucherType {
  voucher_type: number;
  identifier: string;
}

export interface ITokopediaMerchantVoucherAmount {
  amount: number;
  amount_type: number;
  amount_formatted: string;
}

export interface ITokopediaMerchantVoucherBanner {
  desktop_url: string;
  mobile_url: string;
}

export interface ITokopediaMerchantVoucherStatus {
  status: number;
  identified: string;
}

export interface ITokopediaMerchantVoucher {
  voucher_id: number;
  voucher_name: string;
  voucher_type: ITokopediaMerchantVoucherType;
  voucher_code: number;
  amount: ITokopediaMerchantVoucherAmount;
  minimum_spend: number;
  valid_thru: string;
  tnc: string;
  banner: ITokopediaMerchantVoucherBanner;
  status: ITokopediaMerchantVoucherStatus;
  in_use_expiry: string;
}
