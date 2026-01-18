import { Mail, Instagram, Facebook, MapPin } from 'lucide-react';

const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/St%C3%BAkan+Reykjav%C3%ADk+Sportbar/@64.1461928,-21.9278576,3a,42.3y,251.04h,85.14t/data=!3m7!1e1!3m5!1s28HpIapDAnZcrwMyxlGowA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D4.859999999999999%26panoid%3D28HpIapDAnZcrwMyxlGowA%26yaw%3D251.04!7i16384!8i8192!4m7!3m6!1s0x48d675fd72ca5275:0xebc79cb65be1e902!8m2!3d64.1461205!4d-21.9281012!10e5!16s%2Fg%2F11fq5jgchj?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D";

export default function ContactFooter() {
    return (
        <footer className="w-full py-12 bg-[#121212] border-t border-white/5 mt-20">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 text-sm text-white/80 font-sans tracking-widest uppercase">

                {/* 1. ADDRESS */}
                <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-brand-gold transition-colors group"
                >
                    <MapPin className="w-5 h-5 text-brand-gold group-hover:scale-110 transition-transform" />
                    <span>Hverfisgata 40</span>
                </a>

                {/* 2. EMAIL */}
                <a
                    href="mailto:info@stukan.is"
                    className="flex items-center gap-3 hover:text-brand-gold transition-colors group"
                >
                    <Mail className="w-5 h-5 text-brand-gold group-hover:scale-110 transition-transform" />
                    <span>info@stukan.is</span>
                </a>

                {/* 3. INSTAGRAM */}
                <a
                    href="https://www.instagram.com/stukan_rvk_sportbar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-brand-gold transition-colors group"
                >
                    <Instagram className="w-5 h-5 text-brand-gold group-hover:scale-110 transition-transform" />
                    <span>/stukan_rvk_sportbar</span>
                </a>

                {/* 4. FACEBOOK */}
                <a
                    href="https://www.facebook.com/profile.php?id=61581642703802"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-brand-gold transition-colors group"
                >
                    <Facebook className="w-5 h-5 text-brand-gold group-hover:scale-110 transition-transform" />
                    <span>Stúkan RVK sportbar</span>
                </a>

            </div>

            {/* Copyright / subtle branding */}
            <div className="text-center mt-12 text-white/20 text-[10px] tracking-[0.3em]">
                STÚKAN REYKJAVÍK EST. 2026
            </div>
        </footer>
    );
}
