import React, { useState } from 'react';
import { Language } from '../types';

interface FloatingConciergeProps {
  language: Language;
}

export const FloatingConcierge: React.FC<FloatingConciergeProps> = ({ language }) => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'concierge'; text: string; time: string }>>([
    {
      sender: 'concierge',
      text:
        language === 'VN'
          ? 'Kính chào Quý khách! Em là Minh Anh - Sommelier trưởng tại SANFRUIT Thảo Điền. Quý khách cần tư vấn giỏ quà tặng hay kiểm tra hoa quả tươi hôm nay ạ?'
          : 'Welcome to SANFRUIT Atelier Saigon! I am Minh Anh, head gifting sommelier. May I assist you with custom fruit pairings, express 2H dispatch, or photo proofs?',
      time: 'Just now',
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: now },
    ]);
    setInputMsg('');

    // Simulated sommelier reply
    setTimeout(() => {
      let reply = '';
      const lower = userText.toLowerCase();
      if (lower.includes('thảo điền') || lower.includes('thao dien') || lower.includes('quận 2') || lower.includes('d2')) {
        reply = language === 'VN'
          ? 'Dạ showroom bên em ở 168 Thảo Điền ạ! Với địa chỉ tại Quận 2, xe chuyên dụng có thể giao đến chỉ trong 30-45 phút, hoa và trái cây được bảo quản mát lạnh.'
          : 'Our flagship atelier is right at 168 Thao Dien! Deliveries within District 2 arrive in just 30-45 minutes in climate-controlled temperature.';
      } else if (lower.includes('vat') || lower.includes('hóa đơn') || lower.includes('invoice')) {
        reply = language === 'VN'
          ? 'Dạ bên em hỗ trợ xuất hóa đơn VAT điện tử đầy đủ trong ngày cho mọi đơn hàng doanh nghiệp ạ.'
          : 'Yes, we provide full official electronic VAT invoices within the day for corporate orders.';
      } else if (lower.includes('nho') || lower.includes('muscat') || lower.includes('grape')) {
        reply = language === 'VN'
          ? 'Dạ hôm nay atelier vừa về nho mẫu đơn Shine Muscat Okayama Nhật Bản chùm đều quả, độ ngọt brix 19+ cực kỳ thơm ngọt ạ.'
          : 'Today we have freshly flown Japanese Okayama Shine Muscat with rich 19+ Brix sweetness and pristine emerald clusters.';
      } else {
        reply = language === 'VN'
          ? 'Dạ em đã ghi nhận yêu cầu của quý khách. Quý khách có thể nhắn thêm qua Zalo/WhatsApp 0868 348 519 để em gửi hình ảnh chụp thực tế giỏ quà vừa cắm xong nhé!'
          : 'Thank you for your message! You can also connect directly with me on WhatsApp / Hotline 0868 348 519 to receive live photo proofs of your hamper.';
      }

      setChatMessages((prev) => [
        ...prev,
        { sender: 'concierge', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
    }, 900);
  };

  return (
    <>
      {/* Floating Speed Dial */}
      <aside className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {menuOpen && !chatOpen && (
          <div className="flex flex-col gap-1.5 bg-white/95 backdrop-blur-xl p-2 rounded-2xl shadow-[0_12px_32px_-4px_rgba(17,61,50,0.18)] border border-[#c0c8c4]/30 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <a
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#f0f5f0] text-[#181d1a] transition-colors"
              href="https://zalo.me/0868348519"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-[#725b24] text-[18px]">
                chat
              </span>
              <span className="text-[12px] font-semibold">Zalo Concierge</span>
            </a>

            <a
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#f0f5f0] text-[#181d1a] transition-colors"
              href="https://wa.me/84868348519"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-[#725b24] text-[18px]">
                support_agent
              </span>
              <span className="text-[12px] font-semibold">WhatsApp Expat</span>
            </a>

            <button
              type="button"
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#f0f5f0] text-[#181d1a] transition-colors text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#725b24] text-[18px]">
                forum
              </span>
              <span className="text-[12px] font-semibold">
                {language === 'VN' ? 'Tư Vấn Trực Tuyến' : 'Live Sommelier Chat'}
              </span>
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            if (chatOpen) {
              setChatOpen(false);
            } else {
              setMenuOpen(!menuOpen);
            }
          }}
          className="w-14 h-14 rounded-full bg-[#00261e] text-white shadow-[0_12px_32px_-4px_rgba(17,61,50,0.3)] flex items-center justify-center hover:bg-[#113d32] transition-all group ring-2 ring-[#ffdf9b]/40 cursor-pointer"
          title="Concierge & Gifting Sommelier"
        >
          <span className="material-symbols-outlined text-[26px] group-hover:scale-110 transition-transform">
            {chatOpen ? 'close' : 'headset_mic'}
          </span>
        </button>
      </aside>

      {/* Sommelier Chat Drawer / Window */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-[#c0c8c4]/30 overflow-hidden flex flex-col h-[480px] animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#00261e] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  alt="Sommelier avatar"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#ffdf9b]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkkEFe4S6xIfbPGY9f4zNpv4YF24GrvWtALdVi9kQJXv-kZmETqGU74Lux7oauzy7cNINUcU23tquxSkWNPqO3DQ14mXn4_yv1NARNJrHMOHGCLRHdBX8FbRGr_EfUls7Hcwt-yDEH1xr-Jsp_pf2HjeDYaPDL9fhdLGthibgIdsVQKwr76U61NDWhAmNtNnk_6k8eQI6GzWqSfmyVTG5GXjcPgPa2GDsnzK-UvZ_wuUJpRNgtS67ypt58U2XhzcmfRCA"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#bfecdc] ring-2 ring-[#00261e]"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-white">
                  Minh Anh • Gifting Sommelier
                </span>
                <span className="text-[11px] text-[#bfecdc]">
                  SANFRUIT Flagship Atelier • 168 Thao Dien
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setChatOpen(false)}
              className="text-white/70 hover:text-white"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto bg-[#f6fbf5] flex flex-col gap-3">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                }`}
              >
                <div
                  className={`p-3 rounded-2xl text-[13px] leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#00261e] text-white rounded-br-none'
                      : 'bg-white text-[#181d1a] border border-[#ebefea] rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-[#717975] mt-1 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-[#f0f5f0] border-t border-[#ebefea] flex gap-2 overflow-x-auto text-[11px]">
            <button
              type="button"
              onClick={() => setInputMsg(language === 'VN' ? 'Có thể giao nhanh đến Thảo Điền trong 1 giờ không?' : 'Can you deliver to Thao Dien in 1 hour?')}
              className="px-2.5 py-1 bg-white hover:bg-[#ebefea] rounded-full border border-[#c0c8c4]/30 text-[#00261e] shrink-0"
            >
              ⏱️ Express 2H
            </button>
            <button
              type="button"
              onClick={() => setInputMsg(language === 'VN' ? 'Công ty tôi muốn xuất hóa đơn VAT điện tử.' : 'Do you provide corporate VAT invoices?')}
              className="px-2.5 py-1 bg-white hover:bg-[#ebefea] rounded-full border border-[#c0c8c4]/30 text-[#00261e] shrink-0"
            >
              📑 VAT Invoice
            </button>
            <button
              type="button"
              onClick={() => setInputMsg(language === 'VN' ? 'Tôi muốn xem hình ảnh nho mẫu đơn hôm nay.' : 'Can I see photos of today\'s Shine Muscat?')}
              className="px-2.5 py-1 bg-white hover:bg-[#ebefea] rounded-full border border-[#c0c8c4]/30 text-[#00261e] shrink-0"
            >
              🍇 Shine Muscat
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#ebefea] flex items-center gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder={language === 'VN' ? 'Nhập tin nhắn tư vấn...' : 'Ask our gifting sommelier...'}
              className="flex-1 p-2.5 rounded-xl bg-[#f0f5f0] text-[13px] border border-[#c0c8c4]/40 focus:outline-none focus:ring-1 focus:ring-[#725b24]"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-[#725b24] text-white hover:bg-[#59440e] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
};
