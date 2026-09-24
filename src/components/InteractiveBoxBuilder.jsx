import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { builderOptions } from '../data/mockData';
import { 
  Sparkles, Check, ChevronRight, ChevronLeft, 
  RotateCcw, ShoppingBag, Send, PenTool
} from 'lucide-react';

export const InteractiveBoxBuilder = () => {
  const { t, isRTL, lang } = useLanguage();
  const { openCheckoutWithItem, addToCart } = useCart();

  // Step 1: Base Arrangement Selection
  const [selectedBase, setSelectedBase] = useState(builderOptions.bases[0]);
  
  // Step 2: Flower Style & Color
  const [selectedFlower, setSelectedFlower] = useState(builderOptions.flowerStyles[0]);

  // Step 3: Luxury Add-ons (Multiple selection)
  const [selectedAddons, setSelectedAddons] = useState([builderOptions.addons[1]]); // default Belgian chocolate

  // Step 4: Live Card Personalization
  const [cardMessage, setCardMessage] = useState(
    lang === 'ar'
      ? 'أجمل التهاني من القلب، دامت أيامكم عامرة بالأفراح والمسرات ✨'
      : 'Heartfelt congratulations. Wishing you moments filled with joy, grace, and splendor ✨'
  );
  const [cardAuthor, setCardAuthor] = useState('');
  const [fontStyle, setFontStyle] = useState('diwani'); // 'diwani' or 'ruqah'

  const [activeStep, setActiveStep] = useState(1);

  // Toggle Addon
  const toggleAddon = (addon) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  // Calculate Total
  const calculateTotal = () => {
    const basePrice = selectedBase?.price || 0;
    const flowerPrice = selectedFlower?.price || 0;
    const addonsPrice = selectedAddons.reduce((sum, item) => sum + item.price, 0);
    return basePrice + flowerPrice + addonsPrice;
  };

  const totalPrice = calculateTotal();

  // Reset Builder
  const handleReset = () => {
    setSelectedBase(builderOptions.bases[0]);
    setSelectedFlower(builderOptions.flowerStyles[0]);
    setSelectedAddons([]);
    setCardMessage('');
    setCardAuthor('');
    setActiveStep(1);
  };

  // Package Built Item for Cart / Checkout
  const getCustomBoxObject = () => {
    const addonsListAr = selectedAddons.map(a => a.nameAr).join(' + ') || 'لا توجد إضافات';
    const addonsListEn = selectedAddons.map(a => a.nameEn).join(' + ') || 'None';

    return {
      id: `custom-box-${Date.now()}`,
      isCustomBox: true,
      nameAr: `بوكس مخصص: ${selectedBase.nameAr} مع ${selectedFlower.nameAr}`,
      nameEn: `Bespoke Creation: ${selectedBase.nameEn} with ${selectedFlower.nameEn}`,
      price: totalPrice,
      image: selectedBase.image,
      details: {
        base: selectedBase,
        flower: selectedFlower,
        addons: selectedAddons,
        cardMessage: cardMessage + (cardAuthor ? ` (${cardAuthor})` : ''),
        cardAuthor,
        fontStyle,
        addonsTextAr: addonsListAr,
        addonsTextEn: addonsListEn
      }
    };
  };

  const handleConfirmWhatsApp = () => {
    const boxItem = getCustomBoxObject();
    openCheckoutWithItem(boxItem);
  };

  const handleAddToCart = () => {
    const boxItem = getCustomBoxObject();
    addToCart(boxItem);
  };

  const NextIcon = isRTL ? ChevronLeft : ChevronRight;
  const BackIcon = isRTL ? ChevronRight : ChevronLeft;

  return (
    <section id="builder" className="py-20 bg-neutral-50/70 dark:bg-[#0E0E12] relative overflow-hidden transition-colors duration-300">
      
      {/* Decorative Blur Circles */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#C2185B]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C2185B]/30 bg-[#C2185B]/10 text-[#C2185B] dark:text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FEATURE 1 • {lang === 'ar' ? 'المنسق التفاعلي للهدايا' : 'Bespoke Box Builder'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white">
            {t('builderTitle')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            {t('builderSubtitle')}
          </p>

          {/* Stepper Indicator */}
          <div className="mt-8 flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-2">
            {[
              { step: 1, title: t('step1Title') },
              { step: 2, title: t('step2Title') },
              { step: 3, title: t('step3Title') },
              { step: 4, title: t('step4Title') },
            ].map((s) => (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeStep === s.step
                    ? 'bg-[#C2185B] text-white shadow-luxury'
                    : activeStep > s.step
                    ? 'bg-[#C2185B]/15 text-[#C2185B] dark:text-rose-300'
                    : 'bg-white dark:bg-[#1A1A1E] text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800'
                }`}
              >
                <span>{s.step}</span>
                <span className="hidden md:inline">{s.title.split('.')[1] || s.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Builder Grid Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Active Step Interactive Selection (8 Cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-[#16161A] p-6 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm">
            
            {/* STEP 1: BASE SELECTION */}
            {activeStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                  <h3 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white">
                    {t('step1Title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    {t('step1Desc')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {builderOptions.bases.map((base) => {
                    const isSelected = selectedBase?.id === base.id;
                    return (
                      <div
                        key={base.id}
                        onClick={() => setSelectedBase(base)}
                        className={`cursor-pointer rounded-xl p-4 border transition-all duration-300 flex flex-col justify-between group ${
                          isSelected
                            ? 'border-[#C2185B] bg-[#C2185B]/5 dark:bg-[#C2185B]/10 ring-2 ring-[#C2185B]/30'
                            : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-[#1A1A1E]'
                        }`}
                      >
                        <div className="relative rounded-lg overflow-hidden h-40 mb-3 bg-neutral-200 dark:bg-neutral-800">
                          <img
                            src={base.image}
                            alt={lang === 'ar' ? base.nameAr : base.nameEn}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#C2185B] text-white flex items-center justify-center shadow">
                              <Check className="w-4 h-4" />
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                              {lang === 'ar' ? base.nameAr : base.nameEn}
                            </h4>
                            <span className="text-xs font-bold text-[#C2185B] dark:text-rose-400 shrink-0">
                              +{base.price} {t('sar')}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                            {lang === 'ar' ? base.descAr : base.descEn}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: FLOWER STYLE & PALETTE */}
            {activeStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                  <h3 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white">
                    {t('step2Title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    {t('step2Desc')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {builderOptions.flowerStyles.map((flower) => {
                    const isSelected = selectedFlower?.id === flower.id;
                    return (
                      <div
                        key={flower.id}
                        onClick={() => setSelectedFlower(flower)}
                        className={`cursor-pointer rounded-xl p-4 border transition-all duration-300 flex flex-col justify-between group ${
                          isSelected
                            ? 'border-[#C2185B] bg-[#C2185B]/5 dark:bg-[#C2185B]/10 ring-2 ring-[#C2185B]/30'
                            : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-[#1A1A1E]'
                        }`}
                      >
                        <div className="relative rounded-lg overflow-hidden h-40 mb-3 bg-neutral-200 dark:bg-neutral-800">
                          <img
                            src={flower.image}
                            alt={lang === 'ar' ? flower.nameAr : flower.nameEn}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div
                            className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow"
                            style={{ backgroundColor: flower.color }}
                          >
                            {lang === 'ar' ? 'درجة اللون الملكي' : 'Royal Hue'}
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#C2185B] text-white flex items-center justify-center shadow">
                              <Check className="w-4 h-4" />
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                              {lang === 'ar' ? flower.nameAr : flower.nameEn}
                            </h4>
                            <span className="text-xs font-bold text-[#C2185B] dark:text-rose-400 shrink-0">
                              +{flower.price} {t('sar')}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                            {lang === 'ar' ? flower.descAr : flower.descEn}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: LUXURY ADD-ONS */}
            {activeStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                  <h3 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white">
                    {t('step3Title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    {t('step3Desc')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {builderOptions.addons.map((addon) => {
                    const isSelected = selectedAddons.some(a => a.id === addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        className={`cursor-pointer rounded-xl p-3 border transition-all duration-300 flex flex-col justify-between group ${
                          isSelected
                            ? 'border-[#C2185B] bg-[#C2185B]/5 dark:bg-[#C2185B]/10 ring-2 ring-[#C2185B]/30'
                            : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-[#1A1A1E]'
                        }`}
                      >
                        <div className="relative rounded-lg overflow-hidden h-32 mb-2 bg-neutral-200 dark:bg-neutral-800">
                          <img
                            src={addon.image}
                            alt={lang === 'ar' ? addon.nameAr : addon.nameEn}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className={`absolute top-2 right-2 w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                            isSelected ? 'bg-[#C2185B] border-[#C2185B] text-white' : 'bg-black/40 border-white/50 text-transparent'
                          }`}>
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-xs text-neutral-900 dark:text-white line-clamp-2">
                            {lang === 'ar' ? addon.nameAr : addon.nameEn}
                          </h4>
                          <span className="text-xs font-bold text-[#C2185B] dark:text-rose-400 mt-1 block">
                            +{addon.price} {t('sar')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: LIVE CARD CALLIGRAPHY PREVIEW */}
            {activeStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                  <h3 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white">
                    {t('step4Title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    {t('step4Desc')}
                  </p>
                </div>

                {/* Live Luxury Calligraphy Card Visual */}
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF6EE] to-[#F5ECE0] dark:from-[#1D1B16] dark:via-[#181613] dark:to-[#12110E] border-2 border-amber-300/40 dark:border-amber-600/30 shadow-xl relative overflow-hidden">
                  
                  {/* Subtle Gilded Border Accents */}
                  <div className="absolute top-2 left-2 right-2 bottom-2 border border-amber-400/20 rounded-xl pointer-events-none"></div>
                  
                  <div className="relative z-10 text-center space-y-4">
                    <div className="w-8 h-8 mx-auto rounded-full border border-amber-500/40 flex items-center justify-center text-amber-600 dark:text-amber-400 text-xs font-serif">
                      ⚜️
                    </div>
                    
                    <span className="text-[11px] uppercase tracking-widest text-amber-800/70 dark:text-amber-300/70 font-semibold">
                      {lang === 'ar' ? 'ميزون دي روز • بطاقة إهداء ملكية مذهبة' : 'Maison De Roses • Gilded Royal Card'}
                    </span>

                    {/* Inscribed Message with Calligraphic Typeface */}
                    <div className={`py-4 min-h-[100px] flex items-center justify-center px-4 ${
                      fontStyle === 'diwani' ? 'font-calligraphy-ar' : 'font-arabicSans'
                    }`}>
                      <p className="text-xl sm:text-2xl text-neutral-900 dark:text-amber-100 font-medium leading-relaxed max-w-lg italic">
                        "{cardMessage || t('cardPlaceholder')}"
                      </p>
                    </div>

                    {cardAuthor && (
                      <p className="text-sm font-semibold text-amber-900/80 dark:text-amber-300 pt-2 border-t border-amber-300/30 inline-block px-6">
                        — {cardAuthor}
                      </p>
                    )}
                  </div>
                </div>

                {/* Input Fields & Quick Templates */}
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 flex items-center gap-2">
                      <PenTool className="w-3.5 h-3.5 text-[#C2185B]" />
                      <span>{t('cardMessageLabel')}</span>
                    </label>
                    <textarea
                      rows={3}
                      value={cardMessage}
                      onChange={(e) => setCardMessage(e.target.value)}
                      placeholder={t('cardPlaceholder')}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#1A1A1E] text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                    />
                  </div>

                  {/* Quick Preset Phrases */}
                  <div>
                    <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 block mb-2">
                      {lang === 'ar' ? 'عبارات مقترحة راقية:' : 'Suggested Luxury Phrases:'}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {builderOptions.cardTemplates.map((tmpl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCardMessage(lang === 'ar' ? tmpl.ar : tmpl.en)}
                          className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/50 text-[11px] text-neutral-700 dark:text-neutral-300 hover:border-[#C2185B] transition-colors text-start"
                        >
                          {lang === 'ar' ? tmpl.ar.slice(0, 32) + '...' : tmpl.en.slice(0, 32) + '...'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                      {t('cardAuthor')}
                    </label>
                    <input
                      type="text"
                      value={cardAuthor}
                      onChange={(e) => setCardAuthor(e.target.value)}
                      placeholder={t('cardAuthorPlaceholder')}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#1A1A1E] text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-neutral-200 dark:border-neutral-800">
              {activeStep > 1 ? (
                <button
                  onClick={() => setActiveStep(activeStep - 1)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <BackIcon className="w-4 h-4" />
                  <span>{t('stepBack')}</span>
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="px-3 py-2 rounded-xl text-neutral-400 hover:text-neutral-600 text-xs font-medium flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('resetBuilder')}</span>
                </button>
              )}

              {activeStep < 4 ? (
                <button
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="px-6 py-2.5 rounded-xl bg-[#C2185B] hover:bg-[#D81B60] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-luxury transition-all"
                >
                  <span>{t('stepNext')}</span>
                  <NextIcon className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="px-4 py-2.5 rounded-xl border border-[#C2185B] text-[#C2185B] dark:text-rose-400 hover:bg-[#C2185B]/10 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t('addToCart')}</span>
                  </button>
                  <button
                    onClick={handleConfirmWhatsApp}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C2185B] to-[#D81B60] hover:from-[#AD1457] hover:to-[#C2185B] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-luxury transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t('checkoutWhatsApp')}</span>
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Live Composition Summary & Cost Meter (4 Cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-[#16161A] p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm sticky top-24">
            
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <span className="font-serif text-lg font-bold text-neutral-900 dark:text-white">
                {lang === 'ar' ? 'ملخص تحفتك الفاخرة' : 'Bespoke Order Summary'}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#C2185B]/10 text-[#C2185B] dark:text-rose-400 font-bold">
                VIP RIYADH
              </span>
            </div>

            {/* Visual Mini Composite */}
            <div className="my-4 relative h-48 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <img
                src={selectedFlower?.image || selectedBase?.image}
                alt="Composite"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="text-white text-xs font-bold">
                  {lang === 'ar' ? selectedBase?.nameAr : selectedBase?.nameEn}
                </span>
                <span className="text-rose-300 text-[11px]">
                  {lang === 'ar' ? selectedFlower?.nameAr : selectedFlower?.nameEn}
                </span>
              </div>
            </div>

            {/* Dynamic Items Breakdown */}
            <div className="space-y-3 text-xs text-neutral-600 dark:text-neutral-300 py-2">
              <div className="flex items-center justify-between">
                <span>{t('selectedBase')}:</span>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  {selectedBase?.price} {t('sar')}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>{t('selectedFlower')}:</span>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  {selectedFlower?.price} {t('sar')}
                </span>
              </div>

              {selectedAddons.length > 0 && (
                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
                  <span className="block text-[11px] text-neutral-400 mb-1">{t('selectedAddons')}:</span>
                  {selectedAddons.map(a => (
                    <div key={a.id} className="flex items-center justify-between py-0.5">
                      <span className="truncate max-w-[170px]">{lang === 'ar' ? a.nameAr : a.nameEn}</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">+{a.price} {t('sar')}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total Price Widget */}
            <div className="mt-4 pt-4 border-t-2 border-neutral-100 dark:border-neutral-800/80">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                  {t('totalPrice')}
                </span>
                <div className="text-end">
                  <span className="text-2xl font-black text-[#C2185B] dark:text-rose-400">
                    {totalPrice}
                  </span>
                  <span className="text-xs font-bold text-neutral-500 ml-1 mr-1">
                    {t('sar')}
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ {t('deliveryFeeFree')}
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-6 space-y-2">
              <button
                onClick={handleConfirmWhatsApp}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C2185B] to-[#D81B60] hover:from-[#AD1457] hover:to-[#C2185B] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-luxury transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{t('checkoutWhatsApp')}</span>
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:border-[#C2185B] text-neutral-700 dark:text-neutral-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{t('addToCart')}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
