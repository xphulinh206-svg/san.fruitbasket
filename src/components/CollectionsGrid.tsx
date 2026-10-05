import React from 'react';
import { Currency, Language } from '../types';
import { translations } from '../data/translations';

interface CollectionsGridProps {
  language: Language;
  currency: Currency;
  onSelectCategory: (category: string) => void;
  onOpenCorporate: () => void;
  onOpenCustomizer: () => void;
}

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({
  language,
  currency,
  onSelectCategory,
  onOpenCorporate,
  onOpenCustomizer,
}) => {
  const t = translations[language];

  return (
    <section className="w-full py-16 lg:py-24 bg-[#f6fbf5]" id="collections">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#725b24]">
              {t.signatureSub}
            </span>
            <h2 className="font-display text-[32px] sm:text-[38px] text-[#00261e] tracking-tight">
              {t.signatureTitle}
            </h2>
          </div>
          <p className="text-[15px] text-[#414845] max-w-md leading-relaxed">
            {t.signatureDesc}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Corporate VIP (7 Cols) */}
          <div
            id="corporate"
            className="md:col-span-7 group relative rounded-2xl overflow-hidden shadow-md bg-white flex flex-col justify-end min-h-[460px] border border-[#c0c8c4]/30"
          >
            <img
              alt="SANFRUIT Custom laser-engraved walnut wood fruit chest"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida/AEtjO1U4M_diLxagX8vJT3DlLse02dkrMb77eBVjWGa9C_mF05dkW2OiBhigpyd9dhQXIeesNLlXNhBZM_jcmW3foxLx7JrOZrzxFiVhZlW7gNkGBZ-ZYD3j3zmdLT-68i8IW6xNNnxoUcIPG8lbSzqNkiZUeNIHDLREXf1_yHDudtoL94eeAIg1bxJipcIJRCfQ5jO4YqHNStKVrAaflOTkTjcF6qg8J-CXFqxxpCMgeDVNAZZNoV47jIxx_-On"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00261e]/95 via-[#00261e]/40 to-transparent"></div>

            <div className="relative p-6 sm:p-8 text-white flex flex-col gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffdf9b] text-[#251a00] text-[11px] font-bold uppercase tracking-wider">
                  {t.corpBoxTag}
                </span>
                <span className="text-[13px] text-[#bfecdc] font-medium">
                  {t.corpBoxSubtitle}
                </span>
              </div>

              <h3 className="font-display text-[26px] sm:text-[30px] font-semibold text-white leading-tight">
                {t.corpBoxTitle}
              </h3>

              <p className="text-[14px] sm:text-[15px] text-[#e5e9e4] max-w-lg leading-relaxed">
                {t.corpBoxDesc}
              </p>

              <div className="flex items-center gap-4 pt-2 flex-wrap">
                <button
                  type="button"
                  onClick={onOpenCorporate}
                  className="inline-flex items-center gap-2 bg-[#725b24] text-white px-5 py-2.5 rounded font-semibold text-[14px] hover:bg-[#ffdf9b] hover:text-[#251a00] transition-colors shadow-sm cursor-pointer"
                >
                  <span>{t.viewCorpCatalog}</span>
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </button>
                <span className="text-[13px] text-[#e2c381] font-semibold">
                  {currency === 'USD' ? 'From $128 USD' : t.fromCorpPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Artisanal Woven Baskets (5 Cols) */}
          <div className="md:col-span-5 group relative rounded-2xl overflow-hidden shadow-md bg-white flex flex-col justify-end min-h-[460px] border border-[#c0c8c4]/30">
            <img
              alt="Artisanal woven picnic hamper layered with Shine Muscat grapes"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida/AEtjO1UWGJ65VwNu_GyRlt2UYAMYXST5s4yOX9xnY2IlEMiMMUoNK6LtIm-Xvs_XR7Uou-CXas_MEIUxSrwcmGCcgg7EDctZxu_aHEk-hVZ_osIzUAsCx-mrSQa6eCDg7I7ddHlUOBo8ldRJv-CShfi7XgflNZt2aryU8ocT9a5Qu5MC-Uu-y1WdVF4G19az8wiu9U38I-0Ytm21ZknGgKT--U-kVymfpU7et6GkxiP6qAZBZXSn1LwiwtBduy-H"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00261e]/90 via-[#00261e]/30 to-transparent"></div>

            <div className="relative p-6 sm:p-8 text-white flex flex-col gap-3">
              <span className="px-2.5 py-0.5 rounded-full bg-[#dfe4df] text-[#00261e] self-start text-[11px] font-bold uppercase tracking-wider">
                {t.basketTag}
              </span>

              <h3 className="font-display text-[24px] sm:text-[28px] font-semibold text-white leading-tight">
                {t.basketTitle}
              </h3>

              <p className="text-[13px] sm:text-[14px] text-[#e5e9e4] leading-relaxed">
                {t.basketDesc}
              </p>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => onSelectCategory('floral-baskets')}
                  className="text-[#ffdf9b] hover:text-white font-semibold text-[14px] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>{t.exploreStyles}</span>
                  <span className="material-symbols-outlined text-[16px]">
                    chevron_right
                  </span>
                </button>
                <span className="text-[16px] font-bold text-white">
                  {currency === 'USD' ? 'From $78' : t.fromBasketPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Modern Minimalist Acrylic Boxes (6 Cols) */}
          <div className="md:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#f0f5f0] shadow-sm border border-[#c0c8c4]/30 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#725b24]">
                  {t.acrylicTag}
                </span>
                <span className="material-symbols-outlined text-[#725b24] text-[22px]">
                  crop_square
                </span>
              </div>
              <h3 className="font-display text-[22px] sm:text-[24px] font-semibold text-[#00261e]">
                {t.acrylicTitle}
              </h3>
              <p className="text-[14px] text-[#414845] leading-relaxed">
                {t.acrylicDesc}
              </p>
            </div>

            <div className="pt-6 flex items-center justify-between border-t border-[#ebefea] mt-6">
              <span className="text-[16px] font-bold text-[#00261e]">
                {currency === 'USD' ? 'From $84 USD' : t.fromAcrylicPrice}
              </span>
              <button
                type="button"
                onClick={() => onSelectCategory('crystal-acrylic')}
                className="text-[#00261e] hover:text-[#725b24] font-semibold text-[14px] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>{t.viewStyles}</span>
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* Card 4: Seasonal Celebration Hampers (6 Cols) */}
          <div className="md:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#dfe4df]/70 shadow-sm border border-[#c0c8c4]/30 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#725b24]">
                  {t.festiveTag}
                </span>
                <span className="material-symbols-outlined text-[#725b24] text-[22px]">
                  celebration
                </span>
              </div>
              <h3 className="font-display text-[22px] sm:text-[24px] font-semibold text-[#00261e]">
                {t.festiveTitle}
              </h3>
              <p className="text-[14px] text-[#414845] leading-relaxed">
                {t.festiveDesc}
              </p>
            </div>

            <div className="pt-6 flex items-center justify-between border-t border-[#c0c8c4]/40 mt-6">
              <span className="text-[16px] font-bold text-[#00261e]">
                {currency === 'USD' ? 'From $105 USD' : t.fromFestivePrice}
              </span>
              <button
                type="button"
                onClick={() => onSelectCategory('seasonal-wine')}
                className="text-[#00261e] hover:text-[#725b24] font-semibold text-[14px] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>{t.reserveHamper}</span>
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
