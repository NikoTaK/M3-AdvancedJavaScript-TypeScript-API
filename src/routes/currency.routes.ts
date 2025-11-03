import { Router } from 'express';
import { getRates, convertCurrency } from '../controllers/currency.controller';

const router = Router();

/**
 * @route GET /api/rates
 * @description Get all available exchange rates
 * @access Public
 */
router.get('/rates', getRates);

/**
 * @route GET /api/convert
 * @description Convert between currencies
 * @queryParam {string} from - Source currency code (e.g., USD, EUR)
 * @queryParam {string} to - Target currency code
 * @queryParam {number} amount - Amount to convert
 * @access Public
 */
router.get('/convert', convertCurrency);

export default router;
