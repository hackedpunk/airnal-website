"use client";

import { motion } from "framer-motion";

export function Founder() {
  return (
    <section id="vision" className="py-24 md:py-48 relative border-t border-brand-border bg-brand-bg-alt2">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <div className="text-[11px] font-semibold tracking-[0.25em] uppercase">
              <span className="text-metallic">07</span>
              <span className="text-brand-text-muted mx-1">/</span>
              <span className="text-brand-ivory">FOUNDER</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col gap-3 mb-10"
          >
            <h2 className="text-2xl md:text-3xl text-brand-ivory font-medium tracking-wide">
              ARSALAN SAFDAR
            </h2>
            <h3 className="text-[11px] font-semibold text-brand-text-secondary tracking-[0.2em] uppercase">
              Founder of AIRNAL
            </h3>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="w-16 h-px bg-[var(--color-metallic-gold-shadow)]/40 mb-12"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-6 md:gap-8 mb-16 text-lg md:text-2xl text-brand-text-secondary font-light leading-relaxed text-center"
          >
            <p>
              AIRNAL started with a simple idea: technology should not make things more complicated. It should make ambitious ideas easier to understand, build and bring to life.
            </p>
            <p>
              I founded AIRNAL to explore what happens when artificial intelligence, thoughtful design and engineering come together. We are starting by building intelligent products, while working toward a broader vision of technology that feels useful, intuitive and human.
            </p>
            <p>
              There is still a long way to go. But AIRNAL is being built with the belief that the best technology is not the technology that demands attention — it is the technology that quietly makes what seemed difficult possible.
            </p>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-8 justify-center items-center"
          >
            <a
              href="https://www.linkedin.com/in/arsalan-safdar-131748408"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] tracking-widest text-brand-text-secondary hover:text-metallic transition-all duration-300 border-b border-[var(--color-metallic-gold-shadow)]/40 hover:border-[var(--color-metallic-gold-mid)] uppercase hover:-translate-y-px pb-1"
            >
              LinkedIn
            </a>
            <a
              href="mailto:airnal.business@gmail.com"
              className="text-[13px] tracking-widest text-brand-text-secondary hover:text-metallic transition-all duration-300 border-b border-[var(--color-metallic-gold-shadow)]/40 hover:border-[var(--color-metallic-gold-mid)] uppercase hover:-translate-y-px pb-1"
            >
              Email
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
