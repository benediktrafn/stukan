import Image from "next/image";
import { Clock, Crosshair, Tv } from "lucide-react";
import TopNav from "@/components/TopNav";
import FeaturedMatch from "@/components/FeaturedMatch";
import MobileFooter from "@/components/MobileFooter";
import ScheduleSection from "@/components/ScheduleSection";
import { drinks } from "@/data/drinks";

// Force dynamic rendering (uses database)
export const dynamic = "force-dynamic";

export default function Home() {
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
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-10">
          <Image
            src="/logo.svg"
            alt="Stúkan Logo"
            width={160}
            height={160}
            className="h-40 w-auto drop-shadow-gold"
            priority
          />

          {/* Info Bar - Moved under Logo */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 text-white/90">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-brand-gold" />
              <span className="font-medium tracking-wide">Happy Hour 15-19</span>
            </div>
            <div className="flex items-center gap-3">
              <Crosshair className="h-5 w-5 text-brand-gold" />
              <span className="font-medium tracking-wide">Pool & Darts</span>
            </div>
            <div className="flex items-center gap-3">
              <Tv className="h-5 w-5 text-brand-gold" />
              <span className="font-medium tracking-wide">Live Sports</span>
            </div>
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
                    {drink.price}
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

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10 bg-bg-main">
        <div className="max-w-4xl mx-auto text-center text-text-primary/50 text-sm">
          <p>© 2026 Stúkan RVK Sportbar. All rights reserved.</p>
        </div>
      </footer>

      {/* Mobile Footer */}
      <MobileFooter />
    </main>
  );
}
