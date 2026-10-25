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
    heading: "AI-powered products.\nIntelligent solutions.",
    support: "We combine artificial intelligence, thoughtful design, and engineering to turn complex challenges into useful, intuitive experiences.",
    hasCTA: true,
  },
  {
    chapter: "02",
    label: "PRODUCT",
    heading: "We build\nintelligent products.",
    support: "Technology designed to turn complex ideas into simple, intuitive digital experiences.",
    hasCTA: false,
  },
  {
    chapter: "03",
    label: "INTELLIGENCE",
    heading: "Intelligence\nbehind the experience.",
    support: "Systems powered by AI that understand needs, create clarity, and adapt over time.",
    hasCTA: false,
  },
  {
    chapter: "04",
    label: "SOLUTIONS",
    heading: "From complexity\nto clarity.",
    support: "AI solutions crafted around real business problems and practical operations.",
    hasCTA: false,
  },
  {
    chapter: "05",
    label: "VISION",
    heading: "Building\nwhat comes next.",
    support: "Shaping a future where intelligent technology feels effortless and human.",
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
  const [isReducedMotion, setIsReducedMotion] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false
  );
  const [showScrollCue, setShowScrollCue] = useState(true);

  const durationsRef = useRef<number[]>([10, 10, 10, 10]);
  const totalDurationRef = useRef<number>(40);
  const scrollTargetObj = useRef<number>(0);
  const timeObj = useRef<{ current: number }>({ current: 0 });
  const navHiddenRef = useRef<boolean>(false);
  const activeStateRef = useRef<number>(0);
  const lastAssignedTimeRef = useRef<{ [key: number]: number }>({});
  const isSkippedRef = useRef<boolean>(false);
  const isProgrammaticallyScrollingRef = useRef<boolean>(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    const handleWindowScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 10) {
        setShowScrollCue(false);
      } else {
        setShowScrollCue(true);
      }

      // If we are currently programmatically scrolling away from the top, ignore sub-10px scroll events
      if (isProgrammaticallyScrollingRef.current) {
        if (currentScrollY > 50) {
          isProgrammaticallyScrollingRef.current = false;
        }
        return;
      }

      if (currentScrollY < 10 && isSkippedRef.current) {
        isSkippedRef.current = false;
        scrollTargetObj.current = 0;
        timeObj.current.current = 0;
        setActiveState(0);
        activeStateRef.current = 0;
        lastAssignedTimeRef.current = {};

        // Reset video elements back to time 0 and update opacities
        videoRefs.current.forEach((vid, i) => {
          if (!vid) return;
          try {
            vid.currentTime = 0;
          } catch {}
          vid.style.opacity = i === 0 ? "1" : "0";
        });

        // Reset ScrollTrigger position & progress
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.scroll(0);
          scrollTriggerRef.current.update();
        }

        window.dispatchEvent(new CustomEvent('toggle-navbar', { detail: { hidden: false } }));
      }
    };
    window.addEventListener("scroll", handleWindowScroll, { passive: true });

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

    const currentVideos = videoRefs.current;
    currentVideos.forEach((vid) => {
      if (vid) {
        vid.addEventListener("loadedmetadata", updateDurations);
      }
    });

    let tickFn: () => void;

    const ctx = gsap.context(() => {
      if (trackRef.current) {
        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: trackRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            if (isSkippedRef.current) return;
            scrollTargetObj.current = self.progress;
          },
        });
      }

      tickFn = () => {
        if (isSkippedRef.current) return;
        const totalDuration = totalDurationRef.current;
        if (isReducedMotion || totalDuration === 0) return;

        const targetProgress = scrollTargetObj.current;
        const targetTime = targetProgress * totalDuration;

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

        let currentTime = timeObj.current.current;
        const diff = targetTime - currentTime;

        if (Math.abs(diff) < 0.001) {
          if (targetTime !== currentTime) {
            currentTime = targetTime;
            timeObj.current.current = currentTime;
          }
        } else {
          const deltaRatio = Math.min(gsap.ticker.deltaRatio(60) || 1, 1.5);
          const smoothingFactor = 0.08;
          let step = diff * smoothingFactor * deltaRatio;

          const frameDeltaSec = deltaRatio * (1 / 60);
          const maxTimelineSpeed = 2.5;
          const maxStep = maxTimelineSpeed * frameDeltaSec;

          if (Math.abs(step) > maxStep) {
            step = Math.sign(step) * maxStep;
          }

          currentTime += step;
          currentTime = Math.max(0, Math.min(currentTime, totalDuration));
          timeObj.current.current = currentTime;
        }

        const actualCinematicProgress = currentTime / totalDuration;
        const isCompleted = (actualCinematicProgress >= 0.999 && targetProgress >= 0.999);

        if (containerRef.current && spacerDOMRef.current && !isCompleted && targetProgress > 0) {
          const rect = containerRef.current.getBoundingClientRect();
          const remainingRunway = rect.bottom - window.innerHeight;
          const REQUIRED_RUNWAY = window.innerHeight * 1.5;

          if (remainingRunway < REQUIRED_RUNWAY) {
            const expansionNeeded = REQUIRED_RUNWAY - remainingRunway;
            spacerHeightRef.current += expansionNeeded;
            spacerDOMRef.current.style.height = `${spacerHeightRef.current}px`;
          }
        }

        const p = actualCinematicProgress;

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

    const handleSkipToSection = (e: Event) => {
      const customEvent = e as CustomEvent;
      const targetId = customEvent.detail?.targetId;
      if (!targetId) return;

      isSkippedRef.current = true;
      isProgrammaticallyScrollingRef.current = true;
      setShowScrollCue(false);

      if (targetId === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        window.scrollTo({
          top: targetEl.offsetTop,
          behavior: "smooth"
        });
      }
    };

    window.addEventListener("skip-to-section", handleSkipToSection);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("skip-to-section", handleSkipToSection);
      mediaQuery.removeEventListener("change", handleMediaChange);
      if (tickFn) gsap.ticker.remove(tickFn);
      ctx.revert();
      currentVideos.forEach((vid) => {
        if (vid) vid.removeEventListener("loadedmetadata", updateDurations);
      });
    };
  }, [isReducedMotion]);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    isSkippedRef.current = true;
    isProgrammaticallyScrollingRef.current = true;
    setShowScrollCue(false);

    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop,
        behavior: "smooth"
      });
    } else if (containerRef.current) {
      const containerBottom = containerRef.current.offsetTop + containerRef.current.offsetHeight;
      window.scrollTo({
        top: containerBottom,
        behavior: "smooth"
      });
    }
  };

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
                        onClick={handleExploreClick}
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

        {/* Premium Scroll Cue */}
        <AnimatePresence>
          {showScrollCue && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex items-center pointer-events-none"
            >
              <span className="text-[11px] font-semibold tracking-[0.3em] text-brand-ivory/80 uppercase animate-pulse">
                SCROLL TO EXPERIENCE
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Base physical scroll padding providing perfect structural space to scrub the 3500vh track (minus sticky core) */}
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
