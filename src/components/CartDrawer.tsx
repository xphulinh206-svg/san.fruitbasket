import React, { useState } from 'react';
import { Currency, Language, CartItem } from '../types';
import { formatPrice } from '../utils/format';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currency: Currency;
  cart: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  language,
  currency,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('2h-express');
  const [paymentMethod, setPaymentMethod] = useState<'vietqr' | 'card' | 'cod' | 'vat'>('vietqr');
  const [vatCompany, setVatCompany] = useState('');
  const [vatTaxId, setVatTaxId] = useState('');
  const [orderCode, setOrderCode] = useState('');

  if (!isOpen) return null;

  const totalVnd = cart.reduce((sum, item) => sum + item.priceVnd * item.quantity, 0);
  const totalUsd = cart.reduce((sum, item) => sum + item.priceUsd * item.quantity, 0);

  // Delivery fee (Free if >= 2,000,000 VND)
  const isFreeDelivery = totalVnd >= 2000000;
  const shippingVnd = totalVnd === 0 || isFreeDelivery ? 0 : 50000;
  const shippingUsd = totalUsd === 0 || isFreeDelivery ? 0 : 2;

  const grandTotalVnd = totalVnd + shippingVnd;
  const grandTotalUsd = totalUsd + shippingUsd;

  const handleProceedCheckout = () => {
    if (cart.length === 0) return;
    setStep('checkout');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `SF-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderCode(code);
    setStep('success');
  };

  const handleReset = () => {
    onClearCart();
    setStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full flex flex-col shadow-2xl overflow-hidden border-l border-[#c0c8c4]/30">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#ebefea] flex items-center justify-between bg-[#f6fbf5]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#725b24] text-[22px]">
              shopping_bag
            </span>
            <h3 className="font-headline text-[19px] font-semibold text-[#00261e]">
              {step === 'cart' && (language === 'VN' ? 'Giỏ Quà Trái Cây Của Bạn' : 'Your Bespoke Basket')}
              {step === 'checkout' && (language === 'VN' ? 'Thông Tin Giao Hàng & Thanh Toán' : 'Delivery & Checkout')}
              {step === 'success' && (language === 'VN' ? 'Đặt Giỏ Quà Thành Công' : 'Order Confirmed')}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#ebefea] text-[#717975] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {step === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#f0f5f0] flex items-center justify-center text-[#717975]">
                    <span className="material-symbols-outlined text-[32px]">
                      shopping_basket
                    </span>
                  </div>
                  <h4 className="font-headline text-[18px] font-semibold text-[#00261e]">
                    {language === 'VN' ? 'Giỏ quà đang trống' : 'Your basket is empty'}
                  </h4>
                  <p className="text-[13px] text-[#717975] max-w-xs">
                    {language === 'VN'
                      ? 'Hãy khám phá bộ sưu tập giỏ quà hoặc tự tay thiết kế món quà độc bản.'
                      : 'Explore our signature hamper portfolios or create your custom arrangement.'}
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-2 px-6 py-2.5 rounded bg-[#00261e] text-white text-[13px] font-semibold hover:bg-[#113d32] transition-colors"
                  >
                    {language === 'VN' ? 'Khám Phá Giỏ Quà' : 'Browse Hampers'}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl border border-[#c0c8c4]/30 bg-[#f6fbf5] flex gap-3.5 items-start"
                    >
                      <img
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover bg-white shrink-0 border border-[#c0c8c4]/20"
                        src={item.image}
                      />
                      <div className="flex-1 flex flex-col justify-between min-h-[80px]">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-[14px] text-[#00261e] leading-snug">
                              {item.name}
                            </h4>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.id)}
                              className="text-[#717975] hover:text-[#ba1a1a] transition-colors"
                              title="Remove item"
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                delete
                              </span>
                            </button>
                          </div>
                          <span className="text-[11px] text-[#717975] block mt-0.5">
                            SKU: {item.sku}
                          </span>

                          {/* Custom specifics if custom hamper */}
                          {item.customDetails && (
                            <div className="mt-1 text-[11px] text-[#414845] bg-white p-2 rounded border border-[#ebefea]">
                              <p>
                                <strong>Vessel:</strong> {item.customDetails.vessel}
                              </p>
                              <p>
                                <strong>Ribbon:</strong> {item.customDetails.ribbon}
                              </p>
                              {item.customDetails.addon && (
                                <p>
                                  <strong>Add-on:</strong> {item.customDetails.addon}
                                </p>
                              )}
                              {item.customDetails.calligraphyMessage && (
                                <p className="italic text-[#725b24] mt-0.5 line-clamp-1">
                                  "{item.customDetails.calligraphyMessage}"
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#ebefea]">
                          <span className="font-bold text-[14px] text-[#00261e]">
                            {formatPrice(item.priceVnd * item.quantity, item.priceUsd * item.quantity, currency)}
                          </span>

                          <div className="flex items-center border border-[#c0c8c4]/40 rounded-lg bg-white overflow-hidden">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-0.5 text-[#00261e] hover:bg-[#ebefea] text-[13px] font-bold"
                            >
                              -
                            </button>
                            <span className="px-2 text-[12px] font-semibold text-[#00261e]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-[#00261e] hover:bg-[#ebefea] text-[13px] font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="flex flex-col gap-4">
              <div className="p-3 bg-[#ffdf9b]/30 rounded-xl border border-[#ffdf9b] text-[12px] text-[#251a00] flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#725b24]">
                  verified
                </span>
                <span>
                  {language === 'VN'
                    ? 'Atelier cam kết gửi ảnh thực tế giỏ quà trước khi bàn giao xe lạnh.'
                    : 'We send live photo proofs before climate-controlled dispatch.'}
                </span>
              </div>

              <div>
                <label className="text-[12px] font-bold text-[#00261e] block mb-1">
                  {language === 'VN' ? 'Tên Người Nhận Quà' : "Recipient's Full Name"} *
                </label>
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Madame Linh Tran"
                  className="w-full p-2.5 rounded-lg bg-[#f0f5f0] text-[13px] border border-[#c0c8c4]/40 focus:outline-none focus:ring-1 focus:ring-[#725b24]"
                />
              </div>

              <div>
                <label className="text-[12px] font-bold text-[#00261e] block mb-1">
                  {language === 'VN' ? 'Số Điện Thoại / Zalo / WhatsApp Người Nhận' : 'Recipient Phone / WhatsApp'} *
                </label>
                <input
                  type="tel"
                  required
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  placeholder="e.g. 0903 xxx xxx"
                  className="w-full p-2.5 rounded-lg bg-[#f0f5f0] text-[13px] border border-[#c0c8c4]/40 focus:outline-none focus:ring-1 focus:ring-[#725b24]"
                />
              </div>

              <div>
                <label className="text-[12px] font-bold text-[#00261e] block mb-1">
                  {language === 'VN' ? 'Địa Chỉ Giao Tại Sài Gòn' : 'Delivery Address in HCMC'} *
                </label>
                <textarea
                  rows={2}
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="e.g. Villa 12, Compound Thao Dien, District 2, HCMC"
                  className="w-full p-2.5 rounded-lg bg-[#f0f5f0] text-[13px] border border-[#c0c8c4]/40 focus:outline-none focus:ring-1 focus:ring-[#725b24]"
                ></textarea>
              </div>

              <div>
                <label className="text-[12px] font-bold text-[#00261e] block mb-1">
                  {language === 'VN' ? 'Khung Giờ Giao Hàng Yêu Cầu' : 'Preferred Delivery Window'}
                </label>
                <select
                  value={deliveryTimeSlot}
                  onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-[#f0f5f0] text-[13px] border border-[#c0c8c4]/40 focus:outline-none focus:ring-1 focus:ring-[#725b24]"
                >
                  <option value="2h-express">⚡ Express 2H (Immediate dispatch)</option>
                  <option value="morning">Morning (09:00 - 11:30)</option>
                  <option value="afternoon">Afternoon (14:00 - 16:30)</option>
                  <option value="evening">Evening (18:00 - 20:30)</option>
                </select>
              </div>

              {/* Payment Method */}
              <div className="flex flex-col gap-2 pt-2 border-t border-[#ebefea]">
                <label className="text-[12px] font-bold text-[#00261e]">
                  {language === 'VN' ? 'Hình Thức Thanh Toán' : 'Payment Method'}
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <label
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-[12px] cursor-pointer font-medium ${
                      paymentMethod === 'vietqr'
                        ? 'border-[#00261e] bg-[#e5e9e4] text-[#00261e] font-bold'
                        : 'border-[#c0c8c4]/40 bg-[#f0f5f0] text-[#414845]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'vietqr'}
                      onChange={() => setPaymentMethod('vietqr')}
                      className="accent-[#00261e]"
                    />
                    <span>VietQR (24/7)</span>
                  </label>

                  <label
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-[12px] cursor-pointer font-medium ${
                      paymentMethod === 'card'
                        ? 'border-[#00261e] bg-[#e5e9e4] text-[#00261e] font-bold'
                        : 'border-[#c0c8c4]/40 bg-[#f0f5f0] text-[#414845]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-[#00261e]"
                    />
                    <span>Visa / Mastercard</span>
                  </label>

                  <label
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-[12px] cursor-pointer font-medium ${
                      paymentMethod === 'cod'
                        ? 'border-[#00261e] bg-[#e5e9e4] text-[#00261e] font-bold'
                        : 'border-[#c0c8c4]/40 bg-[#f0f5f0] text-[#414845]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#00261e]"
                    />
                    <span>COD Handover</span>
                  </label>

                  <label
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-[12px] cursor-pointer font-medium ${
                      paymentMethod === 'vat'
                        ? 'border-[#00261e] bg-[#e5e9e4] text-[#00261e] font-bold'
                        : 'border-[#c0c8c4]/40 bg-[#f0f5f0] text-[#414845]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'vat'}
                      onChange={() => setPaymentMethod('vat')}
                      className="accent-[#00261e]"
                    />
                    <span>VAT Invoicing</span>
                  </label>
                </div>

                {/* If VAT selected */}
                {paymentMethod === 'vat' && (
                  <div className="p-3 rounded-lg bg-[#ebefea] flex flex-col gap-2 mt-1">
                    <input
                      type="text"
                      placeholder="Company Name (Tên Công Ty)"
                      value={vatCompany}
                      onChange={(e) => setVatCompany(e.target.value)}
                      className="p-2 bg-white rounded text-[12px] border border-[#c0c8c4]/40"
                    />
                    <input
                      type="text"
                      placeholder="Tax ID (Mã Số Thuế)"
                      value={vatTaxId}
                      onChange={(e) => setVatTaxId(e.target.value)}
                      className="p-2 bg-white rounded text-[12px] border border-[#c0c8c4]/40"
                    />
                  </div>
                )}
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center text-center p-4 gap-4">
              <div className="w-16 h-16 rounded-full bg-[#bfecdc] text-[#002019] flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px]">
                  check_circle
                </span>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#725b24] font-bold">
                  {language === 'VN' ? 'Đã Tiếp Nhận Yêu Cầu' : 'Order Received'}
                </span>
                <h4 className="font-headline text-[22px] font-semibold text-[#00261e] mt-1">
                  {orderCode}
                </h4>
                <p className="text-[13px] text-[#414845] mt-1">
                  {language === 'VN'
                    ? `Cảm ơn quý khách! Chuyên viên atelier sẽ gửi hình ảnh thực tế giỏ quà qua Zalo/WhatsApp tới số ${recipientPhone || 'của bạn'} trước khi giao.`
                    : `Thank you! Our sommelier will share pre-dispatch photos via WhatsApp to ${recipientPhone || 'your contact'} before climate-controlled delivery.`}
                </p>
              </div>

              {/* VietQR simulated display if payment method was vietqr */}
              {paymentMethod === 'vietqr' && (
                <div className="w-full p-4 rounded-2xl bg-[#f0f5f0] border border-[#c0c8c4]/30 flex flex-col items-center gap-2">
                  <span className="text-[11px] font-bold uppercase text-[#725b24]">
                    VietQR Payment Confirmation
                  </span>
                  <div className="w-36 h-36 bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center">
                    <img
                      alt="VietQR code"
                      className="w-28 h-28 object-contain"
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SANFRUIT-ORDER"
                    />
                    <span className="text-[9px] text-[#717975] font-semibold">VietQR Standard</span>
                  </div>
                  <div className="text-[11px] text-[#414845] text-left w-full mt-1 bg-white p-2.5 rounded-lg border border-[#ebefea]">
                    <p><strong>Bank:</strong> Techcombank (TCB)</p>
                    <p><strong>Account:</strong> 0868 348 519</p>
                    <p><strong>Holder:</strong> SANFRUIT SAIGON ATELIER</p>
                    <p><strong>Memo:</strong> {orderCode}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2 w-full pt-2">
                <a
                  href={`https://wa.me/84868348519?text=${encodeURIComponent(
                    `Hello SANFRUIT Concierge, I just placed order ${orderCode} for ${formatPrice(grandTotalVnd, grandTotalUsd, currency)}. Please confirm my order details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-lg bg-[#725b24] text-white text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-[#59440e] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chat
                  </span>
                  <span>
                    {language === 'VN' ? 'Xác Nhận Qua WhatsApp / Zalo' : 'Confirm on WhatsApp Concierge'}
                  </span>
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-2.5 rounded-lg bg-[#f0f5f0] text-[#00261e] text-[13px] font-semibold hover:bg-[#ebefea] transition-colors"
                >
                  {language === 'VN' ? 'Tiếp Tục Xem Thêm' : 'Continue Shopping'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Price Summary */}
        {cart.length > 0 && step !== 'success' && (
          <div className="p-5 border-t border-[#ebefea] bg-[#f6fbf5] flex flex-col gap-3">
            <div className="flex flex-col gap-1.5 text-[13px]">
              <div className="flex justify-between text-[#414845]">
                <span>{language === 'VN' ? 'Tạm tính' : 'Subtotal'}</span>
                <span className="font-semibold text-[#00261e]">
                  {formatPrice(totalVnd, totalUsd, currency)}
                </span>
              </div>
              <div className="flex justify-between text-[#414845]">
                <span>{language === 'VN' ? 'Phí giao hàng (Xe lạnh)' : 'Climate-Controlled Dispatch'}</span>
                <span className="font-semibold text-[#00261e]">
                  {isFreeDelivery
                    ? (language === 'VN' ? 'Miễn Phí' : 'Complimentary')
                    : formatPrice(shippingVnd, shippingUsd, currency)}
                </span>
              </div>
              <div className="flex justify-between text-[16px] font-bold text-[#00261e] pt-2 border-t border-[#ebefea]">
                <span>{language === 'VN' ? 'Tổng thanh toán' : 'Grand Total'}</span>
                <span>{formatPrice(grandTotalVnd, grandTotalUsd, currency)}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                type="button"
                onClick={handleProceedCheckout}
                className="w-full py-3.5 rounded bg-[#00261e] text-white font-semibold text-[14px] hover:bg-[#113d32] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{language === 'VN' ? 'Tiến Hành Đặt Hàng' : 'Proceed to Checkout'}</span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="px-4 py-3 rounded bg-[#ebefea] text-[#00261e] font-semibold text-[13px] hover:bg-[#dfe4df] transition-colors"
                >
                  {language === 'VN' ? 'Quay Lại' : 'Back'}
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 py-3 rounded bg-[#725b24] text-white font-semibold text-[14px] hover:bg-[#59440e] transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{language === 'VN' ? 'Xác Nhận Đặt Giỏ Quà' : 'Confirm Order & Dispatch'}</span>
                  <span className="material-symbols-outlined text-[18px]">
                    check
                  </span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
