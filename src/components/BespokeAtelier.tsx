import React, { useState } from 'react';
import { Currency, Language, CustomHamperConfig } from '../types';
import { translations } from '../data/translations';
import { CORE_FRUITS_LIST, RIBBON_OPTIONS, ADDON_OPTIONS } from '../data/hampers';
import { formatPrice } from '../utils/format';

interface BespokeAtelierProps {
  language: Language;
  currency: Currency;
  onAddCustomHamperToCart: (config: CustomHamperConfig, calculatedPriceVnd: number, calculatedPriceUsd: number) => void;
  preloadedHamperName?: string;
}

export const BespokeAtelier: React.FC<BespokeAtelierProps> = ({
  language,
  currency,
  onAddCustomHamperToCart,
}) => {
  const t = translations[language];

  // Customizer State
  const [vessel, setVessel] = useState<'rattan' | 'walnut' | 'acrylic'>('rattan');
  const [selectedFruits, setSelectedFruits] = useState<string[]>(['muscat', 'cherries', 'singo']);
  const [ribbon, setRibbon] = useState<string>('gold');
  const [addon, setAddon] = useState<string>('none');
  const [calligraphyMessage, setCalligraphyMessage] = useState<string>(
    language === 'VN'
      ? 'Kính chúc Quý công ty và Gia đình một năm mới dồi dào sức khỏe, hanh thông và đại cát thịnh vượng!'
      : 'Wishing you radiant health, boundless success, and joy from beautiful Saigon!'
  );
  const [cardLanguage, setCardLanguage] = useState<'EN' | 'VN'>(language);
  const [recipientName, setRecipientName] = useState<string>('');
  const [showCalligraphyPreview, setShowCalligraphyPreview] = useState<boolean>(true);

  // Vessel pricing
  const vesselPrices: Record<string, { vnd: number; usd: number }> = {
    rattan: { vnd: 1650000, usd: 65 },
    walnut: { vnd: 2450000, usd: 96 },
    acrylic: { vnd: 1950000, usd: 77 },
  };

  // Fruit toggle (Max 3)
  const handleFruitToggle = (fruitId: string) => {
    if (selectedFruits.includes(fruitId)) {
      if (selectedFruits.length > 1) {
        setSelectedFruits(selectedFruits.filter((id) => id !== fruitId));
      }
    } else {
      if (selectedFruits.length < 3) {
        setSelectedFruits([...selectedFruits, fruitId]);
      } else {
        // Replace oldest or keep max 3
        setSelectedFruits([...selectedFruits.slice(1), fruitId]);
      }
    }
  };

  // Calculate total price
  const baseVessel = vesselPrices[vessel];
  const selectedAddonObj = ADDON_OPTIONS.find((a) => a.id === addon) || ADDON_OPTIONS[0];

  const totalVnd = baseVessel.vnd + selectedAddonObj.priceVnd;
  const totalUsd = baseVessel.usd + selectedAddonObj.priceUsd;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const config: CustomHamperConfig = {
      vessel,
      coreFruits: selectedFruits,
      ribbon,
      addon,
      addonPriceVnd: selectedAddonObj.priceVnd,
      addonPriceUsd: selectedAddonObj.priceUsd,
      calligraphyMessage,
      cardLanguage,
      recipientName,
    };
    onAddCustomHamperToCart(config, totalVnd, totalUsd);
  };

  return (
    <section className="w-full py-16 lg:py-24 bg-[#f6fbf5]" id="bespoke-atelier">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="rounded-3xl bg-[#ebefea] p-6 sm:p-10 lg:p-12 shadow-md border border-[#c0c8c4]/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Atelier Philosophy & Concierge Contact */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-[#ffdf9b] text-[#251a00]">
                  <span className="material-symbols-outlined text-[16px]">
                    palette
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    {t.bespokeSub}
                  </span>
                </div>

                <h2 className="font-display text-[30px] sm:text-[36px] text-[#00261e] leading-tight">
                  {t.bespokeTitle}
                </h2>

                <p className="text-[14px] sm:text-[15px] text-[#414845] leading-relaxed">
                  {t.bespokeDesc}
                </p>
              </div>

              {/* Calligraphy Preview Card (if toggled) */}
              {showCalligraphyPreview && (
                <div className="p-5 rounded-2xl bg-[#fcf9f2] border border-[#d4af37]/40 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#d4af37]/20 to-transparent pointer-events-none"></div>
                  <div className="flex items-center justify-between mb-3 border-b border-[#d4af37]/20 pb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#725b24] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">
                        history_edu
                      </span>
                      {language === 'VN' ? 'Mẫu Thiệp Thư Pháp Tặng Kèm' : 'Calligraphy Card Preview'}
                    </span>
                    <span className="text-[10px] text-[#717975] uppercase font-semibold">
                      {cardLanguage} Script
                    </span>
                  </div>

                  {recipientName && (
                    <p className="font-serif italic text-[14px] text-[#00261e] font-semibold mb-2">
                      Dear {recipientName},
                    </p>
                  )}

                  <p className="font-serif italic text-[15px] sm:text-[16px] text-[#113d32] leading-relaxed min-h-[50px]">
                    "{calligraphyMessage || (language === 'VN' ? 'Lời chúc tốt đẹp nhất...' : 'Your custom message...')}"
                  </p>

                  <div className="mt-4 pt-2 border-t border-[#d4af37]/20 flex items-center justify-between text-[11px] text-[#725b24]">
                    <span className="font-medium tracking-wide">
                      SANFRUIT Atelier • Saigon
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-[#725b24]">
                      verified
                    </span>
                  </div>
                </div>
              )}

              {/* Concierge Hotline Card */}
              <div className="flex flex-col gap-3 p-4 sm:p-5 rounded-xl bg-white shadow-sm border border-[#c0c8c4]/30">
                <div className="flex items-center gap-3">
                  <img
                    alt="SANFRUIT Concierge"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#725b24]/30"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkkEFe4S6xIfbPGY9f4zNpv4YF24GrvWtALdVi9kQJXv-kZmETqGU74Lux7oauzy7cNINUcU23tquxSkWNPqO3DQ14mXn4_yv1NARNJrHMOHGCLRHdBX8FbRGr_EfUls7Hcwt-yDEH1xr-Jsp_pf2HjeDYaPDL9fhdLGthibgIdsVQKwr76U61NDWhAmNtNnk_6k8eQI6GzWqSfmyVTG5GXjcPgPa2GDsnzK-UvZ_wuUJpRNgtS67ypt58U2XhzcmfRCA"
                  />
                  <div className="flex flex-col">
                    <span className="text-[15px] font-semibold text-[#00261e]">
                      {t.sommelierHotline}
                    </span>
                    <a
                      href="https://wa.me/84868348519"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] text-[#725b24] font-bold hover:underline"
                    >
                      0868 348 519 (Zalo / WhatsApp)
                    </a>
                  </div>
                </div>
                <p className="text-[13px] text-[#414845] italic leading-relaxed">
                  {t.sommelierQuote}
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-7 flex flex-col gap-6 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#c0c8c4]/30"
            >
              {/* Step 1: Vessel Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[#00261e]">
                  {t.step1Title}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setVessel('rattan')}
                    className={`p-3 rounded-lg text-left transition-all border cursor-pointer ${
                      vessel === 'rattan'
                        ? 'bg-[#00261e] text-white border-[#00261e] shadow-sm'
                        : 'bg-[#f0f5f0] text-[#181d1a] border-transparent hover:bg-[#e5e9e4]'
                    }`}
                  >
                    <span className="text-[12px] font-bold block">
                      {language === 'VN' ? 'Giỏ Mây Thủ Công' : 'Artisanal Rattan'}
                    </span>
                    <span className="text-[11px] opacity-80 block">
                      {language === 'VN' ? 'Mây tre đan tự nhiên' : 'Picnic woven basket'}
                    </span>
                    <span className="text-[11px] font-semibold mt-1 block opacity-90">
                      {formatPrice(vesselPrices.rattan.vnd, vesselPrices.rattan.usd, currency)}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVessel('walnut')}
                    className={`p-3 rounded-lg text-left transition-all border cursor-pointer ${
                      vessel === 'walnut'
                        ? 'bg-[#00261e] text-white border-[#00261e] shadow-sm'
                        : 'bg-[#f0f5f0] text-[#181d1a] border-transparent hover:bg-[#e5e9e4]'
                    }`}
                  >
                    <span className="text-[12px] font-bold block">
                      {language === 'VN' ? 'Hộp Gỗ Óc Chó' : 'Walnut Wood'}
                    </span>
                    <span className="text-[11px] opacity-80 block">
                      {language === 'VN' ? 'Khắc laser VIP' : 'Engraved VIP coffer'}
                    </span>
                    <span className="text-[11px] font-semibold mt-1 block opacity-90">
                      {formatPrice(vesselPrices.walnut.vnd, vesselPrices.walnut.usd, currency)}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVessel('acrylic')}
                    className={`p-3 rounded-lg text-left transition-all border cursor-pointer ${
                      vessel === 'acrylic'
                        ? 'bg-[#00261e] text-white border-[#00261e] shadow-sm'
                        : 'bg-[#f0f5f0] text-[#181d1a] border-transparent hover:bg-[#e5e9e4]'
                    }`}
                  >
                    <span className="text-[12px] font-bold block">
                      {language === 'VN' ? 'Hộp Acrylic Pha Lê' : 'Crystal Acrylic'}
                    </span>
                    <span className="text-[11px] opacity-80 block">
                      {language === 'VN' ? 'Mica trong suốt' : 'Modern floral box'}
                    </span>
                    <span className="text-[11px] font-semibold mt-1 block opacity-90">
                      {formatPrice(vesselPrices.acrylic.vnd, vesselPrices.acrylic.usd, currency)}
                    </span>
                  </button>
                </div>
              </div>

              {/* Step 2: Preferred Core Fruits */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-[14px] font-bold text-[#00261e]">
                    {t.step2Title}
                  </label>
                  <span className="text-[11px] text-[#725b24] font-semibold">
                    {selectedFruits.length}/3 {language === 'VN' ? 'đã chọn' : 'selected'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CORE_FRUITS_LIST.map((fruit) => {
                    const isChecked = selectedFruits.includes(fruit.id);
                    return (
                      <label
                        key={fruit.id}
                        onClick={() => handleFruitToggle(fruit.id)}
                        className={`flex items-center gap-2 p-2.5 rounded-lg text-[13px] cursor-pointer transition-all border ${
                          isChecked
                            ? 'bg-[#e5e9e4] border-[#00261e]/40 font-semibold text-[#00261e]'
                            : 'bg-[#f0f5f0] border-transparent text-[#414845] hover:bg-[#ebefea]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="accent-[#00261e] h-4 w-4"
                        />
                        <span className="truncate">
                          {language === 'VN' ? fruit.nameVn : fruit.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Step 3 & 4: Ribbon and Add-on in 2 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Ribbon */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-bold text-[#00261e]">
                    {t.step3Title}
                  </label>
                  <select
                    value={ribbon}
                    onChange={(e) => setRibbon(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-[#f0f5f0] text-[13px] text-[#181d1a] border border-[#c0c8c4]/40 focus:outline-none focus:ring-1 focus:ring-[#725b24]"
                  >
                    {RIBBON_OPTIONS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {language === 'VN' ? r.nameVn : r.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Add-on Wine / Pastry */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-bold text-[#00261e]">
                    {t.step4Title}
                  </label>
                  <select
                    value={addon}
                    onChange={(e) => setAddon(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-[#f0f5f0] text-[13px] text-[#181d1a] border border-[#c0c8c4]/40 focus:outline-none focus:ring-1 focus:ring-[#725b24]"
                  >
                    {ADDON_OPTIONS.map((a) => (
                      <option key={a.id} value={a.id}>
                        {language === 'VN' ? a.nameVn : a.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 5: Recipient & Calligraphy Message */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-[14px] font-bold text-[#00261e]">
                    {t.step5Title}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCardLanguage(cardLanguage === 'EN' ? 'VN' : 'EN')}
                      className="text-[11px] font-bold text-[#725b24] underline hover:text-[#00261e]"
                    >
                      {cardLanguage === 'EN' ? 'Switch to Vietnamese' : 'Chuyển sang Tiếng Anh'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCalligraphyPreview(!showCalligraphyPreview)}
                      className="text-[11px] text-[#414845] hover:text-[#00261e] underline"
                    >
                      {showCalligraphyPreview ? 'Hide Preview' : 'Show Preview'}
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder={language === 'VN' ? 'Tên người nhận (ví dụ: Chị Linh, Anh David)' : "Recipient's Name (e.g. Ms. Sarah, Mr. Tanaka)"}
                  className="w-full p-2.5 rounded-lg bg-[#f0f5f0] text-[13px] text-[#181d1a] border border-[#c0c8c4]/40 focus:outline-none focus:ring-1 focus:ring-[#725b24]"
                />

                <textarea
                  rows={3}
                  value={calligraphyMessage}
                  onChange={(e) => setCalligraphyMessage(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  className="w-full p-3 rounded-lg bg-[#f0f5f0] text-[13px] text-[#181d1a] border border-[#c0c8c4]/40 focus:outline-none focus:ring-1 focus:ring-[#725b24]"
                ></textarea>
              </div>

              {/* Price Summary & Submit */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#ebefea]">
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-[#717975] font-bold">
                    {language === 'VN' ? 'Tổng Ước Tính Thiết Kế' : 'Estimated Atelier Quote'}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[22px] font-bold text-[#00261e]">
                      {formatPrice(totalVnd, totalUsd, currency)}
                    </span>
                    <span className="text-[12px] text-[#717975]">
                      {currency === 'VND' ? `≈ $${totalUsd} USD` : `≈ ${totalVnd.toLocaleString('vi-VN')}₫`}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded bg-[#725b24] text-white font-semibold text-[14px] shadow-md hover:bg-[#59440e] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[19px]">
                    send
                  </span>
                  <span>{t.submitHamper}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
