"use client";

import Link from "next/link";

export default function TopNav() {
    return (
        <nav className="absolute top-0 left-0 right-0 z-20 md:hidden">
            <div className="max-w-6xl mx-auto px-4 py-4">
                <ul className="flex items-center justify-center gap-8 md:gap-12">
                    <li>
                        <Link
                            href="#schedule"
                            className="text-sm md:text-base text-text-primary/80 hover:text-brand-gold transition-colors tracking-wide"
                        >
                            Events
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#drinks"
                            className="text-sm md:text-base text-text-primary/80 hover:text-brand-gold transition-colors tracking-wide"
                        >
                            Drinks
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://www.google.com/maps/place/St%C3%BAkan+Reykjav%C3%ADk+Sportbar/@64.1461928,-21.9278576,3a,42.3y,251.04h,85.14t/data=!3m7!1e1!3m5!1s28HpIapDAnZcrwMyxlGowA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D4.859999999999999%26panoid%3D28HpIapDAnZcrwMyxlGowA%26yaw%3D251.04!7i16384!8i8192!4m7!3m6!1s0x48d675fd72ca5275:0xebc79cb65be1e902!8m2!3d64.1461205!4d-21.9281012!10e5!16s%2Fg%2F11fq5jgchj?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D"
                            target="_blank"
                            className="text-sm md:text-base text-text-primary/80 hover:text-brand-gold transition-colors tracking-wide"
                        >
                            Location
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
