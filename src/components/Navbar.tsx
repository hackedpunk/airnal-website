"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent",
        isScrolled
          ? "bg-brand-bg/95 backdrop-blur-sm border-brand-border py-4"
          : "bg-transparent py-8"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="relative z-10 flex items-center group">
          <span className="text-xl font-medium tracking-widest text-brand-text group-hover:text-brand-ivory transition-colors">
            AIRNAL
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[13px] tracking-wide text-brand-text-secondary hover:text-brand-ivory transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-2.5 text-[13px] font-medium tracking-wide text-brand-bg bg-brand-ivory hover:bg-brand-text hover:-translate-y-[1px] transition-all duration-300 rounded-[2px]"
          >
            Start a Conversation
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden relative z-10 p-2 text-brand-text-secondary hover:text-brand-text focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="absolute top-full left-0 right-0 bg-brand-bg border-b border-brand-border md:hidden origin-top"
          >
            <div className="flex flex-col px-6 py-10 gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg tracking-wide text-brand-text-secondary hover:text-brand-ivory transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-brand-border">
                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center px-6 py-3.5 text-sm font-medium tracking-wide text-brand-bg bg-brand-ivory rounded-[2px]"
                >
                  Start a Conversation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
