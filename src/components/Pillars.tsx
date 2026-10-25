"use client";

import { motion } from "framer-motion";

const PILLARS = [
  {
    num: "01",
    title: "INTELLIGENCE",
    desc: "AI systems designed to understand and act.",
  },
  {
    num: "02",
    title: "PRODUCTS",
    desc: "Technology built for real-world use.",
  },
  {
    num: "03",
    title: "SOLUTIONS",
    desc: "AI applied to meaningful problems.",
  },
];

export function Pillars() {
  return (
    <section id="pillars" className="py-24 md:py-40 relative bg-brand-bg-secondary border-t border-brand-border">
      {/* Background abstract element (very subtle cinematic lighting) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-ivory rounded-full blur-[180px] opacity-[0.015] mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <div className="text-[11px] font-semibold tracking-[0.25em] uppercase">
            <span className="text-metallic">02</span>
            <span className="text-brand-text-muted mx-1">/</span>
            <span className="text-brand-ivory">THE AIRNAL PILLARS</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              className="group flex flex-col bg-brand-elevated border border-brand-border hover:border-[var(--color-metallic-gold-shadow)]/40 p-10 md:p-12 hover:-translate-y-1 transition-all duration-500 rounded-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-16">
                <div className="text-[11px] font-semibold tracking-[0.25em] flex items-center">
                  <span className="text-metallic">{pillar.num}</span>
                  <span className="inline-block w-6 h-px bg-brand-border-strong ml-4" />
                </div>
              </div>
              <div className="mt-auto">
                <h3 className="text-[13px] font-medium tracking-[0.15em] text-brand-ivory uppercase group-hover:text-brand-text transition-colors duration-500 mb-4">
                  {pillar.title}
                </h3>
                <p className="text-xl md:text-2xl text-brand-text-secondary font-light leading-snug">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
