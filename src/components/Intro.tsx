"use client";

import { motion } from "framer-motion";

export function Intro() {
  return (
    <section id="about" className="py-24 md:py-48 relative border-t border-brand-border bg-brand-bg-alt1">
      {/* Very subtle line divider indicating architectural precision */}
      <div className="absolute top-0 left-0 bottom-0 w-px bg-brand-border/30 ml-[8%] md:ml-[10%]" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-start">

          {/* Label side */}
          <div className="md:w-1/3 flex-shrink-0 pt-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-brand-text leading-snug">
                Technology should make<br /> the complex feel simple.
              </h2>
            </motion.div>
          </div>

          {/* Text side */}
          <div className="md:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <p className="text-2xl md:text-3xl text-brand-text-secondary leading-relaxed font-light">
                AIRNAL is an AI technology company building intelligent products and AI-powered solutions that help turn ideas into useful digital experiences.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
