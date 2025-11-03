import { Request, Response } from 'express';
import { CurrencyCode, ApiResponse } from '../types/currency.types';
import { currencyService } from '../services/currency.service';

export const getRates = (req: Request, res: Response<ApiResponse<Record<CurrencyCode, number>>>) => {
  try {
    const rates = currencyService.getAllRates();
    res.json({
      success: true,
      data: rates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch exchange rates'
    });
  }
};

export const convertCurrency = (req: Request, res: Response<ApiResponse<{ amount: number; from: string; to: string; result: number }>>) => {
  try {
    const { from, to, amount } = req.query;
    
    if (!from || !to || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters: from, to, amount'
      });
    }

    const amountNum = parseFloat(amount as string);
    if (isNaN(amountNum) || amountNum <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be a positive number'
      });
    }

    if (!isValidCurrency(from) || !isValidCurrency(to)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid currency code. Supported codes: USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, HKD, NZD, RUB'
      });
    }

    const result = currencyService.convert(from as CurrencyCode, to as CurrencyCode, amountNum);
    
    res.json({
      success: true,
      data: {
        amount: amountNum,
        from,
        to,
        result
      }
    });
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to convert currency'
    });
  }
};

function isValidCurrency(currency: unknown): currency is CurrencyCode {
  const validCurrencies: CurrencyCode[] = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'NZD', 'RUB'];
  return typeof currency === 'string' && validCurrencies.includes(currency as CurrencyCode);
}
