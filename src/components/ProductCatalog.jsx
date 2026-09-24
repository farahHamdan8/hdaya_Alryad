import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { catalogProducts } from '../data/mockData';
import { Eye, ShoppingBag, Send, Star } from 'lucide-react';

export const ProductCatalog = () => {
  const { lang, t } = useLanguage();
  const { addToCart, openCheckoutWithItem } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    { id: 'all', label: t('catAll') },
    { id: 'roses', label: t('catRoses') },
    { id: 'vases', label: t('catVases') },
    { id: 'vip', label: t('catVIP') },
    { id: 'occasions', label: t('catOccasions') },
  ];

  const filteredProducts = activeCategory === 'all'
    ? catalogProducts
    : catalogProducts.filter(p => p.category === activeCategory);

  return (
    <section id="catalog" className="py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#C2185B] dark:text-rose-400 font-bold block mb-2">
            MAISON ATELIER RIYADH
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white">
            {t('catalogHeading')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            {t('catalogSubheading')}
          </p>

          {/* Category Filters */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-8">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeCategory === c.id
                    ? 'bg-[#C2185B] text-white shadow-luxury'
                    : 'bg-neutral-100 dark:bg-[#1A1A1E] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const name = lang === 'ar' ? product.nameAr : product.nameEn;
            const desc = lang === 'ar' ? product.descAr : product.descEn;
            const badge = lang === 'ar' ? product.badgeAr : product.badgeEn;

            return (
              <div
                key={product.id}
                className="group rounded-2xl overflow-hidden bg-white dark:bg-[#16161A] border border-neutral-200/80 dark:border-neutral-800/80 hover:border-[#C2185B]/40 dark:hover:border-rose-500/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container with Badges */}
                <div className="relative h-80 overflow-hidden bg-neutral-900">
                  <img
                    src={product.image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wider">
                    {badge}
                  </div>

                  {/* Rating Pill */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-sm text-neutral-900 dark:text-white text-[11px] font-bold flex items-center gap-1 shadow">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{product.rating}</span>
                  </div>

                  {/* Quick Action Overlay Buttons */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="p-3 rounded-full bg-white text-neutral-900 hover:bg-neutral-100 hover:scale-110 transition-all shadow-lg"
                      title={t('viewDetails')}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="p-3 rounded-full bg-[#C2185B] text-white hover:bg-[#D81B60] hover:scale-110 transition-all shadow-lg"
                      title={t('addToCart')}
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-white line-clamp-1 group-hover:text-[#C2185B] transition-colors">
                      {name}
                    </h3>
                    <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-extrabold text-[#C2185B] dark:text-rose-400">
                        {product.price}
                      </span>
                      <span className="text-xs text-neutral-500 font-semibold ml-1 mr-1">
                        {t('sar')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openCheckoutWithItem(product)}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#C2185B] to-[#D81B60] hover:from-[#AD1457] hover:to-[#C2185B] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{t('quickOrder')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
          <div
            className="relative bg-white dark:bg-[#121214] rounded-2xl max-w-xl w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-100 sm:h-100 bg-neutral-900">
              <img
                src={selectedProduct.image}
                alt="Product"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <span className="text-xs font-bold text-[#C2185B] dark:text-rose-400 uppercase">
                {lang === 'ar' ? selectedProduct.badgeAr : selectedProduct.badgeEn}
              </span>
              <h3 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white mt-1">
                {lang === 'ar' ? selectedProduct.nameAr : selectedProduct.nameEn}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                {lang === 'ar' ? selectedProduct.descAr : selectedProduct.descEn}
              </p>

              <div className="mt-4 p-3 rounded-xl bg-neutral-50 dark:bg-[#1A1A1E] border border-neutral-200 dark:border-neutral-800 text-xs">
                <span className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                  {lang === 'ar' ? 'المحتويات والتفاصيل:' : 'Includes:'}
                </span>
                <p className="text-neutral-500 dark:text-neutral-400">
                  {lang === 'ar' ? selectedProduct.includesAr : selectedProduct.includesEn}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <div>
                  <span className="text-2xl font-bold text-[#C2185B] dark:text-rose-400">
                    {selectedProduct.price}
                  </span>
                  <span className="text-xs font-semibold text-neutral-500 ml-1 mr-1">
                    {t('sar')}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-[#C2185B] text-[#C2185B] dark:text-rose-400 text-xs font-bold flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t('addToCart')}</span>
                  </button>
                  <button
                    onClick={() => {
                      const prod = selectedProduct;
                      setSelectedProduct(null);
                      openCheckoutWithItem(prod);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#C2185B] text-white text-xs font-bold flex items-center gap-1.5 shadow-luxury"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t('checkoutWhatsApp')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
