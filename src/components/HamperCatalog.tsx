import React, { useState } from 'react';
import { Currency, Language, Hamper } from '../types';
import { translations } from '../data/translations';
import { formatPrice } from '../utils/format';

interface HamperCatalogProps {
  language: Language;
  currency: Currency;
  hampers: Hamper[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onAddToCart: (hamper: Hamper) => void;
  onCustomizeHamper: (hamper: Hamper) => void;
  onQuickViewHamper: (hamper: Hamper) => void;
  wishlist: string[];
  onToggleWishlist: (hamperId: string) => void;
}

export const HamperCatalog: React.FC<HamperCatalogProps> = ({
  language,
  currency,
  hampers,
  selectedCategory,
  setSelectedCategory,
  onAddToCart,
  onCustomizeHamper,
  onQuickViewHamper,
  wishlist,
  onToggleWishlist,
}) => {
  const t = translations[language];
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: t.allBestsellers },
    { id: 'vip-wooden', label: t.vipWoodenBox },
    { id: 'floral-baskets', label: t.floralBaskets },
    { id: 'crystal-acrylic', label: t.crystalAcrylicTab },
    { id: 'seasonal-wine', label: t.wineGateauTab },
  ];

  const filteredHampers = hampers.filter((h) => {
    if (selectedCategory === 'all') return true;
    return h.category === selectedCategory;
  });

  const handleQuickAdd = (hamper: Hamper) => {
    onAddToCart(hamper);
    setAddedNotice(language === 'VN' ? `Đã thêm "${hamper.nameVn}" vào giỏ quà!` : `Added "${hamper.name}" to your basket!`);
    setTimeout(() => {
      setAddedNotice(null);
    }, 2800);
  };

  return (
    <section className="w-full py-16 lg:py-24 bg-[#f0f5f0]" id="order-catalog">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Toast feedback */}
        {addedNotice && (
          <div className="fixed top-24 right-6 z-50 bg-[#00261e] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-[#ffdf9b]/40 animate-bounce">
            <span className="material-symbols-outlined text-[#ffdf9b] text-[20px]">
              check_circle
            </span>
            <span className="text-[14px] font-semibold">{addedNotice}</span>
          </div>
        )}

        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#725b24]">
              {t.bestsellerSub}
            </span>
            <h2 className="font-display text-[32px] sm:text-[38px] text-[#00261e] tracking-tight">
              {t.bestsellerTitle}
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] uppercase tracking-wider text-[#414845] font-semibold hidden sm:inline">
              {t.filterBy}
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#00261e] text-white shadow-sm'
                    : 'bg-white text-[#181d1a] hover:bg-[#dfe4df] border border-[#c0c8c4]/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hampers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHampers.map((hamper) => {
            const isFav = wishlist.includes(hamper.id);
            const title = language === 'VN' ? hamper.nameVn : hamper.name;
            const desc = language === 'VN' ? hamper.descriptionVn : hamper.description;
            const origin = language === 'VN' ? hamper.originVn : hamper.origin;

            return (
              <div
                key={hamper.id}
                className="flex flex-col rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-[#c0c8c4]/30"
              >
                {/* Image Container */}
                <div className="relative w-full h-80 overflow-hidden bg-[#ebefea]">
                  <img
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    src={hamper.image}
                    onClick={() => onQuickViewHamper(hamper)}
                  />

                  {/* Top-Left Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
                    {hamper.isBestseller && (
                      <span className="px-2.5 py-1 rounded-full bg-[#725b24] text-white text-[10px] uppercase font-bold tracking-wider shadow-sm">
                        Best Seller
                      </span>
                    )}
                    {hamper.isExecutiveChoice && (
                      <span className="px-2.5 py-1 rounded-full bg-[#00261e] text-white text-[10px] uppercase font-bold tracking-wider shadow-sm">
                        Executive Choice
                      </span>
                    )}
                    {hamper.isExpress2H && (
                      <span className="px-2.5 py-1 rounded-full bg-[#bfecdc] text-[#002019] text-[10px] uppercase font-bold tracking-wider shadow-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">
                          bolt
                        </span>
                        Express 2H
                      </span>
                    )}
                  </div>

                  {/* Top-Right Heart Wishlist */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(hamper.id);
                    }}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer shadow-sm ${
                      isFav ? 'text-[#ba1a1a]' : 'text-[#00261e] hover:text-[#725b24]'
                    }`}
                    title={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[12px] text-[#717975]">
                      <span>SKU: {hamper.sku}</span>
                      <span className="font-medium text-[#414845]">
                        {language === 'VN' ? 'Nhập khẩu:' : 'Imported:'} {origin}
                      </span>
                    </div>

                    <h3
                      onClick={() => onQuickViewHamper(hamper)}
                      className="font-headline text-[20px] font-semibold text-[#00261e] leading-snug cursor-pointer hover:text-[#725b24] transition-colors"
                    >
                      {title}
                    </h3>

                    <p className="text-[13px] text-[#414845] leading-relaxed line-clamp-3">
                      {desc}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-end justify-between pt-2 border-t border-[#ebefea]">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#717975] uppercase tracking-wider font-bold">
                        {t.price}
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-[19px] font-bold text-[#00261e]">
                          {formatPrice(hamper.priceVnd, hamper.priceUsd, currency)}
                        </span>
                        <span className="text-[12px] text-[#717975]">
                          {currency === 'VND'
                            ? `≈ $${hamper.priceUsd} USD`
                            : `≈ ${hamper.priceVnd.toLocaleString('vi-VN')}₫`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleQuickAdd(hamper)}
                      className="w-full py-2.5 rounded bg-[#00261e] text-white text-[13px] font-semibold hover:bg-[#113d32] transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[17px]">
                        shopping_bag
                      </span>
                      <span>{t.quickOrder}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onCustomizeHamper(hamper)}
                      className="w-full py-2.5 rounded bg-[#ebefea] text-[#00261e] text-[13px] font-semibold hover:bg-[#dfe4df] transition-colors flex items-center justify-center gap-1 text-center cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        tune
                      </span>
                      <span>{t.customize}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
