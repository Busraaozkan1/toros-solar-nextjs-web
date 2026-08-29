export const PHONE_E164 = "+905367333678";
export const WHATSAPP_NUMBER = PHONE_E164.replace(/^\+/, "");
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function whatsappLink(message?: string): string {
  return message ? `${WHATSAPP_URL}?text=${encodeURIComponent(message)}` : WHATSAPP_URL;
}
