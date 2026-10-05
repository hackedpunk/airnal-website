"use client";

import { useEffect, useRef, useState } from "react";
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
  const trackRef = useRef<HTMLDivElement>(null);
  const spacerDOMRef = useRef<HTMLDivElement>(null);
  const spacerHeightRef = useRef<number>(0);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeState, setActiveState] = useState<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Durations kept strictly out of React state to safeguard against re-renders
  const durationsRef = useRef<number[]>([10, 10, 10, 10]);
  const totalDurationRef = useRef<number>(40);

  // Pure refs for global non-blocking timeline engine
  const scrollTargetObj = useRef<number>(0);
  const timeObj = useRef({ current: 0 });
  const activeStateRef = useRef(0);
  const navHiddenRef = useRef(false);
  const lastAssignedTimeRef = useRef([-1, -1, -1, -1]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(prefersReducedMotion);

    // Initial check for loadedmetadata to measure true combined timeline
    const updateDurations = () => {
      let total = 0;
      const durs = videoRefs.current.map((vid) => {
        const d = (vid && isFinite(vid.duration) && vid.duration > 0) ? vid.duration : 10;
        total += d;
        return d;
      });
      durationsRef.current = durs;
      totalDurationRef.current = total;
    };

    updateDurations();

    videoRefs.current.forEach((vid) => {
      if (vid) {
        vid.addEventListener("loadedmetadata", updateDurations);
      }
    });

    let tickFn: () => void;

    const ctx = gsap.context(() => {
      if (trackRef.current) {
        ScrollTrigger.create({
          trigger: trackRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            scrollTargetObj.current = self.progress;
          },
        });
      }

      tickFn = () => {
        const totalDuration = totalDurationRef.current;
        if (prefersReducedMotion || totalDuration === 0) return;

        // 1. PHYSICAL SCROLL target (mapped exclusively over the 3500vh virtual track, isolated from container expansion)
        const targetProgress = scrollTargetObj.current;
        const targetTime = targetProgress * totalDuration;

        // Navbar Visibility: Dynamically evaluate physical bounding box to keep navbar correctly scoped
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const scrolledIntoContainer = -rect.top;
          const remainingRunway = rect.bottom - window.innerHeight;

          const targetNavHidden = scrolledIntoContainer >= 50 && remainingRunway >= 50;
          if (targetNavHidden !== navHiddenRef.current) {
            navHiddenRef.current = targetNavHidden;
            window.dispatchEvent(new CustomEvent('toggle-navbar', { detail: { hidden: targetNavHidden } }));
          }
        }

        // 2. SMOOTH CINEMATIC ENGINE
        let currentTime = timeObj.current.current;
        const diff = targetTime - currentTime;

        if (Math.abs(diff) < 0.001) {
          if (targetTime !== currentTime) {
            currentTime = targetTime;
            timeObj.current.current = currentTime;
          }
        } else {
          // Smoothing calculation provides responsive catchup for small movements
          const deltaRatio = Math.min(gsap.ticker.deltaRatio(60) || 1, 1.5);
          const smoothingFactor = 0.08;
          let step = diff * smoothingFactor * deltaRatio;

          // Real time delta (assuming ~60fps baseline for deltaRatio)
          const frameDeltaSec = deltaRatio * (1 / 60);

          // VELOCITY CLAMPING: Capped at maximum 2.5x cinematic playback speed
          const maxTimelineSpeed = 2.5;
          const maxStep = maxTimelineSpeed * frameDeltaSec;

          if (Math.abs(step) > maxStep) {
            step = Math.sign(step) * maxStep;
          }

          currentTime += step;

          // Final safety bound
          currentTime = Math.max(0, Math.min(currentTime, totalDuration));
          timeObj.current.current = currentTime;
        }

        // 3. ACTUAL TIMELINE POSITION
        const actualCinematicProgress = currentTime / totalDuration;

        // 4. COMPLETION DETECTION & DYNAMIC HOLD SPACER
        // If the user's high-speed physical scroll outpaces the cinematic iteration,
        // they are blocked from escaping via a purely native elastic DOM spacer stretch.
        const isCompleted = (actualCinematicProgress >= 0.999 && targetProgress >= 0.999);

        if (containerRef.current && spacerDOMRef.current && !isCompleted && targetProgress > 0) {
          const rect = containerRef.current.getBoundingClientRect();
          const remainingRunway = rect.bottom - window.innerHeight;

          // Maintain a persistent 1.5-screen buffer ahead of them
          const REQUIRED_RUNWAY = window.innerHeight * 1.5;

          if (remainingRunway < REQUIRED_RUNWAY) {
            const expansionNeeded = REQUIRED_RUNWAY - remainingRunway;
            spacerHeightRef.current += expansionNeeded;
            spacerDOMRef.current.style.height = `${spacerHeightRef.current}px`;
          }
        }

        // Convert the actual timeline position back into global UI progress mapping [0, 1]
        const p = actualCinematicProgress;

        // Determine active narrative state based on actual cinematic progress
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

        // Map global cinematic progress onto the exact video timeline segmentation
        let accumulated = 0;
        let segment = 0;
        let segmentTime = 0;

        for (let i = 0; i < durationsRef.current.length; i++) {
          const d = durationsRef.current[i];
          if (currentTime <= accumulated + d || i === durationsRef.current.length - 1) {
            segment = i;
            segmentTime = currentTime - accumulated;
            break;
          }
          accumulated += d;
        }

        segmentTime = Math.max(0, Math.min(segmentTime, durationsRef.current[segment] - 0.01));

        // Coordinate all video elements seamlessly per-frame
        videoRefs.current.forEach((vid, i) => {
          if (!vid) return;
          if (i === segment) {
            if (vid.style.opacity !== "1") vid.style.opacity = "1";
            if (vid.readyState >= 2) {
              const lastAssigned = lastAssignedTimeRef.current[i];
              if (lastAssigned === undefined || Math.abs(lastAssigned - segmentTime) > 0.015) {
                vid.currentTime = segmentTime;
                lastAssignedTimeRef.current[i] = segmentTime;
              }
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
      videoRefs.current.forEach((vid) => {
        if (vid) vid.removeEventListener("loadedmetadata", updateDurations);
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={`relative bg-brand-bg w-full`}
    >
      {/* Virtual Track exclusively for driving 0%->100% target mapping */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 w-px pointer-events-none"
        style={{ height: "3500vh" }}
      />

      <div className="sticky top-0 w-full h-screen overflow-hidden flex-shrink-0">

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
                  <div className="inline-block mb-6 md:mb-8 text-[10px] md:text-[11px] font-semibold tracking-[0.25em] uppercase">
                    <span className="text-metallic">{NARRATIVE_STATES[activeState].chapter}</span>
                    <span className="text-brand-text-muted mx-1">/</span>
                    <span className="text-brand-ivory">{NARRATIVE_STATES[activeState].label}</span>
                  </div>

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
                        className="group inline-flex items-center justify-center px-8 py-4 text-[13px] font-medium tracking-wide text-brand-bg bg-brand-ivory hover:bg-metallic hover:-translate-y-[1px] transition-all duration-300 rounded-[2px]"
                      >
                        Explore AIRNAL
                        <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <button
                        onClick={() => window.dispatchEvent(new CustomEvent("open-launch-modal"))}
                        className="group inline-flex items-center justify-center px-8 py-4 text-[13px] font-medium tracking-wide text-brand-ivory border border-[var(--color-metallic-gold-shadow)]/40 bg-transparent hover:border-[var(--color-metallic-gold-mid)] transition-all duration-300 rounded-[2px]"
                      >
                        Start a Conversation
                        <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform opacity-70" />
                      </button>
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
                <span className="w-12 h-px bg-metallic opacity-60 inline-block" />
                <div className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase">
                  <span className="text-metallic">{NARRATIVE_STATES[activeState].chapter}</span>
                  <span className="text-brand-text-muted mx-1">/</span>
                  <span className="text-brand-text-muted">05</span>
                </div>
                <span className="text-[10px] md:text-[11px] uppercase tracking-widest text-brand-ivory/80">
                  — {NARRATIVE_STATES[activeState].label}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Base physical scrub padding providing perfect structural space to scrub the 3500vh track (minus sticky core) */}
      <div className="w-full pointer-events-none" style={{ height: "3400vh" }} />

      {/* Dynamic Hand-off Hold Region spacer - gracefully locks them from escaping if scrubbing too fast */}
      <div
        ref={spacerDOMRef}
        className="w-full pointer-events-none"
        style={{ height: "0px" }}
      />
    </section>
  );
}
