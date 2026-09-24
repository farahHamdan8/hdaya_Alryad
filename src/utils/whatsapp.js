/**
 * WhatsApp message payload generator strictly matching the client specification:
 * 
 * ✨ **طلب جديد من المتجر الإلكتروني | New Order** ✨
 * ---------------------------------------------------
 * 🛍️ **تفاصيل الطلب / Order Details:**
 * - المنتج / Item: [اسم المنتج أو المنسق التفاعلي]
 * - الإضافات / Add-ons: [قائمة الإضافات]
 * - السعر الإجمالي / Total: [المبلغ] ر.س (شامل التوصيل)
 * 
 * ✍️ **رسالة الكارت / Card Message:**
 * [نص الرسالة]
 * 
 * 👤 **معلومات التوصيل / Delivery Info:**
 * • اسم المرسل / Sender: [الاسم]
 * • اسم المستلم / Recipient: [الاسم]
 * • رقم المستلم / Recipient Phone: [الرقم]
 * • المدينة والحي / District: [المنطقة]
 * • العنوان التفصيلي / Address: [العنوان]
 * • موعد التوصيل / Delivery Time: [التاريخ والوقت]
 * • ملاحظات خاصة / Notes: [الملاحظات إن وجدت]
 * ---------------------------------------------------
 */

export const generateWhatsAppUrl = ({
  phone = '966559556618',
  itemTitle,
  addonsText = 'لا توجد إضافات / None',
  totalPrice,
  cardMessage = 'بدون رسالة كارت',
  senderName,
  recipientName,
  recipientPhone,
  district,
  address,
  deliveryTime,
  notes = 'لا توجد ملاحظات خاصة'
}) => {
  const messageLines = [
    '✨ *طلب جديد من المتجر الإلكتروني | New Order* ✨',
    '---------------------------------------------------',
    '🛍️ *تفاصيل الطلب / Order Details:*',
    `• المنتج / Item: ${itemTitle || 'طلب باقة فاخرة'}`,
    `• الإضافات / Add-ons: ${addonsText || 'لا توجد إضافات'}`,
    `• السعر الإجمالي / Total: ${totalPrice || 0} ر.س (شامل التوصيل)`,
    '',
    '✍️ *رسالة الكارت / Card Message:*',
    `"${cardMessage || 'بدون رسالة كارت'}"`,
    '',
    '👤 *معلومات التوصيل / Delivery Info:*',
    `• اسم المرسل / Sender: ${senderName || 'غير محدد'}`,
    `• اسم المستلم / Recipient: ${recipientName || 'غير محدد'}`,
    `• رقم المستلم / Recipient Phone: ${recipientPhone || 'غير محدد'}`,
    `• المدينة والحي / District: ${district || 'الرياض'}`,
    `• العنوان التفصيلي / Address: ${address || 'توصيل لباب المنزل'}`,
    `• موعد التوصيل / Delivery Time: ${deliveryTime || 'أقرب وقت متاح'}`,
    `• ملاحظات خاصة / Notes: ${notes || 'لا توجد'}`,
    '---------------------------------------------------'
  ];

  const fullText = messageLines.join('\n');
  const encodedText = encodeURIComponent(fullText);
  return `https://wa.me/${phone}?text=${encodedText}`;
};
