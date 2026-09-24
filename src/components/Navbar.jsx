import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { 
  Sun, Moon, Globe, ShoppingBag, Menu, X, 
  PhoneCall
} from 'lucide-react';

export const Navbar = () => {
  const { lang, toggleLanguage, t, isRTL } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const { getItemCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t('navHome') },
    { href: '#catalog', label: t('navCatalog') },
    { href: '#builder', label: t('navBuilder'), badge: true },
    { href: '#experience', label: t('navExperience') },
    { href: '#contact', label: t('navContact') },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-white/90 dark:bg-[#0A0A0C]/90 backdrop-blur-md border-b border-rose-950/10 dark:border-rose-500/10 shadow-sm'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Emblems */}
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full  flex items-center justify-center bg-gradient-to-br from-[#C2185B]/15 to-transparent text-[#C2185B] dark:text-rose-400 group-hover:scale-105 transition-transform duration-300">
                {/* <span className="font-serif text-lg font-bold tracking-tighter"/>M</span> */}
             <img src="./Flower.png" alt="" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm sm:text-2xl font-bold tracking-wider text-neutral-900 dark:text-white uppercase">
                  {lang === 'ar' ? 'هدايا الرياض' : 'Hdaya alryad'}
                </span>
                
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-sm tracking-wide text-neutral-700 dark:text-neutral-300 hover:text-[#C2185B] dark:hover:text-rose-400 transition-colors font-medium flex items-center gap-1.5"
                >
                  {link.label}
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] rounded-full bg-[#C2185B] text-white font-sans uppercase font-bold animate-pulse-subtle">
                      VIP
                    </span>
                  )}
                </a>
              ))}
            </div>

            {/* Right Action Icons (Language, Theme, Cart, Mobile Toggle) */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-neutral-300 dark:border-neutral-800 hover:border-[#C2185B] dark:hover:border-rose-500 text-neutral-800 dark:text-neutral-200 transition-all duration-200 bg-neutral-100/50 dark:bg-neutral-900/50"
                aria-label="Toggle Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#C2185B]" />
                <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-[#C2185B] dark:hover:text-rose-400 hover:border-[#C2185B] dark:hover:border-rose-500 transition-all duration-200 bg-neutral-100/50 dark:bg-neutral-900/50"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
              </button>

              {/* Shopping Bag Button with Badge */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:text-[#C2185B] dark:hover:text-rose-400 transition-all duration-200 bg-neutral-100/50 dark:bg-neutral-900/50"
                aria-label="Open Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C2185B] text-white text-[10px] font-bold flex items-center justify-center shadow-md animate-scale">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-neutral-800 dark:text-neutral-200 hover:text-[#C2185B]"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className={`fixed top-0 bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-3/4 max-w-xs bg-white dark:bg-[#121214] p-6 shadow-2xl flex flex-col justify-between border-l border-neutral-200 dark:border-neutral-800`}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-serif text-lg font-bold text-neutral-900 dark:text-white">
                  {lang === 'ar' ? 'ميزون دي روز' : 'Maison De Roses'}
                </span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-neutral-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-medium text-neutral-800 dark:text-neutral-200 hover:text-[#C2185B] py-2 flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-2 py-0.5 text-[10px] rounded-full bg-[#C2185B] text-white">VIP</span>
                    )}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-3">
              <a
                href="https://wa.me/966559556618"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#C2185B] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{lang === 'ar' ? 'تواصل مع خدمة العملاء' : 'Contact VIP Concierge'}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
