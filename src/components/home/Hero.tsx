import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { HERO_CONTENT, SITE_DATA } from '@/lib/data'; // <--- Importing our data

const Hero = () => {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Background Gradient Effect (Optional but makes it look premium) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950 opacity-50" />

      {/* Content Container */}
      <div className="container relative z-10 flex flex-col items-center text-center px-4">
        {/* The "Pill" Badge */}
        <div className="mb-6 inline-flex items-center rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 text-sm text-slate-300 backdrop-blur">
          <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500"></span>
          {SITE_DATA.tagline}
        </div>

        {/* Main Headline */}
        <h1 className="mb-6 max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl">
          {HERO_CONTENT.headline}
        </h1>

        {/* Subheadline */}
        <p className="mb-10 max-w-2xl text-lg text-slate-400 sm:text-xl">
          {HERO_CONTENT.subheadline}
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Primary Button */}
          <Button
            size="lg"
            className="bg-white text-slate-950 hover:bg-slate-200"
          >
            <Link href="/research" className="flex items-center">
              {HERO_CONTENT.ctaPrimary}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          {/* Secondary Button (Fixed) */}
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent text-white border-white/20 hover:bg-white hover:text-slate-950"
            asChild
          >
            <Link href="/about">{HERO_CONTENT.ctaSecondary}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
