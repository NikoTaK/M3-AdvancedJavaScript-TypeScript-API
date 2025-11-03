export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD' | 'CAD' | 'CHF' | 'CNY' | 'HKD' | 'NZD' | 'RUB';

// Exchange rates interface
export interface ExchangeRates {
  USD: number; // Base currency (1 USD = 1 USD)
  EUR: number;
  GBP: number;
  JPY: number;
  AUD: number;
  CAD: number;
  CHF: number;
  CNY: number;
  HKD: number;
  NZD: number;
  RUB: number;
}

export interface ConversionRequest {
  from: CurrencyCode;
  to: CurrencyCode;
  amount: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
