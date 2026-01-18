import Image from "next/image";
import { Clock, Crosshair, Tv, MapPin } from "lucide-react";
import TopNav from "@/components/TopNav";
import FeaturedMatch from "@/components/FeaturedMatch";
import MobileFooter from "@/components/MobileFooter";
import ContactFooter from "@/components/ContactFooter";
import ScheduleSection from "@/components/ScheduleSection";
import { getDrinks } from "@/lib/actions";

interface Drink {
  id: number;
  name: string;
  description: string | null;
  price: number;
}

// Force dynamic rendering (uses database)
export const dynamic = "force-dynamic";

export default async function Home() {
  const drinks = await getDrinks() as Drink[];
  return (
    <main className="min-h-screen pb-20 md:pb-0">
      {/* Hero Section with Background */}
      <section className="relative min-h-screen flex flex-col">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Stúkan Interior"
            fill
            className="object-cover"
            priority
          />
          {/* Warm gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-[#121212]" />
        </div>

        {/* Top Navigation */}
        <TopNav />

        {/* Centered Logo & Info */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-24 md:pt-40">

          {/* 1. THE LOGO (Massive & Centered) */}
          <div className="mb-12 opacity-90 hover:opacity-100 transition-opacity duration-500">
            <Image
              src="/logo.svg"
              alt="Stúkan"
              width={500}
              height={150}
              className="w-[280px] md:w-[500px] h-auto drop-shadow-2xl"
              priority
            />
          </div>

          {/* 2. THE UNIFIED NAV ROW */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-xs md:text-base text-white/80 font-sans tracking-[0.25em] uppercase z-20 mb-16">

            {/* Item 1: Live Sports */}
            <a href="#schedule" className="hover:text-brand-gold transition-colors duration-300">
              Live Sports
            </a>

            {/* Separator */}
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 shadow-[0_0_8px_rgba(198,168,124,0.5)]"></span>

            {/* Item 2: Happy Hour */}
            <a href="#drinks" className="hover:text-brand-gold transition-colors duration-300">
              Happy Hour 15–19
            </a>

            {/* Separator */}
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 shadow-[0_0_8px_rgba(198,168,124,0.5)]"></span>

            {/* Item 3: Pool & Darts */}
            <span className="cursor-default hover:text-white transition-colors">
              Pool & Darts
            </span>

            {/* Separator */}
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 shadow-[0_0_8px_rgba(198,168,124,0.5)]"></span>

            {/* Item 4: Location with Icon */}
            <a
              href="https://www.google.com/maps/place/St%C3%BAkan+Reykjav%C3%ADk+Sportbar/@64.1461928,-21.9278576,3a,42.3y,251.04h,85.14t/data=!3m7!1e1!3m5!1s28HpIapDAnZcrwMyxlGowA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D4.859999999999999%26panoid%3D28HpIapDAnZcrwMyxlGowA%26yaw%3D251.04!7i16384!8i8192!4m7!3m6!1s0x48d675fd72ca5275:0xebc79cb65be1e902!8m2!3d64.1461205!4d-21.9281012!10e5!16s%2Fg%2F11fq5jgchj?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-brand-gold transition-colors duration-300"
            >
              <MapPin className="w-4 h-4 text-brand-gold" />
              Location
            </a>

          </div>

        </div>

        {/* Spotlight Banner - Docked at bottom */}
        <div className="relative z-10">
          <FeaturedMatch />
        </div>
      </section>

      {/* Smart Schedule Section */}
      <ScheduleSection />

      {/* Drinks Menu Section */}
      <section id="drinks" className="py-16 px-4 bg-bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-brand-gold text-center mb-8">
            Drinks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {drinks.map((drink) => (
              <div
                key={drink.id}
                className="p-5 bg-bg-main/50 rounded-lg border border-white/10 hover:border-brand-gold/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-text-primary">{drink.name}</h3>
                  <span className="text-brand-gold font-mono text-sm">
                    {drink.price.toLocaleString('is-IS')} kr
                  </span>
                </div>
                {drink.description && (
                  <p className="text-text-primary/60 text-sm">{drink.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Contact Footer */}
      <ContactFooter />

      {/* Mobile Footer */}
      <MobileFooter />
    </main>
  );
}
