"use client";

import { motion } from "framer-motion";

export function Intro() {
  return (
    <section id="about" className="py-32 md:py-56 relative border-t border-brand-border bg-brand-bg">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-start">
          {/* Eyebrow / Label */}
          <div className="md:w-1/4 flex-shrink-0 pt-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[11px] font-semibold tracking-[0.25em] uppercase">
                <span className="text-metallic">01</span>
                <span className="text-brand-text-muted mx-1">/</span>
                <span className="text-brand-ivory">ABOUT AIRNAL</span>
              </div>
            </motion.div>
          </div>

          {/* Editorial Content */}
          <div className="md:w-3/4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-medium tracking-tight text-brand-text leading-[1.05] mb-12 max-w-4xl">
                Technology should make the complex feel simple.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-xl md:text-2xl text-brand-text-secondary leading-relaxed font-light max-w-2xl">
                AIRNAL is an AI technology company building intelligent products and AI-powered solutions that help turn ideas into useful digital experiences.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
