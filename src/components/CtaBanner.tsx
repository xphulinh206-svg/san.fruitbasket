import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface CtaBannerProps {
  language: Language;
  onOpenSommelierHotline: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  language,
  onOpenSommelierHotline,
}) => {
  const t = translations[language];

  return (
    <section className="w-full py-16 lg:py-24 bg-[#00261e] text-white relative overflow-hidden" id="concierge-contact">
      {/* Background botanical ornament glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#113d32]/50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-16 text-center flex flex-col items-center gap-6 relative z-10">
        {/* Emblem */}
        <div className="w-16 h-16 rounded-full overflow-hidden bg-[#bfecdc]/20 p-1 flex items-center justify-center ring-2 ring-[#725b24]/40">
          <img
            alt="SANFRUIT Emblem"
            className="w-full h-full object-cover rounded-full"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeant76lprs3Cg3guBbZocScanMOeKuo0JUdcqlBElTmbF5c89XaFnidZbjvILADDZMOpDSElxZZcJHxE7dOWUwV0QiPSi-9Uw285toeecwZ2aW9pLtlJbokSgbdV_bdMJHS-hRnyOyJGK7IwM8mQe36iDiQpijniIgFItVWSAaUwR1N93ztNENc6Ttd6NWj6FAuGXaLCx9EgLLxLJWhGzttAuC1Z-ryyFnuItfnKGZEjk7lPsq8AMldzlN0Q1Yfs_OCM"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2 max-w-2xl">
          <h2 className="font-display text-[32px] sm:text-[40px] text-white leading-tight">
            {t.ctaTitle}
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[#e5e9e4] leading-relaxed">
            {t.ctaDesc}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            className="inline-flex items-center gap-2 bg-[#725b24] text-white px-8 py-3.5 rounded font-semibold text-[14px] hover:bg-[#ffdf9b] hover:text-[#251a00] transition-colors shadow-md cursor-pointer"
            href="https://wa.me/84868348519"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined text-[20px]">
              chat
            </span>
            <span>{t.whatsappBtn}</span>
          </a>

          <button
            type="button"
            onClick={onOpenSommelierHotline}
            className="inline-flex items-center gap-2 bg-white text-[#00261e] px-7 py-3.5 rounded font-semibold text-[14px] hover:bg-[#ebefea] transition-colors shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] text-[#725b24]">
              call
            </span>
            <span>{t.callHotlineBtn}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
