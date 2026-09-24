import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, Send, ShoppingBag } from 'lucide-react';

export const CartDrawer = () => {
  const { lang, t, isRTL } = useLanguage();
  const { 
    items, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    openCartCheckout 
  } = useCart();

  if (!isCartOpen) return null;

  const total = getCartTotal();

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={() => setIsCartOpen(false)}
    >
      <div 
        className={`fixed inset-y-0 ${isRTL ? 'left-0' : 'right-0'} max-w-full flex pl-10`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white dark:bg-[#121214] shadow-2xl flex flex-col border-l border-neutral-200 dark:border-neutral-800">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C2185B]" />
              <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-white">
                {t('viewCart')}
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#C2185B]/10 text-[#C2185B] dark:text-rose-400 font-bold">
                {items.length}
              </span>
            </div>
            
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                
                <h4 className="font-bold text-neutral-800 dark:text-neutral-200 text-sm">
                  {t('cartEmpty')}
                </h4>
                <p className="text-xs text-neutral-500 max-w-xs">
                  {t('cartEmptySub')}
                </p>
              </div>
            ) : (
              items.map((item) => {
                const name = lang === 'ar' ? item.nameAr : item.nameEn;
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-neutral-50 dark:bg-[#1A1A1E] border border-neutral-200/80 dark:border-neutral-800/80 flex gap-4"
                  >
                    <img
                      src={item.image}
                      alt={name}
                      className="w-20 h-20 rounded-lg object-cover bg-neutral-900 shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white line-clamp-2">
                          {name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-lg overflow-hidden bg-white dark:bg-[#121214]">
                          <button
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-neutral-800 dark:text-neutral-200">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-bold text-xs sm:text-sm text-[#C2185B] dark:text-rose-400">
                          {item.price * (item.quantity || 1)} {t('sar')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#16161A]">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                  {t('totalPrice')}
                </span>
                <span className="text-xl font-bold text-[#C2185B] dark:text-rose-400">
                  {total} {t('sar')}
                </span>
              </div>

              <button
                onClick={openCartCheckout}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C2185B] to-[#D81B60] hover:from-[#AD1457] hover:to-[#C2185B] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-luxury transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{t('checkoutWhatsApp')}</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
