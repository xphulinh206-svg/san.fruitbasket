import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  language: Language;
  onOpenCorporate: () => void;
  onOpenCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenCorporate,
  onOpenCategory,
}) => {
  const t = translations[language];

  return (
    <footer className="w-full bg-[#f0f5f0] text-[#414845] pt-16 pb-12 border-t border-[#ebefea]">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4 pr-0 lg:pr-8">
            <div className="flex items-center gap-3">
              <img
                alt="san.fruit brand"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#725b24]/30"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XBSMF_iyXi8g99ALEuWANtNGwp7HtSvKLFGoQI_7dSl-POAdsYGJyubyyGN8nPUnID69wFaz4fTD-xvIcbOc_tI0RHuxH8AAmZ2xXCPZwVX-7zqZXBWk1VAnUbP1zrD8KWtqn8lTPMrvadxSj8T9C_sLc2tWlL_NlxHZbadA0A4z1YbFD4OJmkH5c0zz6pd80d1IGcxIDDhacxlY9BhUmr73s0nMZcpm_bgSRgsrmocVniueuC0RUT3pwbcAhZ1BEwL453nFz5Hsk"
              />
              <span className="font-headline text-[22px] font-semibold text-[#00261e]">
                san.fruit
              </span>
            </div>

            <p className="text-[14px] leading-relaxed text-[#414845] max-w-md">
              {t.footerAbout}
            </p>

            <div className="flex flex-col gap-2 mt-2 text-[13px]">
              <p className="flex items-center gap-2 text-[#181d1a]">
                <span className="material-symbols-outlined text-[16px] text-[#725b24] shrink-0">
                  location_on
                </span>
                <span>{t.footerShowroom}</span>
              </p>
              <p className="flex items-center gap-2 text-[#181d1a]">
                <span className="material-symbols-outlined text-[16px] text-[#725b24] shrink-0">
                  call
                </span>
                <span>
                  Hotline / WhatsApp / Zalo:{' '}
                  <strong className="text-[#00261e] font-bold">
                    0868 348 519
                  </strong>
                </span>
              </p>
              <p className="flex items-center gap-2 text-[#181d1a]">
                <span className="material-symbols-outlined text-[16px] text-[#725b24] shrink-0">
                  schedule
                </span>
                <span>{t.footerHours}</span>
              </p>
            </div>
          </div>

          {/* Bespoke Gifting */}
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#00261e]">
              {language === 'VN' ? 'Bộ Sưu Tập Quà' : 'Bespoke Gifting'}
            </span>
            <button
              type="button"
              onClick={onOpenCorporate}
              className="text-left text-[14px] hover:text-[#00261e] transition-colors"
            >
              {language === 'VN' ? 'Giỏ Quà VIP Doanh Nghiệp' : 'Corporate VIP Baskets'}
            </button>
            <button
              type="button"
              onClick={() => onOpenCategory('seasonal-wine')}
              className="text-left text-[14px] hover:text-[#00261e] transition-colors"
            >
              {language === 'VN' ? 'Giỏ Quà Mùa Lễ Hội' : 'Seasonal Fruit Hampers'}
            </button>
            <button
              type="button"
              onClick={() => onOpenCategory('crystal-acrylic')}
              className="text-left text-[14px] hover:text-[#00261e] transition-colors"
            >
              {language === 'VN' ? 'Hộp Dưa Lưới Hoàng Gia' : 'Japanese Crown Melon Boxes'}
            </button>
            <button
              type="button"
              onClick={() => onOpenCategory('seasonal-wine')}
              className="text-left text-[14px] hover:text-[#00261e] transition-colors"
            >
              {language === 'VN' ? 'Set Bánh Gateau & Hoa Tươi' : 'Artisanal Cake & Fruit Sets'}
            </button>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('bespoke-atelier');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-left text-[14px] hover:text-[#00261e] transition-colors"
            >
              {language === 'VN' ? 'Thiệp Thư Pháp Viết Tay' : 'Calligraphy & Custom Ribbons'}
            </button>
          </div>

          {/* Customer Care */}
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#00261e]">
              {language === 'VN' ? 'Chăm Sóc Khách Hàng' : 'Customer Care'}
            </span>
            <a
              href="#delivery-zones"
              className="text-[14px] hover:text-[#00261e] transition-colors"
            >
              {language === 'VN' ? 'Phạm Vi Giao Nhanh 2 Giờ' : 'Express 2H Delivery Coverage'}
            </a>
            <a
              href="#concierge-contact"
              className="text-[14px] hover:text-[#00261e] transition-colors"
            >
              {language === 'VN' ? 'Tư Vấn Khách Quốc Tế (Expat)' : 'Expatriate Gifting Concierge'}
            </a>
            <button
              type="button"
              onClick={onOpenCorporate}
              className="text-left text-[14px] hover:text-[#00261e] transition-colors"
            >
              {language === 'VN' ? 'Hóa Đơn Thuế Doanh Nghiệp (VAT)' : 'Corporate Tax Invoicing (VAT)'}
            </button>
            <span className="text-[14px] hover:text-[#00261e] transition-colors cursor-pointer">
              {language === 'VN' ? 'Chính Sách Đổi Trả Đảm Bảo' : 'Freshness & Replacement Policy'}
            </span>
            <span className="text-[14px] hover:text-[#00261e] transition-colors cursor-pointer">
              {language === 'VN' ? 'Hướng Dẫn Thanh Toán VietQR' : 'Payment Verification Guide'}
            </span>
          </div>

          {/* Authenticity & Trust */}
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#00261e]">
              {language === 'VN' ? 'Chứng Nhận & Uy Tín' : 'Authenticity & Trust'}
            </span>
            <div className="flex flex-col gap-2 text-[13px]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#725b24] text-[18px]">
                  verified
                </span>
                <span>GlobalG.A.P Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#725b24] text-[18px]">
                  health_and_safety
                </span>
                <span>Vietnam Food Safety Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#725b24] text-[18px]">
                  shuffle
                </span>
                <span>Climate-Controlled Delivery</span>
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-1.5">
              <span className="text-[11px] uppercase tracking-wider text-[#717975] font-bold">
                {language === 'VN' ? 'Phương Thức Thanh Toán' : 'Accepted Payments'}
              </span>
              <div className="flex items-center gap-2 text-[12px] font-semibold flex-wrap">
                <span className="px-2.5 py-1 bg-white rounded border border-[#c0c8c4]/40 text-[#00261e] shadow-2xs font-bold text-[11px]">
                  VietQR
                </span>
                <span className="px-2.5 py-1 bg-white rounded border border-[#c0c8c4]/40 text-[#00261e] shadow-2xs">
                  Visa
                </span>
                <span className="px-2.5 py-1 bg-white rounded border border-[#c0c8c4]/40 text-[#00261e] shadow-2xs">
                  Mastercard
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#ebefea] flex flex-col md:flex-row items-center justify-between text-[12px] text-[#717975] gap-3">
          <p>{t.rightsReserved}</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#00261e] transition-colors cursor-pointer">
              {language === 'VN' ? 'Chính Sách Bảo Mật' : 'Privacy Policy'}
            </span>
            <span className="hover:text-[#00261e] transition-colors cursor-pointer">
              {language === 'VN' ? 'Điều Khoản Dịch Vụ' : 'Terms of Service'}
            </span>
            <button
              type="button"
              onClick={onOpenCorporate}
              className="hover:text-[#00261e] transition-colors font-medium cursor-pointer"
            >
              {language === 'VN' ? 'Tải Báo Giá Doanh Nghiệp B2B' : 'B2B Catalog Request'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
