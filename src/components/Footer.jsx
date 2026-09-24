import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Clock, Camera, Send } from 'lucide-react';

export const Footer = () => {
  const { lang, t } = useLanguage();

  return (
    <footer id="contact" className="bg-white dark:bg-[#070709] border-t border-neutral-200 dark:border-neutral-900 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-neutral-200 dark:border-neutral-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#C2185B]/10 text-[#C2185B] font-serif text-lg font-bold">
                <img src="./Flower.png" alt="" />
              </div>
              <span className="font-serif text-xl font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                {lang === 'ar' ? 'هدايا الرياض' : 'Hdaya Alryad'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {t('footerAbout')}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-neutral-300 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-[#C2185B] hover:border-[#C2185B] transition-colors"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/966559556618"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-neutral-300 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 hover:border-emerald-500 transition-colors"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-neutral-900 dark:text-white">
              {t('footerQuickLinks')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              <li><a href="#home" className="hover:text-[#C2185B]">{t('navHome')}</a></li>
              <li><a href="#catalog" className="hover:text-[#C2185B]">{t('navCatalog')}</a></li>
              <li><a href="#builder" className="hover:text-[#C2185B]">{t('navBuilder')}</a></li>
              <li><a href="#experience" className="hover:text-[#C2185B]">{t('navExperience')}</a></li>
            </ul>
          </div>

          {/* Working Hours */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-neutral-900 dark:text-white">
              {t('footerWorkingHours')}
            </h4>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              <Clock className="w-4 h-4 text-[#C2185B] shrink-0 mt-0.5" />
              <span>{t('footerHoursText')}</span>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium pt-1">
              ✓ {lang === 'ar' ? 'استقبال الطلبات على مدار ٢٤ ساعة عبر الواتساب' : '24/7 VIP WhatsApp Order Booking'}
            </p>
          </div>

          {/* Atelier Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-neutral-900 dark:text-white">
              {t('footerContact')}
            </h4>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              <MapPin className="w-4 h-4 text-[#C2185B] shrink-0 mt-0.5" />
              <span>{t('footerAddress')}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 pt-1">
              <Phone className="w-4 h-4 text-[#C2185B] shrink-0" />
              <span dir="ltr">+966 55 955 6618</span>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400 text-center">
          <p>{t('copyright')}</p>
          <p className="flex items-center gap-1">
            <span>{lang === 'ar' ? 'صُمم في الرياض بأرقى معايير الفخامة' : 'Crafted with passion in Riyadh, KSA'}</span>
            <span className="text-[#C2185B]">♥️</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
