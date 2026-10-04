"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const PROCESS_STEPS = [
  { phase: "01", title: "IDEA" },
  { phase: "02", title: "UNDERSTAND" },
  { phase: "03", title: "DESIGN" },
  { phase: "04", title: "BUILD" },
  { phase: "05", title: "INTELLIGENCE" },
  { phase: "06", title: "IMPROVE" },
];

export function Process() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="process" className="py-24 md:py-48 relative border-t border-brand-border bg-brand-bg-alt1 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">

        <div className="flex flex-col md:flex-row justify-between mb-24 md:mb-40 items-start gap-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:w-1/4"
          >
            <div className="text-[11px] font-semibold tracking-[0.25em] uppercase block pt-2">
              <span className="text-metallic">03</span>
              <span className="text-brand-text-muted mx-1">/</span>
              <span className="text-brand-ivory">PROCESS</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="md:w-3/4"
          >
            <h2 className="text-3xl md:text-5xl lg:text-[4rem] font-medium tracking-tight text-brand-text leading-[1.05] mb-8">
              Intelligence as a process.
            </h2>
            <p className="text-xl md:text-2xl text-brand-text-secondary font-light leading-relaxed max-w-2xl">
              We combine intelligent systems, thoughtful design and engineering to turn ideas into products that work.
            </p>
          </motion.div>
        </div>

        {/* Process Visualization */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-[40px] left-4 right-4 h-[1px] bg-[var(--color-metallic-gold-dark)] opacity-40" />

          <div className="grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-4 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={step.phase}
                className="relative flex flex-col pt-4 md:pt-16 group cursor-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Mobile vertical connecting line */}
                {idx !== PROCESS_STEPS.length - 1 && (
                  <div className="md:hidden absolute top-12 left-[3px] bottom-0 w-[1px] bg-[var(--color-metallic-gold-dark)] opacity-40 -mb-8" />
                )}

                {/* Node Point */}
                <div
                  className={`absolute top-5 md:top-0 left-0 md:left-1/2 md:-translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full ring-4 ring-brand-bg-alt1 transition-colors duration-500 z-10
                    ${hoveredIdx === idx ? 'bg-[var(--color-metallic-gold-mid)]' : 'bg-brand-text-muted/30'}`}
                />

                <div className="pl-6 md:pl-0 flex flex-col md:items-center">
                  <div className="flex items-center mb-2 md:mb-4">
                    <span className={`text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300
                      ${hoveredIdx === idx ? 'text-metallic' : 'text-brand-text-muted/60'}`}>
                      PHASE {step.phase}
                    </span>
                  </div>

                  <h3 className={`text-lg md:text-[15px] lg:text-lg font-medium tracking-wide md:text-center transition-colors duration-300
                    ${hoveredIdx === idx ? 'text-brand-ivory' : 'text-brand-text-secondary'}`}>
                    {step.title}
                  </h3>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
