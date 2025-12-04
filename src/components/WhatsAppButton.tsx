import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "966500000000"; // رقم واتساب معين

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="تواصل معنا عبر واتساب"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      <span className="absolute right-16 bg-card text-foreground px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border shadow-lg">
        تواصل واتساب
      </span>
    </a>
  );
}
