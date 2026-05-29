import React from 'react';
import { MessageSquareCode } from 'lucide-react';

export default function WhatsAppCTA() {
  const whatsappUrl = "https://wa.me/15550192819?text=Hi%20Clara!%20I'm%20interested%20in%20arranging%20dog%20training%20for%20my%20pup.";

  return (
    <a
      id="whatsapp-floating-button"
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-20 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition-all hover:scale-110 hover:bg-emerald-700 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
      title="Chat with Clara on WhatsApp"
    >
      {/* WhatsApp Custom Svg or MessageSquareCode icon */}
      <svg
        className="h-7 w-7 fill-white"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.6.95 3.1 1.456 4.814 1.457 5.422.003 9.832-4.402 9.835-9.83.002-2.628-1.02-5.1-2.881-6.958-1.862-1.86-4.335-2.883-6.963-2.884-5.429 0-9.843 4.415-9.846 9.843-.001 1.73.457 3.418 1.328 4.937l-.98 3.585 3.673-.963zm10.741-7.353c-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.496.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
      </svg>
    </a>
  );
}
