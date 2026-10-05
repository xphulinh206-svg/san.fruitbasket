import React, { useState } from 'react';
import { Currency, Language } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenCorporate: () => void;
  onSelectCategory: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  currency,
  setCurrency,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenCorporate,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  const handleNavClick = (sectionId: string, category?: string) => {
    setMobileMenuOpen(false);
    if (category) {
      onSelectCategory(category);
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all">
      {/* Top Bar Announcement & Switchers */}
      <div className="bg-[#00261e] text-[#ffffff] py-1.5 px-4 md:px-8 lg:px-16 border-b border-[#00261e]/20">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between text-[13px]">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#e2c381] animate-pulse"></span>
            <span className="font-medium tracking-wide truncate max-w-[280px] sm:max-w-none">
              {t.topBanner}
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase">
              <button
                type="button"
                onClick={() => setLanguage('EN')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  language === 'EN'
                    ? 'text-[#e2c381] font-bold bg-white/10'
                    : 'opacity-70 hover:opacity-100 hover:text-white'
                }`}
              >
                EN
              </button>
              <span className="opacity-30">/</span>
              <button
                type="button"
                onClick={() => setLanguage('VN')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  language === 'VN'
                    ? 'text-[#e2c381] font-bold bg-white/10'
                    : 'opacity-70 hover:opacity-100 hover:text-white'
                }`}
              >
                VN
              </button>
            </div>

            <span className="opacity-30">|</span>

            {/* Currency Switcher */}
            <div className="flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase">
              <button
                type="button"
                onClick={() => setCurrency('VND')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  currency === 'VND'
                    ? 'text-[#e2c381] font-bold bg-white/10'
                    : 'opacity-70 hover:opacity-100 hover:text-white'
                }`}
              >
                VND (₫)
              </button>
              <span className="opacity-30">/</span>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  currency === 'USD'
                    ? 'text-[#e2c381] font-bold bg-white/10'
                    : 'opacity-70 hover:opacity-100 hover:text-white'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-16 h-20 flex items-center justify-between">
        {/* Logo and Tagline */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group"
          >
            <img
              alt="san.fruit logo"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#725b24]/20 group-hover:ring-[#725b24] transition-all"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XBSMF_iyXi8g99ALEuWANtNGwp7HtSvKLFGoQI_7dSl-POAdsYGJyubyyGN8nPUnID69wFaz4fTD-xvIcbOc_tI0RHuxH8AAmZ2xXCPZwVX-7zqZXBWk1VAnUbP1zrD8KWtqn8lTPMrvadxSj8T9C_sLc2tWlL_NlxHZbadA0A4z1YbFD4OJmkH5c0zz6pd80d1IGcxIDDhacxlY9BhUmr73s0nMZcpm_bgSRgsrmocVniueuC0RUT3pwbcAhZ1BEwL453nFz5Hsk"
            />
            <div className="flex flex-col">
              <span className="font-headline text-[22px] font-semibold tracking-tight text-[#00261e] leading-tight group-hover:text-[#725b24] transition-colors">
                san.fruit
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#725b24] font-bold">
                Fruit Basket & Cake • 0868 348 519
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-6 text-[14px] font-semibold text-[#414845]">
          <button
            type="button"
            onClick={() => handleNavClick('order-catalog', 'all')}
            className="text-[#00261e] font-bold hover:text-[#725b24] transition-colors py-1"
          >
            {t.allCollections}
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenCorporate();
              handleNavClick('corporate', 'vip-wooden');
            }}
            className="hover:text-[#00261e] transition-colors py-1"
          >
            {t.corporateHampers}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('order-catalog', 'floral-baskets')}
            className="hover:text-[#00261e] transition-colors py-1"
          >
            {t.freshBaskets}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('order-catalog', 'crystal-acrylic')}
            className="hover:text-[#00261e] transition-colors py-1"
          >
            {t.luxuryBoxes}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('bespoke-atelier')}
            className="hover:text-[#00261e] transition-colors py-1"
          >
            {t.customGift}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('delivery-zones')}
            className="hover:text-[#00261e] transition-colors py-1"
          >
            {t.deliveryZones}
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('concierge-contact')}
            className="hover:text-[#00261e] transition-colors py-1"
          >
            {t.contact}
          </button>
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-3">
          {/* Search Trigger Input */}
          <div className="relative hidden md:block w-48 lg:w-60">
            <button
              type="button"
              onClick={onOpenSearch}
              className="w-full pl-9 pr-3 py-1.5 bg-[#f0f5f0] hover:bg-[#e5e9e4] text-[#717975] text-[13px] rounded-lg text-left transition-all flex items-center justify-between"
            >
              <span className="truncate">{t.searchPlaceholder}</span>
              <kbd className="hidden lg:inline text-[10px] bg-white px-1.5 py-0.5 rounded text-[#717975] border border-gray-200">
                ⌘K
              </kbd>
            </button>
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[#717975] text-[18px] pointer-events-none">
              search
            </span>
          </div>

          {/* Search button on small screens */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="md:hidden p-2 rounded-full bg-[#f0f5f0] text-[#00261e] hover:bg-[#e5e9e4] transition-colors"
            title="Search"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Cart Trigger */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#f0f5f0] text-[#00261e] hover:bg-[#e5e9e4] transition-colors focus:ring-2 focus:ring-[#725b24]/30"
            title="Shopping Basket"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#00261e] text-[#ffffff] text-[11px] font-bold flex items-center justify-center shadow-sm animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-[#f0f5f0] text-[#00261e] hover:bg-[#e5e9e4] transition-colors"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-[#ebefea] px-6 py-4 shadow-xl">
          <nav className="flex flex-col gap-3 font-semibold text-[#414845]">
            <button
              type="button"
              onClick={() => handleNavClick('order-catalog', 'all')}
              className="text-left py-2 text-[#00261e] font-bold border-b border-[#f0f5f0]"
            >
              {t.allCollections}
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenCorporate();
                handleNavClick('corporate', 'vip-wooden');
              }}
              className="text-left py-2 hover:text-[#00261e] border-b border-[#f0f5f0]"
            >
              {t.corporateHampers}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('order-catalog', 'floral-baskets')}
              className="text-left py-2 hover:text-[#00261e] border-b border-[#f0f5f0]"
            >
              {t.freshBaskets}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('order-catalog', 'crystal-acrylic')}
              className="text-left py-2 hover:text-[#00261e] border-b border-[#f0f5f0]"
            >
              {t.luxuryBoxes}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('bespoke-atelier')}
              className="text-left py-2 hover:text-[#00261e] border-b border-[#f0f5f0]"
            >
              {t.customGift}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('delivery-zones')}
              className="text-left py-2 hover:text-[#00261e] border-b border-[#f0f5f0]"
            >
              {t.deliveryZones}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('concierge-contact')}
              className="text-left py-2 hover:text-[#00261e]"
            >
              {t.contact}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
