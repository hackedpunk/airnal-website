"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import Image from "next/image";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const NAV_LINKS = [
  { name: "Products", href: "#products" },
  { name: "Solutions", href: "#solutions" },
  { name: "Vision", href: "#vision" },
  { name: "About", href: "#about" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleToggleNavbar = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && typeof customEvent.detail.hidden === 'boolean') {
        setIsHidden(customEvent.detail.hidden);
        if (customEvent.detail.hidden) {
          setMobileMenuOpen(false); // Close mobile menu if it's open when fading out
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("toggle-navbar", handleToggleNavbar);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("toggle-navbar", handleToggleNavbar);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 origin-top flex items-center h-[60px] md:h-[72px]",
        isHidden ? "-translate-y-3 opacity-0 pointer-events-none" : "translate-y-0 opacity-100",
        isScrolled && !isHidden
          ? "bg-[#070707]/95 border-b border-white/[0.03]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between w-full">
        {/* LOGO */}
        <Link href="/" className="relative z-10 flex items-center group w-[85px] md:w-[105px]">
          <Image
            src="/images/airnal-logo.png"
            alt="AIRNAL Logo"
            width={110}
            height={30}
            className="w-full h-auto object-contain transition-all duration-300 group-hover:opacity-80"
            priority
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-12">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[13px] tracking-wide text-brand-text-secondary hover:text-brand-ivory transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-launch-modal"))}
            className="inline-flex items-center justify-center px-5 py-2 text-[12px] font-medium tracking-wide text-brand-text-secondary hover:text-brand-ivory border border-[var(--color-metallic-gold-shadow)]/30 hover:border-[var(--color-metallic-gold-shadow)]/70 hover:bg-white/5 transition-all duration-300 rounded-sm"
          >
            Start a Conversation
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden relative z-10 p-2 text-brand-text-secondary hover:text-brand-text focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE NAV OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-[#070707] border-b border-white/[0.03] md:hidden origin-top"
          >
            <div className="flex flex-col px-6 py-8 gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg tracking-wide text-brand-text-secondary hover:text-brand-ivory transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-white/[0.03]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.dispatchEvent(new CustomEvent("open-launch-modal"));
                  }}
                  className="inline-flex w-full items-center justify-center px-6 py-3 text-[13px] font-medium tracking-wide text-brand-text-secondary hover:text-brand-ivory border border-[var(--color-metallic-gold-shadow)]/30 hover:border-[var(--color-metallic-gold-shadow)]/70 hover:bg-white/5 transition-all duration-300 rounded-sm"
                >
                  Start a Conversation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
