import React from 'react';
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
    <div className={`min-h-screen bg-[#FDFBF7] dark:bg-[#0A0A0C] text-[#111111] dark:text-[#FAF9F6] transition-colors duration-300 font-sans ${isRTL ? 'font-arabicSans' : 'font-sans'}`}>

      {/* Top Fixed Luxury Navigation */}
      <Navbar />

      <main>
        {/* Editorial Hero Section */}
        <HeroSection />


        {/* Exclusive Catalog with Quick-view and Instant Order */}
        <ProductCatalog />
        {/* Feature 1: Interactive Custom Gift Box Builder (المنسق التفاعلي) */}
        <InteractiveBoxBuilder />

        {/* Brand Experience & VIP Riyadh Assurances */}
        <BrandExperience />
      </main>

      {/* Atelier Footer */}
      <Footer />

      {/* Feature 2: WhatsApp Confirmation & Delivery Form Modal */}
      <WhatsAppOrderModal />

      {/* Shopping Bag Drawer */}
      <CartDrawer />

      {/* Floating Fast WhatsApp Floating Button (Mobile & Desktop) */}
      <a
        href="https://wa.me/966559556618"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-30 p-3.5 sm:p-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl hover:scale-110 transition-all flex items-center justify-center group`}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-semibold px-0 group-hover:px-2">
          {lang === 'ar' ? 'تنسيق VIP فوري' : 'VIP Concierge'}
        </span>
      </a>

    </div>
  );
}

export default App;
