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
                            href="https://maps.app.goo.gl/hXyd8gbeVHgxujr48"
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
