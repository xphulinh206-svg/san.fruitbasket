import { Currency } from '../types';

export function formatPrice(priceVnd: number, priceUsd: number, currency: Currency): string {
  if (currency === 'USD') {
    return `$${priceUsd.toLocaleString()}`;
  }
  return `${priceVnd.toLocaleString('vi-VN')}₫`;
}

export function formatVndOnly(priceVnd: number): string {
  return `${priceVnd.toLocaleString('vi-VN')}₫`;
}

export function formatUsdOnly(priceUsd: number): string {
  return `$${priceUsd.toLocaleString()}`;
}
