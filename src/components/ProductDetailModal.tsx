import React, { useState } from 'react';
import { Currency, Language, Hamper } from '../types';
import { formatPrice } from '../utils/format';

interface ProductDetailModalProps {
  hamper: Hamper | null;
  onClose: () => void;
  language: Language;
  currency: Currency;
  onAddToCart: (hamper: Hamper, quantity: number) => void;
  onCustomize: (hamper: Hamper) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  hamper,
  onClose,
  language,
  currency,
  onAddToCart,
  onCustomize,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!hamper) return null;

  const title = language === 'VN' ? hamper.nameVn : hamper.name;
  const subtitle = language === 'VN' ? hamper.subtitleVn : hamper.subtitle;
  const desc = language === 'VN' ? hamper.descriptionVn : hamper.description;
  const origin = language === 'VN' ? hamper.originVn : hamper.origin;

  const handleAdd = () => {
    onAddToCart(hamper, quantity);
    onClose();
  };

  const handleCustom = () => {
    onCustomize(hamper);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#c0c8c4]/30 relative flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#00261e] hover:bg-white shadow-md transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Left: Image Container */}
        <div className="md:w-1/2 relative bg-[#ebefea] min-h-[320px] md:min-h-full">
          <img
            alt={title}
            className="w-full h-full object-cover"
            src={hamper.image}
          />
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-white/60 flex items-center justify-between text-[11px] font-semibold text-[#00261e]">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#725b24] text-[16px]">
                verified
              </span>
              100% Certified Import
            </span>
            <span className="text-[#725b24]">GlobalG.A.P Grade 1</span>
          </div>
        </div>

        {/* Right: Content & Specs */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between gap-5 bg-[#f6fbf5]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#ffdf9b] text-[#251a00] text-[10px] font-bold uppercase tracking-wider">
                {hamper.sku}
              </span>
              <span className="text-[12px] text-[#717975] font-medium">
                {language === 'VN' ? 'Xuất xứ:' : 'Origin:'} {origin}
              </span>
            </div>

            <h3 className="font-headline text-[24px] sm:text-[26px] font-semibold text-[#00261e] leading-snug">
              {title}
            </h3>

            <p className="text-[13px] text-[#725b24] font-medium italic">
              {subtitle}
            </p>

            <p className="text-[14px] text-[#414845] leading-relaxed">
              {desc}
            </p>

            {/* Spec Details List */}
            <div className="mt-2 p-3.5 rounded-xl bg-white border border-[#ebefea] flex flex-col gap-2 text-[12px] text-[#414845]">
              <div>
                <strong className="text-[#00261e]">
                  {language === 'VN' ? 'Trái cây chủ đạo:' : 'Core Fruits:'}
                </strong>{' '}
                {hamper.fruits.join(', ')}
              </div>
              <div>
                <strong className="text-[#00261e]">
                  {language === 'VN' ? 'Kiểu dáng giỏ:' : 'Vessel:'}
                </strong>{' '}
                {hamper.vessel}
              </div>
              {hamper.pairing && (
                <div>
                  <strong className="text-[#00261e]">
                    {language === 'VN' ? 'Hoa tươi & nơ:' : 'Botanical Pairing:'}
                  </strong>{' '}
                  {hamper.pairing}
                </div>
              )}
              {hamper.dimensions && (
                <div>
                  <strong className="text-[#00261e]">
                    {language === 'VN' ? 'Kích thước:' : 'Dimensions:'}
                  </strong>{' '}
                  {hamper.dimensions}
                </div>
              )}
            </div>
          </div>

          {/* Pricing & Add to Cart */}
          <div className="pt-4 border-t border-[#ebefea] flex flex-col gap-4">
            <div className="flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-[#717975]">
                  {language === 'VN' ? 'Giá Atelier' : 'Atelier Price'}
                </span>
                <span className="text-[22px] font-bold text-[#00261e]">
                  {formatPrice(hamper.priceVnd, hamper.priceUsd, currency)}
                </span>
              </div>

              {/* Quantity */}
              <div className="flex items-center border border-[#c0c8c4]/50 rounded-lg bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-[#00261e] hover:bg-[#ebefea] font-bold"
                >
                  -
                </button>
                <span className="px-3 text-[13px] font-bold text-[#00261e]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-[#00261e] hover:bg-[#ebefea] font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleAdd}
                className="py-3 rounded bg-[#00261e] text-white text-[13px] font-semibold hover:bg-[#113d32] transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  shopping_bag
                </span>
                <span>{language === 'VN' ? 'Thêm Vào Giỏ' : 'Add to Basket'}</span>
              </button>

              <button
                type="button"
                onClick={handleCustom}
                className="py-3 rounded bg-[#ebefea] text-[#00261e] text-[13px] font-semibold hover:bg-[#dfe4df] transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">
                  tune
                </span>
                <span>{language === 'VN' ? 'Tùy Biến Giỏ Này' : 'Customize This'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
