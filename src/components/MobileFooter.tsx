"use client";

import { Clock, MapPin } from "lucide-react";

const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/St%C3%BAkan+Reykjav%C3%ADk+Sportbar/@64.1461928,-21.9278576,3a,42.3y,251.04h,85.14t/data=!3m7!1e1!3m5!1s28HpIapDAnZcrwMyxlGowA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D4.859999999999999%26panoid%3D28HpIapDAnZcrwMyxlGowA%26yaw%3D251.04!7i16384!8i8192!4m7!3m6!1s0x48d675fd72ca5275:0xebc79cb65be1e902!8m2!3d64.1461205!4d-21.9281012!10e5!16s%2Fg%2F11fq5jgchj?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D";

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
