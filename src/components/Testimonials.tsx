import React, { useState } from 'react';
import { Language, Review } from '../types';
import { translations } from '../data/translations';

interface TestimonialsProps {
  language: Language;
  reviews: Review[];
  onAddReview: (newReview: Review) => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  language,
  reviews,
  onAddReview,
}) => {
  const t = translations[language];
  const [modalOpen, setModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [authorLocation, setAuthorLocation] = useState('Thao Dien, District 2');
  const [reviewContent, setReviewContent] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewContent.trim()) return;

    const initials = authorName
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'VIP';

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: authorName,
      initials,
      role: authorRole || 'VIP Client',
      roleVn: authorRole || 'Khách Hàng VIP',
      location: authorLocation,
      content: reviewContent,
      contentVn: reviewContent,
      rating,
      date: 'Just now',
    };

    onAddReview(newRev);
    setModalOpen(false);
    setAuthorName('');
    setAuthorRole('');
    setReviewContent('');
  };

  return (
    <section className="w-full py-16 lg:py-24 bg-[#f6fbf5]">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#725b24]">
              {t.reviewsSub}
            </span>
            <h2 className="font-display text-[32px] sm:text-[38px] text-[#00261e] tracking-tight">
              {t.reviewsTitle}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-[#725b24]">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
              <span className="font-display text-[17px] font-bold text-[#00261e] ml-2">
                4.9 / 5.0
              </span>
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f0f5f0] hover:bg-[#ebefea] text-[#00261e] text-[12px] font-semibold border border-[#c0c8c4]/30 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
              <span>{t.leaveReviewBtn}</span>
            </button>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((rev, idx) => {
            const isFirst = idx === 0;
            const isSecond = idx === 1;

            return (
              <div
                key={rev.id}
                className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#ebefea] shadow-sm border border-[#c0c8c4]/30 gap-6"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex text-[#725b24]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="text-[14px] text-[#181d1a] italic leading-relaxed">
                    "{language === 'VN' ? rev.contentVn : rev.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-[#c0c8c4]/30">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] shrink-0 ${
                      isFirst
                        ? 'bg-[#725b24] text-white'
                        : isSecond
                        ? 'bg-[#00261e] text-white'
                        : 'bg-[#ffdf9b] text-[#251a00]'
                    }`}
                  >
                    {rev.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-[15px] text-[#00261e]">
                      {rev.author}
                    </span>
                    <span className="text-[12px] text-[#414845]">
                      {language === 'VN' ? rev.roleVn : rev.role} • {rev.location}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#c0c8c4]/30 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline text-[20px] font-semibold text-[#00261e]">
                {language === 'VN' ? 'Chia Sẻ Cảm Nhận Của Bạn' : 'Share Your Experience'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="flex flex-col gap-4">
              <div>
                <label className="text-[12px] font-bold text-[#00261e] block mb-1">
                  {language === 'VN' ? 'Đánh giá sao' : 'Rating'}
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className={`text-[24px] cursor-pointer ${
                        num <= rating ? 'text-[#725b24]' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[12px] font-bold text-[#00261e] block mb-1">
                  {language === 'VN' ? 'Họ và tên' : 'Your Name'}
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. David Harrison"
                  className="w-full p-2.5 rounded-lg bg-[#f0f5f0] text-[13px] border border-[#c0c8c4]/40 focus:outline-none focus:ring-1 focus:ring-[#725b24]"
                />
              </div>

              <div>
                <label className="text-[12px] font-bold text-[#00261e] block mb-1">
                  {language === 'VN' ? 'Chức danh / Vai trò' : 'Title / Role'}
                </label>
                <input
                  type="text"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  placeholder="e.g. Managing Partner / Resident"
                  className="w-full p-2.5 rounded-lg bg-[#f0f5f0] text-[13px] border border-[#c0c8c4]/40 focus:outline-none focus:ring-1 focus:ring-[#725b24]"
                />
              </div>

              <div>
                <label className="text-[12px] font-bold text-[#00261e] block mb-1">
                  {language === 'VN' ? 'Khu vực Sài Gòn' : 'District / Area'}
                </label>
                <input
                  type="text"
                  value={authorLocation}
                  onChange={(e) => setAuthorLocation(e.target.value)}
                  placeholder="e.g. Thao Dien (District 2)"
                  className="w-full p-2.5 rounded-lg bg-[#f0f5f0] text-[13px] border border-[#c0c8c4]/40 focus:outline-none focus:ring-1 focus:ring-[#725b24]"
                />
              </div>

              <div>
                <label className="text-[12px] font-bold text-[#00261e] block mb-1">
                  {language === 'VN' ? 'Cảm nhận của bạn về giỏ quà' : 'Your Review'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  placeholder="What did you appreciate most about our fruits and service?"
                  className="w-full p-2.5 rounded-lg bg-[#f0f5f0] text-[13px] border border-[#c0c8c4]/40 focus:outline-none focus:ring-1 focus:ring-[#725b24]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#00261e] text-white font-semibold text-[14px] hover:bg-[#113d32] transition-colors"
              >
                {language === 'VN' ? 'Gửi Cảm Nhận' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
