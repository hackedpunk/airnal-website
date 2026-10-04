"use client";

import { motion } from "framer-motion";

export function Founder() {
  return (
    <section id="vision" className="py-24 md:py-48 relative border-t border-brand-border bg-brand-bg-alt2">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center md:items-start">

          {/* Photo Placeholder */}
          <div className="w-full md:w-5/12 md:order-last">
            <motion.div
              className="aspect-[4/5] bg-brand-elevated border border-brand-border flex items-center justify-center relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Subtle visual placeholder for image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-bg to-brand-elevated opacity-30" />
              <div className="absolute inset-0 ring-1 ring-inset ring-brand-border-strong/50 pointer-events-none" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-brand-silver/50 relative z-10">
                PORTRAIT PLACEHOLDER
              </span>
            </motion.div>
          </div>

          {/* Content */}
          <div className="w-full md:w-7/12 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-[2.75rem] font-medium tracking-tight text-brand-text leading-[1.1] mb-16 max-w-lg">
                Built by a founder who believes technology should feel human.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col gap-3 mb-16"
            >
              <h3 className="text-xl md:text-2xl text-brand-ivory font-medium">Arsalan Safdar</h3>
              <p className="text-[11px] font-semibold text-brand-silver tracking-[0.2em] uppercase">Founder, AIRNAL</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-6"
            >
              {/* Social Links Placeholders */}
              {[
                { label: "LinkedIn", href: "#" },
                { label: "GitHub", href: "#" },
                { label: "Email", href: "#" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[13px] tracking-widest text-brand-text-secondary hover:text-brand-ivory transition-colors border-b border-brand-border hover:border-brand-ivory w-fit pb-1 uppercase"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
