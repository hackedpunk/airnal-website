"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Products() {
  return (
    <section id="products" className="py-24 md:py-48 relative border-t border-brand-border bg-brand-bg">
      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between mb-24 md:mb-32 items-start gap-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:w-1/4"
          >
            <div className="text-[11px] font-semibold tracking-[0.25em] uppercase block pt-2">
              <span className="text-metallic">05</span>
              <span className="text-brand-text-muted mx-1">/</span>
              <span className="text-brand-ivory">PRODUCTS</span>
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
              Products built<br className="hidden md:block"/> with intelligence at the core.
            </h2>
            <p className="text-xl md:text-2xl text-brand-text-secondary font-light leading-relaxed max-w-2xl">
              We build AI-powered products designed to turn complex ideas into useful, intuitive experiences.
            </p>
          </motion.div>
        </div>

        {/* Featured Product Presentation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="group relative flex flex-col md:flex-row border border-brand-border-strong bg-brand-elevated overflow-hidden hover:border-[var(--color-metallic-gold-shadow)] transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl"
        >
          {/* Content side */}
          <div className="w-full md:w-5/12 flex flex-col p-10 md:p-16 relative z-10">
            <div className="mb-20">
              <span className="inline-block px-3 py-1 mb-8 border border-brand-text-muted/30 text-[10px] font-semibold tracking-[0.2em] text-brand-text-secondary uppercase rounded-sm group-hover:border-[var(--color-metallic-gold-shadow)]/50 group-hover:text-brand-ivory transition-colors duration-500">
                IN DEVELOPMENT
              </span>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-brand-text leading-[1.1] mb-6">
                From an idea<br /> to a website.
              </h3>
              <p className="text-lg md:text-xl text-brand-text-secondary font-light leading-relaxed">
                Describe your business. AIRNAL transforms the idea into a thoughtfully designed digital experience.
              </p>
            </div>

            {/* Metadata row */}
            <div className="mt-auto grid grid-cols-2 md:grid-cols-3 gap-6 pt-12 border-t border-brand-border-strong group-hover:border-[var(--color-metallic-gold-shadow)]/30 transition-colors duration-500">
              <div>
                <span className="text-[10px] font-semibold tracking-[0.2em] text-brand-text-muted uppercase block mb-2">PRODUCT</span>
                <span className="text-[11px] font-medium tracking-widest text-brand-ivory uppercase">AIRNAL Website Engine</span>
              </div>
              <div>
                <span className="text-[10px] font-semibold tracking-[0.2em] text-brand-text-muted uppercase block mb-2">STATUS</span>
                <span className="text-[11px] font-medium tracking-widest text-brand-ivory uppercase">In Development</span>
              </div>
              <div className="col-span-2 md:col-span-1">
                <span className="text-[10px] font-semibold tracking-[0.2em] text-brand-text-muted uppercase block mb-2">CATEGORY</span>
                <span className="text-[11px] font-medium tracking-widest text-brand-ivory uppercase">AI / Digital Exp</span>
              </div>
            </div>
          </div>

          {/* Visual side */}
          <div className="w-full md:w-7/12 relative min-h-[400px] md:min-h-full bg-brand-deep border-l border-brand-border overflow-hidden flex items-center justify-center p-8 group-hover:border-[var(--color-metallic-gold-shadow)]/50 transition-colors duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-deep via-brand-elevated to-brand-bg opacity-50 group-hover:scale-105 transition-transform duration-1000 ease-out" />

            {/* Abstract representation: IDEA → INTELLIGENCE → DIGITAL EXPERIENCE */}
            <div className="relative z-10 w-full max-w-lg">

              <div className="flex flex-col gap-6 w-full">
                {/* Idea step */}
                <div className="flex flex-col gap-3 group/step">
                  <div className="text-[10px] font-semibold tracking-[0.25em] text-brand-text-muted uppercase">01 / INPUT</div>
                  <div className="h-16 w-full md:w-3/4 border border-brand-border-strong bg-brand-elevated flex items-center px-6">
                    <span className="text-sm font-medium tracking-wide text-brand-text-secondary line-clamp-1">
                      A boutique coffee roaster in Tokyo...<span className="animate-pulse">|</span>
                    </span>
                  </div>
                </div>

                {/* Intelligence step */}
                <div className="flex flex-col gap-3 group/step">
                  <div className="text-[10px] font-semibold tracking-[0.25em] text-brand-text-muted uppercase">02 / INTELLIGENCE</div>
                  <div className="h-20 w-full border border-brand-border-strong bg-brand-bg/50 flex flex-col justify-center px-6 overflow-hidden relative group-hover:border-[var(--color-metallic-gold-shadow)]/40 transition-colors duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-metallic-gold-mid)]/10 to-transparent -translate-x-full group-hover:animate-[shimmer_3s_infinite]" />
                    <div className="flex gap-2 mb-2">
                       <div className="h-1 bg-brand-text-muted/20 w-1/4 rounded-full group-hover:bg-[var(--color-metallic-gold-shadow)]/40 transition-colors duration-700" />
                       <div className="h-1 bg-brand-text-muted/20 w-1/6 rounded-full group-hover:bg-[var(--color-metallic-gold-shadow)]/40 transition-colors duration-700" />
                    </div>
                    <div className="flex gap-2">
                       <div className="h-1 bg-brand-text-muted/20 w-1/3 rounded-full group-hover:bg-[var(--color-metallic-gold-shadow)]/40 transition-colors duration-700" />
                       <div className="h-1 bg-brand-text-muted/20 w-1/2 rounded-full group-hover:bg-[var(--color-metallic-gold-shadow)]/40 transition-colors duration-700" />
                    </div>
                  </div>
                </div>

                {/* Output step */}
                <div className="flex flex-col gap-3">
                  <div className="text-[10px] font-semibold tracking-[0.25em] text-brand-text-muted uppercase">03 / DIGITAL EXPERIENCE</div>
                  <div className="h-32 w-full border border-brand-border-strong bg-brand-bg flex items-center justify-center group-hover:border-[var(--color-metallic-gold-shadow)]/50 transition-colors duration-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-metallic-gold-shadow)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="w-16 h-16 border border-brand-border rounded-full flex items-center justify-center group-hover:border-[var(--color-metallic-gold-mid)]/40 transition-colors duration-700 relative z-10">
                      <span className="text-xl font-light text-brand-ivory opacity-50 group-hover:text-brand-ivory group-hover:opacity-100 transition-all duration-700">+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
