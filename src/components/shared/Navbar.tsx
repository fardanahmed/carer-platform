import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react'; // Icon library (standard in Shadcn)

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-2">
          {/* We will replace this text with the Logo Image later */}
          <span className="font-bold text-xl tracking-tight text-slate-900">
            CARER
          </span>
        </Link>

        {/* DESKTOP NAV - Hidden on mobile, visible on medium (md) screens+ */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/about" className="hover:text-black transition-colors">
            About
          </Link>
          <Link href="/research" className="hover:text-black transition-colors">
            Research Areas
          </Link>
          <Link
            href="/resources"
            className="hover:text-black transition-colors"
          >
            Resources
          </Link>
          <Link href="/events" className="hover:text-black transition-colors">
            Events
          </Link>
        </nav>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4">
          {/* Desktop: Contact Button */}
          <div className="hidden md:block">
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile: Menu Icon (Visible only on small screens) */}
          <button className="md:hidden p-2 text-slate-600">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
