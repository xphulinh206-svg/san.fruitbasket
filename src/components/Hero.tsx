import React from 'react';
import { Currency, Language, Hamper } from '../types';
import { translations } from '../data/translations';
import { formatPrice } from '../utils/format';

interface HeroProps {
  language: Language;
  currency: Currency;
  onExploreCollections: () => void;
  onOpenCorporate: () => void;
  onQuickViewHamper: (hamper: Hamper) => void;
  featuredHamper: Hamper;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  currency,
  onExploreCollections,
  onOpenCorporate,
  onQuickViewHamper,
  featuredHamper,
}) => {
  const t = translations[language];

  return (
    <section className="relative w-full pt-36 pb-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#f0f5f0] via-[#f6fbf5] to-[#f6fbf5]">
      {/* Ambient Botanical Backlight */}
      <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-[#ffdf9b]/25 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -right-24 w-[30rem] h-[30rem] rounded-full bg-[#bfecdc]/30 blur-3xl pointer-events-none"></div>

      <div className="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Text & Value Proposition */}
          <div className="lg:col-span-6 flex flex-col gap-6 z-10">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-[#dfe4df] shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#725b24]"></span>
              <span className="text-[11px] uppercase tracking-widest text-[#00261e] font-bold">
                {t.heroTag}
              </span>
            </div>

            {/* Display Headline */}
            <div className="flex flex-col gap-2">
              <h1 className="font-display text-[38px] sm:text-[46px] lg:text-[54px] text-[#00261e] tracking-tight leading-[1.15]">
                {t.heroTitlePart1} <br />
                <span className="italic font-normal text-[#725b24]">
                  {t.heroTitlePart2}
                </span>
              </h1>
              <p className="text-[16px] lg:text-[17px] leading-relaxed text-[#414845] max-w-xl">
                {t.heroDesc}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onExploreCollections}
                className="inline-flex items-center justify-center gap-2 bg-[#725b24] text-[#ffffff] px-8 py-3.5 rounded font-semibold text-[14px] shadow-md hover:bg-[#59440e] transition-all cursor-pointer group"
              >
                <span>{t.exploreCollections}</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>

              <button
                type="button"
                onClick={onOpenCorporate}
                className="inline-flex items-center justify-center gap-2 bg-[#f0f5f0] text-[#00261e] px-7 py-3.5 rounded font-semibold text-[14px] shadow-sm hover:bg-[#e5e9e4] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#725b24]">
                  corporate_fare
                </span>
                <span>{t.corporateInquiries}</span>
              </button>
            </div>

            {/* Micro Stat Counters */}
            <div className="pt-4 grid grid-cols-3 gap-4 max-w-md border-t border-[#ebefea]">
              <div className="flex flex-col">
                <span className="font-display text-[24px] font-bold text-[#00261e]">
                  {t.stat2H}
                </span>
                <span className="text-[12px] sm:text-[13px] text-[#414845]">
                  {t.stat2HDesc}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-[24px] font-bold text-[#00261e]">
                  {t.statCert}
                </span>
                <span className="text-[12px] sm:text-[13px] text-[#414845]">
                  {t.statCertDesc}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-[24px] font-bold text-[#00261e]">
                  {t.statRating}
                </span>
                <span className="text-[12px] sm:text-[13px] text-[#414845]">
                  {t.statRatingDesc}
                </span>
              </div>
            </div>
          </div>

          {/* Hero Featured Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div
              onClick={() => onQuickViewHamper(featuredHamper)}
              className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-white group cursor-pointer border border-[#c0c8c4]/30"
              title="Click to view hamper details"
            >
              <img
                alt="Saigon Harvest Grand Fruit Basket featuring Shine Muscat grapes and Korean Singo pears"
                className="w-full h-[460px] sm:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
                src={featuredHamper.image}
              />

              {/* Glassmorphism Floating Tag */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-between border border-white/60">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-[#00261e]/10 flex items-center justify-center shrink-0 ring-1 ring-[#725b24]/30">
                    <img
                      alt="SANFRUIT Seal"
                      className="w-10 h-10 object-cover rounded-full"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI6XWRkTCzEEmVFalzE46QVkbJEoqLXeHF7unVwvUNzKIVyXk_gGfakKEQ5nanyW2HJ_Aq2HQqfqi3bd9iH7rcQ9_CrjYjrw_jP64zKOVtaIczPhMQeHYkxhdkxrIIXDx5pywZj28-gfDnCz2J_sEE52GPXCjnt7flLpQvyzL1YESPqOUERDAPv7ijTI7u9pbzxEnbFG7lVFVtzKvQwTbszpoCng7aeLdH2egJ_ybvtoKJlXN9GW0QyxcRCvdKjAZbC-U"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-[15px] sm:text-[16px] text-[#00261e]">
                      {language === 'VN' ? featuredHamper.nameVn : featuredHamper.name}
                    </span>
                    <span className="text-[12px] sm:text-[13px] text-[#414845] truncate max-w-[190px] sm:max-w-[320px]">
                      {language === 'VN' ? featuredHamper.subtitleVn : featuredHamper.subtitle}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-2">
                  <span className="text-[17px] sm:text-[19px] font-bold text-[#00261e] block">
                    {formatPrice(featuredHamper.priceVnd, featuredHamper.priceUsd, currency)}
                  </span>
                  <span className="text-[11px] text-[#717975] block">
                    {currency === 'VND' ? `≈ $${featuredHamper.priceUsd} USD` : `≈ ${featuredHamper.priceVnd.toLocaleString('vi-VN')}₫`}
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Stamp */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#ffdf9b] text-[#251a00] flex flex-col items-center justify-center text-center p-2 shadow-md rotate-12 ring-2 ring-white select-none">
              <span className="text-[10px] uppercase font-bold tracking-widest leading-none">
                {t.stampHandcrafted}
              </span>
              <span className="font-headline text-[17px] font-bold leading-tight">
                {t.stampFresh}
              </span>
              <span className="text-[9px] uppercase tracking-wider font-semibold">
                {t.stampDaily}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
