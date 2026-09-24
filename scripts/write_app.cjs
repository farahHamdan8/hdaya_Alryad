const fs = require('fs');

const appContent = import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveBoxBuilder } from './components/InteractiveBoxBuilder';
import { ProductCatalog } from './components/ProductCatalog';
import { BrandExperience } from './components/BrandExperience';
import { Footer } from './components/Footer';
import { WhatsAppOrderModal } from './components/WhatsAppOrderModal';
import { CartDrawer } from './components/CartDrawer';
import { useLanguage } from './context/LanguageContext';
import { MessageCircle } from 'lucide-react';

export function App() {
  const { lang, isRTL } = useLanguage();

  return (
    <div className={\min-h-screen bg-[#FDFBF7] dark:bg-[#0A0A0C] text-[#111111] dark:text-[#FAF9F6] transition-colors duration-300 \\}>
      <Navbar />
      <main>
        <HeroSection />
        <InteractiveBoxBuilder />
        <ProductCatalog />
        <BrandExperience />
      </main>
      <Footer />
      <WhatsAppOrderModal />
      <CartDrawer />
      <a
        href=https://wa.me/966559556618
        target=_blank
        rel=noreferrer
        aria-label=Chat on WhatsApp
        className={\ixed bottom-6 \ z-30 p-3.5 sm:p-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl hover:scale-110 transition-all flex items-center justify-center group\}
      >
        <MessageCircle className=w-6 h-6 />
        <span className=max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-semibold px-0 group-hover:px-2>
          {lang === 'ar' ? 'تنسيق VIP فوري' : 'VIP Concierge'}
        </span>
      </a>
    </div>
  );
}

export default App;
;

fs.writeFileSync('src/App.jsx', appContent, 'utf8');
console.log('App.jsx written');
