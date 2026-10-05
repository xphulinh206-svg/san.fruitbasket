export type Currency = 'VND' | 'USD';
export type Language = 'EN' | 'VN';

export interface Hamper {
  id: string;
  sku: string;
  name: string;
  nameVn: string;
  subtitle: string;
  subtitleVn: string;
  description: string;
  descriptionVn: string;
  priceVnd: number;
  priceUsd: number;
  image: string;
  category: 'all' | 'vip-wooden' | 'floral-baskets' | 'crystal-acrylic' | 'seasonal-wine';
  origin: string;
  originVn: string;
  isBestseller?: boolean;
  isExecutiveChoice?: boolean;
  isExpress2H?: boolean;
  fruits: string[];
  vessel: string;
  pairing?: string;
  dimensions?: string;
  rating?: number;
}

export interface CustomHamperConfig {
  vessel: 'rattan' | 'walnut' | 'acrylic';
  coreFruits: string[];
  ribbon: string;
  addon: string;
  addonPriceVnd: number;
  addonPriceUsd: number;
  calligraphyMessage: string;
  cardLanguage: 'EN' | 'VN';
  recipientName?: string;
}

export interface CartItem {
  id: string;
  hamperId?: string;
  name: string;
  sku: string;
  priceVnd: number;
  priceUsd: number;
  image: string;
  quantity: number;
  customDetails?: {
    vessel: string;
    fruits: string[];
    ribbon: string;
    addon?: string;
    calligraphyMessage?: string;
  };
}

export interface Review {
  id: string;
  author: string;
  initials: string;
  role: string;
  roleVn: string;
  location: string;
  content: string;
  contentVn: string;
  rating: number;
  date?: string;
}

export interface DeliveryZoneInfo {
  id: string;
  zoneTitle: string;
  zoneTitleVn: string;
  eta: string;
  etaVn: string;
  districts: string[];
  description: string;
  descriptionVn: string;
  perk: string;
  perkVn: string;
  baseFeeVnd: number;
  freeShippingThresholdVnd: number;
}
