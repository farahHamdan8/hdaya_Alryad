import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { generateWhatsAppUrl } from '../utils/whatsapp';
import { 
  X, Send, MapPin, User, 
  Phone, MessageSquare, AlertCircle, ShieldCheck
} from 'lucide-react';

export const WhatsAppOrderModal = () => {
  const { lang, t, isRTL } = useLanguage();
  const { 
    isCheckoutModalOpen, 
    setIsCheckoutModalOpen, 
    activeCheckoutItem, 
    items, 
    getCartTotal,
    clearCart
  } = useCart();

  // Form Fields State
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('مسائية أولى (٣:٠٠ م - ٧:٠٠ م)');
  const [cardMessage, setCardMessage] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [formError, setFormError] = useState('');

  if (!isCheckoutModalOpen) return null;

  // Determine what is being ordered
  const isDirectItem = !!activeCheckoutItem;
  
  // Format items summary for payload
  let itemTitle = '';
  let addonsText = 'لا توجد إضافات / None';
  let totalPrice = 0;
  let finalCardMessage = cardMessage;

  if (isDirectItem) {
    itemTitle = lang === 'ar' ? activeCheckoutItem.nameAr : activeCheckoutItem.nameEn;
    totalPrice = activeCheckoutItem.price;

    if (activeCheckoutItem.isCustomBox && activeCheckoutItem.details) {
      addonsText = lang === 'ar' ? activeCheckoutItem.details.addonsTextAr : activeCheckoutItem.details.addonsTextEn;
      if (!cardMessage && activeCheckoutItem.details.cardMessage) {
        finalCardMessage = activeCheckoutItem.details.cardMessage;
      }
    }
  } else {
    // Whole shopping cart checkout
    itemTitle = items.map(item => `${lang === 'ar' ? item.nameAr : item.nameEn} (x${item.quantity || 1})`).join(' + ');
    totalPrice = getCartTotal();
    addonsText = 'عناصر متعددة من الحقيبة';
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // Basic Validation
    if (!senderName.trim()) {
      setFormError(lang === 'ar' ? 'يرجى كتابة اسم المرسل' : 'Please enter sender name');
      return;
    }
    if (!recipientName.trim()) {
      setFormError(lang === 'ar' ? 'يرجى كتابة اسم المستلم' : 'Please enter recipient name');
      return;
    }
    if (!recipientPhone.trim()) {
      setFormError(lang === 'ar' ? 'يرجى إدخال رقم جوال المستلم' : 'Please enter recipient phone number');
      return;
    }
    if (!district.trim()) {
      setFormError(lang === 'ar' ? 'يرجى إدخال الحي في مدينة الرياض' : 'Please specify district in Riyadh');
      return;
    }

    const deliveryTimeCombined = `${deliveryDate} | ${timeSlot}`;

    // Generate strict WhatsApp URL
    const url = generateWhatsAppUrl({
      phone: '966559556618',
      itemTitle: itemTitle || (lang === 'ar' ? 'طلب باقة زهور فاخرة' : 'Luxury Flower Bouquet'),
      addonsText,
      totalPrice,
      cardMessage: finalCardMessage || 'بدون رسالة كارت',
      senderName,
      recipientName,
      recipientPhone,
      district,
      address,
      deliveryTime: deliveryTimeCombined,
      notes: specialNotes
    });

    // Clear cart if whole cart was bought
    if (!isDirectItem) {
      clearCart();
    }

    // Open WhatsApp in new tab / mobile app
    window.open(url, '_blank');
    setIsCheckoutModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white dark:bg-[#121214] rounded-2xl max-w-2xl w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-r from-neutral-900 to-[#1A1A1E] text-white flex items-start justify-between border-b border-rose-950/30">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C2185B]/20 text-rose-300 text-xs font-semibold uppercase mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'اعتماد الطلب المباشر عبر الواتساب' : 'Direct WhatsApp Order Concierge'}</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              {t('modalTitle')}
            </h3>
            <p className="text-xs text-neutral-300 mt-1 max-w-lg">
              {t('modalSubtitle')}
            </p>
          </div>
          
          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Quick Pill Summary */}
        <div className="bg-rose-50/50 dark:bg-rose-950/20 px-6 py-3 border-b border-rose-100 dark:border-rose-900/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              {lang === 'ar' ? 'الطلب:' : 'Item:'}
            </span>
            <span className="text-neutral-600 dark:text-neutral-300 truncate max-w-[280px]">
              {itemTitle}
            </span>
          </div>
          <div className="font-bold text-[#C2185B] dark:text-rose-400 text-sm">
            {totalPrice} {t('sar')}
          </div>
        </div>

        {/* Error Alert if any */}
        {formError && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          
          {/* Section 1: Customer & Recipient Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C2185B] dark:text-rose-400 mb-3 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? '١. بيانات المرسل والمستلم' : '1. Sender & Recipient Details'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  {t('senderName')} *
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder={t('senderNamePlaceholder')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1A1A1E] text-neutral-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  {t('recipientName')} *
                </label>
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder={t('recipientNamePlaceholder')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1A1A1E] text-neutral-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  {t('recipientPhone')} *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder={t('recipientPhonePlaceholder')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1A1A1E] text-neutral-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                  />
                  <Phone className={`w-4 h-4 text-neutral-400 absolute top-3 ${isRTL ? 'left-3' : 'right-3'}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Riyadh Delivery Information */}
          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C2185B] dark:text-rose-400 mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? '٢. تفاصيل التوصيل داخل الرياض' : '2. Delivery Info in Riyadh'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  {t('cityDistrict')} *
                </label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder={t('cityDistrictPlaceholder')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1A1A1E] text-neutral-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  {t('detailedAddress')}
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t('detailedAddressPlaceholder')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1A1A1E] text-neutral-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  {t('deliveryDate')}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1A1A1E] text-neutral-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  {t('deliveryTimeSlot')}
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1A1A1E] text-neutral-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                >
                  <option value={t('timeSlotNow')}>{t('timeSlotNow')}</option>
                  <option value={t('timeSlot1')}>{t('timeSlot1')}</option>
                  <option value={t('timeSlot2')}>{t('timeSlot2')}</option>
                  <option value={t('timeSlot3')}>{t('timeSlot3')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Special Notes & Personalization */}
          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C2185B] dark:text-rose-400 mb-3 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? '٣. رسالة الكارت والملاحظات' : '3. Card Message & Instructions'}</span>
            </h4>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  {t('cardMessageLabel')}
                </label>
                <textarea
                  rows={2}
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                  placeholder={t('cardMessagePlaceholder')}
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1A1A1E] text-neutral-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  {t('specialNotes')}
                </label>
                <input
                  type="text"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder={t('specialNotesPlaceholder')}
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1A1A1E] text-neutral-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                />
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Action Button */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-[#C2185B] hover:opacity-95 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl transition-all"
            >
              <Send className="w-5 h-5" />
              <span>{t('confirmWhatsAppBtn')}</span>
            </button>
            <p className="text-[11px] text-center text-neutral-500 dark:text-neutral-400 mt-2">
              {lang === 'ar' 
                ? 'سيتم فتح تطبيق الواتساب مباشرة مع كافة بيانات الطلب المنسقة' 
                : 'WhatsApp will open with your full order summary formatted for the concierge'}
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
