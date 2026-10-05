import React, { useState } from 'react';
import { Language } from '../types';

interface CorporateModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const CorporateModal: React.FC<CorporateModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState('10 - 25 hampers');
  const [budget, setBudget] = useState('2,500,000₫ - 4,000,000₫');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#c0c8c4]/30 relative flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[#00261e] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#ffdf9b] text-[26px]">
              corporate_fare
            </span>
            <div>
              <h3 className="font-headline text-[20px] font-semibold text-white">
                {language === 'VN' ? 'Tư Vấn Giỏ Quà Doanh Nghiệp VIP & VAT' : 'Corporate VIP & Diplomatic Inquiries'}
              </h3>
              <p className="text-[12px] text-[#bfecdc]">
                {language === 'VN' ? 'Khắc laser logo • Chiết khấu theo số lượng • Xuất hóa đơn VAT' : 'Laser engraving • Tier discounts • Full VAT compliance'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 bg-[#f6fbf5]">
          {submitted ? (
            <div className="flex flex-col items-center text-center p-4 gap-4">
              <div className="w-14 h-14 rounded-full bg-[#bfecdc] text-[#002019] flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px]">
                  verified
                </span>
              </div>
              <h4 className="font-headline text-[20px] font-semibold text-[#00261e]">
                {language === 'VN' ? 'Đã Nhận Yêu Cầu Doanh Nghiệp!' : 'Corporate Request Submitted!'}
              </h4>
              <p className="text-[13px] text-[#414845] leading-relaxed">
                {language === 'VN'
                  ? `Chuyên viên B2B của SANFRUIT sẽ gửi Bảng Báo Giá Chi Tiết & Mẫu Thiết Kế Khắc Logo qua Zalo/WhatsApp tới số ${phone} trong vòng 15 phút.`
                  : `Our B2B corporate sommelier will deliver your custom catalog and logo proof mockup via WhatsApp to ${phone} within 15 minutes.`}
              </p>
              <div className="pt-2 w-full flex flex-col gap-2">
                <a
                  href={`https://wa.me/84868348519?text=${encodeURIComponent(
                    `Hello SANFRUIT B2B Team, I represent ${company}. We are inquiring about ${quantity} VIP hampers.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-lg bg-[#725b24] text-white text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-[#59440e]"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chat
                  </span>
                  <span>{language === 'VN' ? 'Trao Đổi Trực Tiếp Qua Zalo / WhatsApp' : 'Chat Direct on WhatsApp (Priority)'}</span>
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-2.5 rounded-lg bg-[#ebefea] text-[#00261e] text-[13px] font-semibold hover:bg-[#dfe4df]"
                >
                  {language === 'VN' ? 'Đóng' : 'Close'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] font-bold text-[#00261e] block mb-1">
                    {language === 'VN' ? 'Tên Công Ty / Tổ Chức' : 'Company / Institution'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Standard Chartered / VinCapital"
                    className="w-full p-2.5 rounded-lg bg-white text-[13px] border border-[#c0c8c4]/40 focus:outline-none focus:ring-1 focus:ring-[#725b24]"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-bold text-[#00261e] block mb-1">
                    {language === 'VN' ? 'Người Đại Diện' : 'Contact Person'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Ms. Lan Anh (HR Director)"
                    className="w-full p-2.5 rounded-lg bg-white text-[13px] border border-[#c0c8c4]/40 focus:outline-none focus:ring-1 focus:ring-[#725b24]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] font-bold text-[#00261e] block mb-1">
                    {language === 'VN' ? 'Số Điện Thoại / Zalo / WhatsApp' : 'Phone / Zalo / WhatsApp'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0903 xxx xxx"
                    className="w-full p-2.5 rounded-lg bg-white text-[13px] border border-[#c0c8c4]/40 focus:outline-none focus:ring-1 focus:ring-[#725b24]"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-bold text-[#00261e] block mb-1">
                    {language === 'VN' ? 'Số Lượng Dự Kiến' : 'Estimated Quantity'}
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-white text-[13px] border border-[#c0c8c4]/40 focus:outline-none focus:ring-1 focus:ring-[#725b24]"
                  >
                    <option>5 - 10 hampers (VIP Executive)</option>
                    <option>10 - 25 hampers (5% Tier Discount)</option>
                    <option>25 - 50 hampers (10% Tier Discount)</option>
                    <option>50 - 200+ hampers (Bespoke Corporate Rate)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[12px] font-bold text-[#00261e] block mb-1">
                  {language === 'VN' ? 'Ngân Sách Mục Tiêu / Giỏ' : 'Target Budget per Hamper'}
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-white text-[13px] border border-[#c0c8c4]/40 focus:outline-none focus:ring-1 focus:ring-[#725b24]"
                >
                  <option>1,800,000₫ - 2,500,000₫ ($70 - $100)</option>
                  <option>2,500,000₫ - 3,500,000₫ ($100 - $140)</option>
                  <option>3,500,000₫ - 5,000,000₫ ($140 - $200)</option>
                  <option>5,000,000₫+ (Ultra Luxury Presidential)</option>
                </select>
              </div>

              <div>
                <label className="text-[12px] font-bold text-[#00261e] block mb-1">
                  {language === 'VN' ? 'Yêu Cầu Riêng (Khắc logo, xuất hóa đơn VAT, thời gian giao...)' : 'Bespoke Requirements (Laser logo, VAT invoice, deadlines...)'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Please provide laser engraving mockup with our company logo and schedule delivery to Bitexco Tower on Friday."
                  className="w-full p-2.5 rounded-lg bg-white text-[13px] border border-[#c0c8c4]/40 focus:outline-none focus:ring-1 focus:ring-[#725b24]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded bg-[#00261e] text-white font-semibold text-[14px] hover:bg-[#113d32] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span className="material-symbols-outlined text-[18px]">
                  send
                </span>
                <span>{language === 'VN' ? 'Nhận Báo Giá B2B & Mẫu Khắc Logo' : 'Request Corporate Catalog & Mockup'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
