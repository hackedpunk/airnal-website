"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NARRATIVE_STATES = [
  {
    chapter: "01",
    label: "IDENTITY",
    heading: "AI that turns\nideas into reality.",
    support: "Building intelligent technology for what comes next.",
    hasCTA: true,
  },
  {
    chapter: "02",
    label: "PRODUCT",
    heading: "We build\nintelligent products.",
    support: "Technology designed to turn complex ideas into simple experiences.",
    hasCTA: false,
  },
  {
    chapter: "03",
    label: "INTELLIGENCE",
    heading: "Intelligence\nbehind the experience.",
    support: "AI that understands, creates and continuously improves.",
    hasCTA: false,
  },
  {
    chapter: "04",
    label: "SOLUTIONS",
    heading: "From complexity\nto clarity.",
    support: "AI-powered solutions built around real business problems.",
    hasCTA: false,
  },
  {
    chapter: "05",
    label: "VISION",
    heading: "Building\nwhat comes next.",
    support: "A future where intelligent technology feels effortless.",
    hasCTA: false,
  },
];

const VIDEOS = [
  "/videos/transition-1-2.mp4",
  "/videos/transition-2-3.mp4",
  "/videos/transition-3-4.mp4",
  "/videos/transition-4-5.mp4",
];

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeState, setActiveState] = useState<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const progressObj = useRef({ target: 0, current: 0 });
  const activeStateRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(prefersReducedMotion);

    let tickFn: () => void;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          progressObj.current.target = self.progress;
        },
      });

      tickFn = () => {
        const target = progressObj.current.target;
        const current = progressObj.current.current;

        // If we've reached the target, do nothing
        if (target === current) return;

        const diff = target - current;
        // Adjust the easing factor (e.g. 0.05 = 5% catchup per frame)
        // deltaRatio helps ensure consistency across different screen refresh rates
        const deltaRatio = gsap.ticker.deltaRatio(60) || 1;
        const smoothingFactor = 0.05;

        let newCurrent = current + diff * smoothingFactor * deltaRatio;

        // Snap when extremely close to prevent tiny oscillations
        if (Math.abs(target - newCurrent) < 0.0001) {
          newCurrent = target;
        }

        progressObj.current.current = newCurrent;
        const p = newCurrent;

        // 1. Determine active narrative state based on SMOOTHED progress
        let nextState = -1;
        if (p >= 0 && p < 0.18) nextState = 0;
        else if (p >= 0.21 && p < 0.39) nextState = 1;
        else if (p >= 0.42 && p < 0.60) nextState = 2;
        else if (p >= 0.62 && p < 0.80) nextState = 3;
        else if (p >= 0.82 && p <= 1) nextState = 4;

        if (nextState !== activeStateRef.current) {
          activeStateRef.current = nextState;
          setActiveState(nextState);
        }

        if (prefersReducedMotion) {
          // For reduced motion, just show the first video statically with no scrub,
          // but still allow text narrative states to progress as user scrolls.
          return;
        }

        // 2. Control video playback based on SMOOTHED progress
        // 4 videos mapping exactly to 0-0.25, 0.25-0.50, 0.50-0.75, 0.75-1.0
        const segment = Math.min(Math.floor(p * 4), 3);
        const segmentProgress = (p - segment * 0.25) / 0.25;

        videoRefs.current.forEach((vid, i) => {
          if (!vid) return;
          if (i === segment) {
            if (vid.style.opacity !== "1") vid.style.opacity = "1";
            if (vid.readyState >= 2) {
              // Ensure duration exists, default to 5s if still loading
              const duration = isFinite(vid.duration) && vid.duration > 0 ? vid.duration : 1;
              // Safety bound current time
              const targetTime = Math.min(segmentProgress * duration, duration - 0.01);
              vid.currentTime = targetTime;
            }
          } else {
            if (vid.style.opacity !== "0") vid.style.opacity = "0";
          }
        });
      };

      gsap.ticker.add(tickFn);
    }, containerRef);

    return () => {
      if (tickFn) gsap.ticker.remove(tickFn);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={`relative h-[2000vh] bg-brand-bg`}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* Cinematic Video Layer */}
        {VIDEOS.map((src, idx) => (
          <video
            key={src}
            ref={(el) => {
              videoRefs.current[idx] = el;
            }}
            src={src}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
            style={{ opacity: isReducedMotion ? (idx === 0 ? 1 : 0) : idx === 0 ? 1 : 0 }}
            muted
            playsInline
            preload="auto"
          />
        ))}

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/90 via-brand-bg/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-bg/80 pointer-events-none" />
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(7,7,7,0.7)] pointer-events-none" />

        {/* Narrative Framework */}
        <div className="container relative z-10 mx-auto px-6 md:px-12 h-full flex flex-col justify-center">
          <div className="max-w-2xl mt-12 md:mt-0 w-full md:w-[45%]">
            <AnimatePresence mode="wait">
              {activeState !== -1 && NARRATIVE_STATES[activeState] && (
                <motion.div
                  key={activeState}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="inline-block mb-6 md:mb-8 text-[10px] md:text-[11px] font-semibold tracking-[0.25em] text-brand-silver uppercase">
                    {NARRATIVE_STATES[activeState].chapter} / {NARRATIVE_STATES[activeState].label}
                  </span>

                  <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-medium leading-[1.05] tracking-tight text-brand-text mb-6 md:mb-8 whitespace-pre-line">
                    {NARRATIVE_STATES[activeState].heading}
                  </h1>

                  <p className="text-lg md:text-xl text-brand-text-secondary leading-relaxed font-light mb-10 md:mb-12">
                    {NARRATIVE_STATES[activeState].support}
                  </p>

                  {NARRATIVE_STATES[activeState].hasCTA && (
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href="#about"
                        className="group inline-flex items-center justify-center px-8 py-4 text-[13px] font-medium tracking-wide text-brand-bg bg-brand-ivory hover:bg-brand-text hover:-translate-y-[1px] transition-all duration-300 rounded-[2px]"
                      >
                        Explore AIRNAL
                        <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <Link
                        href="#contact"
                        className="group inline-flex items-center justify-center px-8 py-4 text-[13px] font-medium tracking-wide text-brand-ivory border border-brand-border-strong hover:bg-brand-border hover:text-brand-text transition-all duration-300 rounded-[2px]"
                      >
                        Start a Conversation
                        <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform opacity-70" />
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Chapter Indicator */}
        <AnimatePresence>
          {activeState !== -1 && NARRATIVE_STATES[activeState] && (
            <motion.div
              key={`chapter-${activeState}`}
              className="absolute bottom-10 left-6 md:left-12 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4">
                <span className="w-12 h-px bg-brand-silver/30 inline-block" />
                <span className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] text-brand-silver/80 uppercase">
                  {NARRATIVE_STATES[activeState].chapter} / 05
                </span>
                <span className="text-[10px] md:text-[11px] uppercase tracking-widest text-brand-text-muted">
                  — {NARRATIVE_STATES[activeState].label}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
