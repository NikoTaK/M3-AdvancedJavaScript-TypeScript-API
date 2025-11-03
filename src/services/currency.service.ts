import { CurrencyCode, ExchangeRates } from '../types/currency.types';

// Base exchange rates (as of knowledge cutoff, these are approximate)
const DEFAULT_RATES: ExchangeRates = {
  USD: 1,
  EUR: 0.93,
  GBP: 0.79,
  JPY: 149.80,
  AUD: 1.54,
  CAD: 1.35,
  CHF: 0.90,
  CNY: 7.24,
  HKD: 7.82,
  NZD: 1.67,
  RUB: 80
};

class CurrencyService {
  private rates: ExchangeRates;

  constructor(initialRates: ExchangeRates = DEFAULT_RATES) {
    this.rates = { ...initialRates };
  }

  public getAllRates(): ExchangeRates {
    return { ...this.rates };
  }

  public convert(from: CurrencyCode, to: CurrencyCode, amount: number): number {
    if (from === to) return amount;
    const amountInUSD = amount / this.rates[from];
    return parseFloat((amountInUSD * this.rates[to]).toFixed(4));
  }
}

export const currencyService = new CurrencyService();
