import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, ArrowRight, ArrowLeft, ShieldCheck, Clock, Award } from 'lucide-react';

export const HeroSection = () => {
  const { t, isRTL, lang } = useLanguage();

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Ambience & Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#C2185B]/15 dark:bg-[#C2185B]/20 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-500/10 dark:bg-amber-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Editorial Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-start space-y-6">
            
            {/* Prestige Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C2185B]/30 bg-[#C2185B]/10 text-[#C2185B] dark:text-rose-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>{t('heroTag')}</span>
            </div>

            {/* Editorial Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.15]">
              {lang === 'ar' ? (
                <>
                  فخامة المشاعر في <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C2185B] to-rose-400">كل تفصيلة</span> زهرية
                </>
              ) : (
                <>
                  Luxury Crafted in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C2185B] to-rose-400">Every Petal</span>
                </>
              )}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed">
              {t('heroDesc')}
            </p>

            {/* Dual High-End CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <a
                href="#builder"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C2185B] to-[#D81B60] hover:from-[#AD1457] hover:to-[#C2185B] text-white text-sm sm:text-base font-semibold tracking-wide shadow-luxury hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <span>{t('heroCtaBuilder')}</span>
                <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </a>

              <a
                href="#catalog"
                className="px-7 py-4 rounded-full border border-neutral-300 dark:border-neutral-800 hover:border-[#C2185B] dark:hover:border-rose-500 bg-white/60 dark:bg-[#121214]/60 text-neutral-900 dark:text-white text-sm sm:text-base font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-900"
              >
                <span>{t('heroCtaCatalog')}</span>
              </a>
            </div>

            {/* Key Value Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-neutral-200 dark:border-neutral-800/80 w-full">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C2185B] shrink-0" />
                <span className="text-xs text-neutral-600 dark:text-neutral-400">{t('badgeDelivery')}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-xs text-neutral-600 dark:text-neutral-400">{t('badgeQuality')}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C2185B] shrink-0" />
                <span className="text-xs text-neutral-600 dark:text-neutral-400">{t('badgeLuxury')}</span>
              </div>
            </div>

          </div>

          {/* Right Editorial Showcase Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-rose-950/10 dark:border-rose-500/20 shadow-2xl bg-neutral-900">
                <img
                  src="./flower11.jpg"
                  alt="Haute Florals Riyadh"
                  className="w-full h-[460px] object-cover object-center scale-100 hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Floating Micro-Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 dark:bg-[#121214]/90 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C2185B]/15 flex items-center justify-center text-[#C2185B]">
                      <img src="./Flower.png" alt="" className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                        {lang === 'ar' ? 'فازة الرخام الإيطالي الفاخرة' : 'Carrara Marble Arrangement'}
                      </p>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        {lang === 'ar' ? 'تصميم حصري للرياض' : 'Exclusive Riyadh Edition'}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#C2185B] dark:text-rose-400">
                    890 {t('sar')}
                  </span>
                </div>
              </div>

              {/* Decorative Secondary Flotilla */}
              <div className="hidden sm:block absolute -top-6 -right-6 w-32 h-32 rounded-xl overflow-hidden border-2 border-white dark:border-[#1A1A1E] shadow-xl">
                <img
                  src="./flower5.jpg"
                  alt="Crimson Roses"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
