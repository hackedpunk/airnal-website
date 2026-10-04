"use client";

import { motion } from "framer-motion";

const SOLUTIONS = [
  {
    num: "01",
    title: "AI AUTOMATION",
    desc: "Automate repetitive workflows and connect intelligent systems to everyday operations.",
  },
  {
    num: "02",
    title: "CUSTOM AI SYSTEMS",
    desc: "Design AI-powered systems around specific business needs, workflows and use cases.",
  },
  {
    num: "03",
    title: "INTELLIGENT EXPERIENCES",
    desc: "Create digital experiences that use AI to understand, adapt and respond more intelligently.",
  },
  {
    num: "04",
    title: "AI STRATEGY",
    desc: "Identify practical opportunities to apply AI where it can create meaningful value.",
  },
];

export function Solutions() {
  return (
    <section id="solutions" className="relative bg-brand-bg-secondary">

      {/* Narrative Transition */}
      <div className="py-24 md:py-32 border-t border-brand-border">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center gap-8 md:gap-12"
          >
            <span className="text-[11px] md:text-sm font-semibold tracking-[0.25em] text-brand-text-secondary uppercase">
              WE BUILD PRODUCTS
            </span>
            <div className="w-px h-12 md:h-16 bg-brand-border-strong" />
            <span className="text-[11px] md:text-sm font-semibold tracking-[0.25em] text-brand-text-secondary uppercase">
              WE APPLY INTELLIGENCE
            </span>
            <div className="w-px h-12 md:h-16 bg-brand-border-strong" />
            <span className="text-[11px] md:text-sm font-semibold tracking-[0.25em] text-brand-ivory uppercase">
              WE SOLVE PROBLEMS
            </span>
          </motion.div>
        </div>
      </div>

      {/* Main Solutions Section */}
      <div className="py-24 md:py-48 pt-0 md:pt-16 border-t border-brand-border relative">
        <div className="container mx-auto px-6 md:px-12 relative z-10">

          <div className="flex flex-col md:flex-row justify-between mb-24 md:mb-32 items-start gap-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="md:w-1/4"
            >
              <div className="text-[11px] font-semibold tracking-[0.25em] uppercase block pt-2">
                <span className="text-metallic">06</span>
                <span className="text-brand-text-muted mx-1">/</span>
                <span className="text-brand-ivory">AI SOLUTIONS</span>
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
                AI applied<br className="hidden md:block"/> to meaningful problems.
              </h2>
              <p className="text-xl md:text-2xl text-brand-text-secondary font-light leading-relaxed max-w-2xl">
                We design and build AI-powered solutions around the needs of the people and businesses they serve.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-16 md:gap-y-24">
            {SOLUTIONS.map((solution, idx) => (
              <motion.div
                key={solution.num}
                className="group flex flex-col pt-8 border-t border-brand-border hover:border-[var(--color-metallic-gold-shadow)]/40 transition-colors duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
              >
                <div className="flex flex-col gap-6">
                  <span className="text-5xl md:text-6xl font-light text-brand-text-muted/20 group-hover:text-[var(--color-metallic-gold-mid)] transition-colors duration-500 font-mono">
                    {solution.num}
                  </span>

                  <h3 className="text-xl md:text-2xl font-medium tracking-wide text-brand-ivory mt-2">
                    {solution.title}
                  </h3>

                  <p className="text-lg md:text-xl text-brand-text-secondary font-light leading-relaxed max-w-md">
                    {solution.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
