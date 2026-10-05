import React, { useState } from 'react';
import { Currency, Language, Hamper } from '../types';
import { formatPrice } from '../utils/format';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currency: Currency;
  hampers: Hamper[];
  onSelectHamper: (hamper: Hamper) => void;
  onAddToCart: (hamper: Hamper) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  language,
  currency,
  hampers,
  onSelectHamper,
  onAddToCart,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const quickTags = [
    'Shine Muscat',
    'Cherries',
    'Walnut Wood',
    'Rattan Basket',
    'Korean Pear',
    'Champagne',
  ];

  const results = hampers.filter((h) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      h.name.toLowerCase().includes(q) ||
      h.nameVn.toLowerCase().includes(q) ||
      h.description.toLowerCase().includes(q) ||
      h.descriptionVn.toLowerCase().includes(q) ||
      h.sku.toLowerCase().includes(q) ||
      h.fruits.some((f) => f.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#c0c8c4]/30 flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#ebefea] flex items-center gap-3 bg-[#f6fbf5]">
          <span className="material-symbols-outlined text-[#725b24] text-[22px]">
            search
          </span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={language === 'VN' ? 'Tìm giỏ quà theo tên, loại trái cây (Nho mẫu đơn, Cherry, Hộp gỗ...)' : 'Search by hamper name, fruit (Muscat, Cherry, Walnut)...'}
            className="flex-1 bg-transparent text-[15px] text-[#00261e] focus:outline-none placeholder-[#717975]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[#717975] hover:text-[#00261e]"
            >
              <span className="material-symbols-outlined text-[18px]">clear</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 text-[12px] rounded bg-[#ebefea] text-[#00261e] font-semibold hover:bg-[#dfe4df]"
          >
            ESC
          </button>
        </div>

        {/* Quick Tag Pills */}
        <div className="px-4 py-2.5 bg-[#f0f5f0] border-b border-[#ebefea] flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-[#717975] font-semibold shrink-0">
            {language === 'VN' ? 'Gợi ý:' : 'Trending:'}
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-[#ebefea] border border-[#c0c8c4]/30 text-[#00261e] font-medium shrink-0 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-96 overflow-y-auto p-4 flex flex-col gap-3">
          {results.length === 0 ? (
            <div className="p-8 text-center text-[#717975] text-[13px]">
              {language === 'VN'
                ? 'Không tìm thấy giỏ quà phù hợp. Vui lòng thử từ khóa khác hoặc liên hệ hotline 0868 348 519.'
                : 'No matching hampers found. Try another search or contact our sommelier at 0868 348 519.'}
            </div>
          ) : (
            results.map((hamper) => {
              const title = language === 'VN' ? hamper.nameVn : hamper.name;
              return (
                <div
                  key={hamper.id}
                  onClick={() => {
                    onSelectHamper(hamper);
                    onClose();
                  }}
                  className="p-3 rounded-xl border border-[#ebefea] hover:border-[#725b24]/40 hover:bg-[#f6fbf5] flex items-center justify-between gap-4 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      alt={title}
                      className="w-14 h-14 rounded-lg object-cover bg-[#ebefea] border border-[#c0c8c4]/20"
                      src={hamper.image}
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#725b24] uppercase">
                          {hamper.sku}
                        </span>
                        <span className="text-[11px] text-[#717975]">
                          {hamper.origin}
                        </span>
                      </div>
                      <span className="font-semibold text-[14px] text-[#00261e] group-hover:text-[#725b24] transition-colors">
                        {title}
                      </span>
                      <span className="text-[12px] text-[#414845] truncate max-w-xs sm:max-w-sm">
                        {hamper.fruits.join(' • ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-bold text-[14px] text-[#00261e]">
                      {formatPrice(hamper.priceVnd, hamper.priceUsd, currency)}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(hamper);
                        onClose();
                      }}
                      className="p-2 rounded-lg bg-[#00261e] text-white hover:bg-[#113d32] transition-colors"
                      title="Quick add"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        shopping_bag
                      </span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
