import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface TrustBarProps {
  language: Language;
}

export const TrustBar: React.FC<TrustBarProps> = ({ language }) => {
  const t = translations[language];

  const pillars = [
    {
      icon: 'electric_bolt',
      iconBg: 'bg-[#ffdf9b]/50 text-[#725b24]',
      title: t.pillar1Title,
      desc: t.pillar1Desc,
    },
    {
      icon: 'verified',
      iconBg: 'bg-[#bfecdc]/50 text-[#00261e]',
      title: t.pillar2Title,
      desc: t.pillar2Desc,
    },
    {
      icon: 'history_edu',
      iconBg: 'bg-[#ffdf9b]/50 text-[#725b24]',
      title: t.pillar3Title,
      desc: t.pillar3Desc,
    },
    {
      icon: 'forum',
      iconBg: 'bg-[#bfecdc]/50 text-[#00261e]',
      title: t.pillar4Title,
      desc: t.pillar4Desc,
    },
  ];

  return (
    <section className="w-full py-8 lg:py-10 bg-[#f0f5f0] border-y border-[#ebefea]">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-[#c0c8c4]/20 hover:border-[#725b24]/40 hover:shadow-md transition-all group"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${p.iconBg}`}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {p.icon}
                </span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-semibold text-[15px] text-[#00261e] leading-snug">
                  {p.title}
                </h4>
                <p className="text-[13px] text-[#414845] mt-1 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
