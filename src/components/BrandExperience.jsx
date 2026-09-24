import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Truck, Sparkles, Feather, Gift } from 'lucide-react';

export const BrandExperience = () => {
  const { lang, t } = useLanguage();

  const features = [
    {
      icon: Sparkles,
      title: t('feature1Head'),
      desc: t('feature1Desc')
    },
    {
      icon: Truck,
      title: t('feature2Head'),
      desc: t('feature2Desc')
    },
    {
      icon: Feather,
      title: t('feature3Head'),
      desc: t('feature3Desc')
    },
    {
      icon: Gift,
      title: t('feature4Head'),
      desc: t('feature4Desc')
    }
  ];

  return (
    <section id="experience" className="py-24 bg-neutral-100/60 dark:bg-[#0A0A0C] border-y border-neutral-200 dark:border-neutral-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#C2185B] dark:text-rose-400 font-bold block mb-2">
            THE HAUTE FLORISTRY ATELIER
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
            {t('featuresTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white dark:bg-[#16161A] border border-neutral-200/80 dark:border-neutral-800/80 hover:border-[#C2185B]/40 dark:hover:border-rose-500/40 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-start text-start"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C2185B]/10 flex items-center justify-center text-[#C2185B] dark:text-rose-400 mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Riyadh VIP Quote Banner */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-neutral-900 via-[#1A1A1E] to-neutral-900 text-white relative overflow-hidden border border-rose-950/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-[#C2185B] font-bold">
              {t('vipSupport')}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              {lang === 'ar' ? 'فخامة التسليم تليق بمناسباتكم الملكية' : 'White-Glove Delivery Befitting Royal Celebrations'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300">
              {t('riyadhCoverage')}
            </p>
          </div>

          <a
            href="https://wa.me/966559556618"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C2185B] to-[#D81B60] hover:opacity-90 text-white text-sm font-semibold tracking-wider shrink-0 shadow-luxury"
          >
            {lang === 'ar' ? 'تحدث مع منسق كبار الشخصيات' : 'Speak to VIP Concierge'}
          </a>
        </div>

      </div>
    </section>
  );
};
