"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [40, 0, -40]);

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="h-screen min-h-[600px] relative border-t border-brand-border bg-brand-bg flex items-center justify-center overflow-hidden"
    >
      {/* Abstract blurred background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-ivory/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center">
        <motion.div
           style={{ opacity, y }}
           className="max-w-5xl mx-auto flex flex-col items-center"
        >
          <div className="inline-block mb-12 text-[11px] font-semibold tracking-[0.25em] uppercase">
            <span className="text-metallic">04</span>
            <span className="text-brand-text-muted mx-1">/</span>
            <span className="text-brand-ivory">PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-[4.5rem] font-medium tracking-tight text-brand-ivory leading-[1.1]">
            Because great technology<br className="hidden md:block"/> doesn&apos;t demand attention.<br />
            <span className="text-brand-text-muted mt-4 block">It empowers intention.</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
