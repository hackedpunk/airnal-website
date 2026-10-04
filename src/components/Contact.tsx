"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-32 md:py-56 relative border-t border-brand-border bg-brand-bg overflow-hidden">

      {/* Background abstract element (very subtle cinematic glow) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-[50%] -translate-x-1/2 w-[800px] h-[600px] bg-brand-ivory rounded-full blur-[200px] opacity-[0.02] mix-blend-screen" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-brand-text leading-[1.05] mb-8">
              Have an idea<br /> worth building?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-xl md:text-2xl text-brand-text-secondary font-light mb-16">
              Let&apos;s build something intelligent.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center px-10 py-5 text-[13px] font-medium tracking-wide text-brand-bg bg-brand-ivory hover:bg-brand-text hover:-translate-y-[1px] transition-all duration-300 rounded-[2px]"
            >
              Start a Conversation
              <ArrowRight className="ml-3 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Contact Placeholders */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-32 pt-16 border-t border-brand-border w-full flex flex-col sm:flex-row justify-center gap-10 sm:gap-20"
          >
            {[
              { label: "Official Email", href: "#" },
              { label: "LinkedIn", href: "#" },
              { label: "Website", href: "#" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] font-semibold tracking-[0.25em] text-brand-silver hover:text-brand-ivory uppercase transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
