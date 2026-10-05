import React, { useState } from 'react';
import { Language, Currency } from '../types';
import { translations } from '../data/translations';
import { DELIVERY_ZONES } from '../data/hampers';
import { formatPrice } from '../utils/format';

interface DeliveryZonesProps {
  language: Language;
  currency: Currency;
}

export const DeliveryZones: React.FC<DeliveryZonesProps> = ({ language, currency }) => {
  const t = translations[language];

  // Interactive District Checker
  const [selectedDistrict, setSelectedDistrict] = useState<string>('d1');

  const districtEstimates: Record<
    string,
    { name: string; nameVn: string; eta: string; etaVn: string; feeVnd: number; feeUsd: number; zone: string; zoneVn: string }
  > = {
    d1: {
      name: 'District 1 (Ben Nghe, Da Kao, Ben Thanh)',
      nameVn: 'Quận 1 (Bến Nghé, Đa Kao, Bến Thành)',
      eta: '45 - 90 mins Express (Central Fleet)',
      etaVn: '45 - 90 phút hỏa tốc (Xe lạnh chuyên dụng)',
      feeVnd: 50000,
      feeUsd: 2,
      zone: 'Zone 1: Inner Core',
      zoneVn: 'Khu Vực 1: Trung Tâm',
    },
    d2: {
      name: 'District 2 (Thao Dien, An Phu, Thu Thiem)',
      nameVn: 'Quận 2 (Thảo Điền, An Phú, Thủ Thiêm)',
      eta: '30 - 60 mins (Immediate from Flagship Showroom)',
      etaVn: '30 - 60 phút (Xuất phát trực tiếp từ Showroom Thảo Điền)',
      feeVnd: 40000,
      feeUsd: 1.5,
      zone: 'Zone 2: Flagship & Expat Enclave',
      zoneVn: 'Khu Vực 2: Trụ Sở Showroom & Biệt Thự',
    },
    d7: {
      name: 'District 7 (Phu My Hung, Tan Phong)',
      nameVn: 'Quận 7 (Phú Mỹ Hưng, Tân Phong, Sunrise City)',
      eta: '60 - 90 mins (Concierge Direct Handover)',
      etaVn: '60 - 90 phút (Bàn giao tận sảnh chung cư / cổng biệt thự)',
      feeVnd: 70000,
      feeUsd: 2.8,
      zone: 'Zone 2: Expat Enclaves',
      zoneVn: 'Khu Vực 2: Khu Đô Thị Quốc Tế',
    },
    binhthanh: {
      name: 'Binh Thanh District (Landmark 81, Saigon Pearl)',
      nameVn: 'Quận Bình Thạnh (Landmark 81, Saigon Pearl, City Garden)',
      eta: '45 - 75 mins Express',
      etaVn: '45 - 75 phút hỏa tốc',
      feeVnd: 50000,
      feeUsd: 2,
      zone: 'Zone 1: Inner Core',
      zoneVn: 'Khu Vực 1: Trung Tâm',
    },
    d3: {
      name: 'District 3 (Vo Thi Sau, Truong Dinh, Nam Ky Khoi Nghia)',
      nameVn: 'Quận 3 (Võ Thị Sáu, Trương Định, Nam Kỳ Khởi Nghĩa)',
      eta: '60 - 80 mins Express',
      etaVn: '60 - 80 phút hỏa tốc',
      feeVnd: 50000,
      feeUsd: 2,
      zone: 'Zone 1: Inner Core',
      zoneVn: 'Khu Vực 1: Trung Tâm',
    },
    thuduc: {
      name: 'Thu Duc City (Hi-Tech Park, Linh Trung, Tam Binh)',
      nameVn: 'TP. Thủ Đức (Khu Công Nghệ Cao, Linh Trung, Tam Bình)',
      eta: 'Scheduled Same-Day / 90 - 120 mins',
      etaVn: 'Trong ngày theo giờ hẹn / 90 - 120 phút',
      feeVnd: 90000,
      feeUsd: 3.5,
      zone: 'Zone 3: Greater HCMC',
      zoneVn: 'Khu Vực 3: Ngoại Thành',
    },
  };

  const currentDist = districtEstimates[selectedDistrict];

  return (
    <section className="w-full py-16 lg:py-24 bg-[#f0f5f0]" id="delivery-zones">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#725b24]">
            {t.deliverySub}
          </span>
          <h2 className="font-display text-[32px] sm:text-[38px] text-[#00261e] tracking-tight mt-1">
            {t.deliveryTitle}
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#414845] max-w-xl mt-2 leading-relaxed">
            {t.deliveryDesc}
          </p>
        </div>

        {/* 3 Main Delivery Zones Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {DELIVERY_ZONES.map((zone, idx) => {
            const isZone1 = idx === 0;
            const isZone2 = idx === 1;

            return (
              <div
                key={zone.id}
                className="flex flex-col p-6 rounded-2xl bg-white shadow-sm border border-[#c0c8c4]/30 gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      isZone1
                        ? 'bg-[#ffdf9b] text-[#251a00]'
                        : isZone2
                        ? 'bg-[#bfecdc] text-[#002019]'
                        : 'bg-[#dfe4df] text-[#414845]'
                    }`}
                  >
                    {language === 'VN' ? zone.etaVn : zone.eta}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[22px] ${
                      isZone1 ? 'text-[#725b24]' : isZone2 ? 'text-[#00261e]' : 'text-[#717975]'
                    }`}
                  >
                    {isZone1 ? 'local_shipping' : isZone2 ? 'home_pin' : 'schedule'}
                  </span>
                </div>

                <h3 className="font-headline text-[20px] font-semibold text-[#00261e]">
                  {language === 'VN' ? zone.zoneTitleVn : zone.zoneTitle}
                </h3>

                <p className="text-[13px] text-[#414845] leading-relaxed flex-1">
                  {language === 'VN' ? zone.descriptionVn : zone.description}
                </p>

                <div className="pt-3 border-t border-[#ebefea] text-[12px] font-semibold text-[#00261e] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#725b24] shrink-0">
                    check_circle
                  </span>
                  <span>{language === 'VN' ? zone.perkVn : zone.perk}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Delivery District ETA Checker */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#c0c8c4]/30 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-md">
            <span className="text-[11px] uppercase tracking-wider text-[#725b24] font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">pin_drop</span>
              {language === 'VN' ? 'Kiểm Tra Thời Gian Giao Đến Địa Chỉ Của Bạn' : 'Check Delivery ETA to Your District'}
            </span>
            <h4 className="font-headline text-[18px] sm:text-[20px] font-semibold text-[#00261e]">
              {language === 'VN' ? 'Chọn Quận/Khu Vực Nhận Hàng Tại Sài Gòn' : 'Select Saigon Delivery Destination'}
            </h4>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="p-2.5 rounded-lg bg-[#f0f5f0] text-[13px] text-[#181d1a] border border-[#c0c8c4]/40 focus:outline-none focus:ring-1 focus:ring-[#725b24] font-medium"
            >
              {Object.entries(districtEstimates).map(([k, v]) => (
                <option key={k} value={k}>
                  {language === 'VN' ? v.nameVn : v.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-auto p-4 rounded-xl bg-[#ebefea] border border-[#c0c8c4]/30 flex flex-col gap-2 min-w-[280px]">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase text-[#717975]">
              <span>{language === 'VN' ? currentDist.zoneVn : currentDist.zone}</span>
              <span className="text-[#00261e]">{formatPrice(currentDist.feeVnd, currentDist.feeUsd, currency)}</span>
            </div>
            <div className="flex items-center gap-2 text-[#00261e] font-semibold text-[14px]">
              <span className="material-symbols-outlined text-[#725b24] text-[20px]">
                timer
              </span>
              <span>{language === 'VN' ? currentDist.etaVn : currentDist.eta}</span>
            </div>
            <p className="text-[11px] text-[#414845]">
              {language === 'VN'
                ? '★ Miễn phí giao hàng cho đơn quà tặng từ 2.000.000₫'
                : '★ Complimentary delivery applies on orders over 2,000,000₫'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
