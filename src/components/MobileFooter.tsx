"use client";

import { Clock, MapPin } from "lucide-react";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/hXyd8gbeVHgxujr48";

export default function MobileFooter() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
            <div className="bg-[#1E1E1E]/95 backdrop-blur-md border-t border-white/10 px-4 py-3">
                <div className="flex items-center justify-between max-w-lg mx-auto">
                    {/* Happy Hour */}
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-brand-gold" />
                        <span className="text-sm font-medium text-text-primary">Happy Hour 15-19</span>
                    </div>

                    {/* Map Button */}
                    <a
                        href={GOOGLE_MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center h-11 w-11 bg-brand-gold rounded-full text-bg-main hover:bg-brand-gold/90 transition-colors active:scale-95"
                        aria-label="Open in Google Maps"
                    >
                        <MapPin className="h-5 w-5" />
                    </a>
                </div>
            </div>
        </div>
    );
}
