"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar as CalendarIcon, ChevronDown, Download, ExternalLink } from "lucide-react";

export function LaunchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // Countdown state
  const targetDate = useMemo(() => new Date("2027-06-30T00:00:00").getTime(), []);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: false });

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-launch-modal", handleOpen);
    return () => window.removeEventListener("open-launch-modal", handleOpen);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      setShowOptions(false);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft(prev => ({ ...prev, isLive: true }));
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
          isLive: false
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [isOpen, targetDate]);

  if (!isOpen) return null;

  const eventDetails = {
    title: "AIRNAL — Product Launch",
    description: "AIRNAL's first product launches in 2027.\\n\\nAIRNAL is building intelligent products and AI-powered solutions that turn ideas into useful digital experiences.\\n\\nWebsite: https://airnal.in",
    urlDetails: "AIRNAL's first product launches in 2027.%0A%0AAIRNAL is building intelligent products and AI-powered solutions that turn ideas into useful digital experiences.%0A%0AWebsite: https://airnal.in",
    datesGoogle: "20270630/20270701",
    startOutlook: "2027-06-30T00:00:00Z",
    endOutlook: "2027-07-01T00:00:00Z"
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.datesGoogle}&details=${eventDetails.urlDetails}`;
  const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&startdt=${eventDetails.startOutlook}&enddt=${eventDetails.endOutlook}&subject=${encodeURIComponent(eventDetails.title)}&body=${eventDetails.urlDetails}`;

  const handleDownloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AIRNAL//Product Launch//EN
BEGIN:VEVENT
SUMMARY:${eventDetails.title}
DTSTART;VALUE=DATE:20270630
DTEND;VALUE=DATE:20270701
DESCRIPTION:${eventDetails.description.replace(/\\n/g, '\\n')}
URL:https://airnal.in
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'airnal-launch-2027.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setShowOptions(false);
  };

  const handleContactUs = () => {
    setIsOpen(false);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 py-6 md:py-12"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-[#070707]/90 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Modal Surface */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#101010] border border-brand-border-strong shadow-2xl flex flex-col group mx-auto overflow-hidden"
          style={{ maxHeight: "calc(100dvh - 32px)" }}
        >
          {/* Subtle metallic sweep on open */}
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            className="absolute top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-[var(--color-metallic-gold-mid)] to-transparent opacity-50 pointer-events-none z-20"
          />

          {/* MODAL HEADER - Fixed at top */}
          <div className="flex-shrink-0 px-8 py-6 md:px-12 md:py-8 flex items-center justify-between border-b border-brand-border z-10 bg-[#101010]">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-metallic uppercase">
              AIRNAL / 2027
            </span>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 -mr-2 text-brand-text-muted hover:text-metallic transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--color-metallic-gold-mid)] focus:ring-offset-1 focus:ring-offset-[#101010] rounded-sm flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* SCROLLABLE CONTENT */}
          <div className="flex-1 overflow-y-auto p-8 md:p-12 relative z-0">
            {/* Split Content structure */}
            <div className="flex flex-col md:flex-row gap-12 md:gap-16 w-full pb-12 border-b border-brand-border">

              {/* LEFT Column */}
              <div className="flex-1 flex flex-col justify-start">
                <h2 id="modal-title" className="text-3xl md:text-5xl font-medium tracking-tight text-brand-ivory leading-[1.1] mb-8">
                  Something intelligent<br className="hidden lg:block"/> is coming.
                </h2>

                <div className="text-base md:text-lg text-brand-text-secondary font-light leading-relaxed flex flex-col gap-5 max-w-lg">
                  <p>
                    AIRNAL&apos;s first product is currently in development.
                  </p>
                  <p>
                    We are building technology that turns ideas into intelligent, beautifully designed digital experiences.
                  </p>
                  <p>
                    The product is planned to launch in 2027.
                  </p>
                  <p className="text-brand-ivory font-medium mt-2">
                    Stay close. We&apos;re just getting started.
                  </p>
                </div>
              </div>

              {/* RIGHT Column */}
              <div className="flex-1 flex flex-col justify-start md:pt-2">
                {/* Date highlight */}
                <div tabIndex={0} className="mb-10 group/date cursor-default outline-none">
                  <div className="text-[10px] font-semibold tracking-[0.2em] text-brand-text-muted uppercase mb-3">PLANNED LAUNCH</div>
                  <div className="text-3xl md:text-4xl font-medium tracking-tight text-brand-ivory group-hover/date:text-metallic group-focus/date:text-metallic transition-colors duration-500 relative inline-block pb-1">
                    JUNE 30, 2027
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--color-metallic-gold-mid)] group-hover/date:w-full group-focus/date:w-full transition-all duration-700 ease-out opacity-60" />
                  </div>
                </div>

                {/* Countdown */}
                <div className="mb-12">
                  <div className="text-[10px] font-semibold tracking-[0.2em] text-brand-text-muted uppercase mb-4">LAUNCHING IN</div>
                  {timeLeft.isLive ? (
                    <div className="text-xl font-medium tracking-widest text-metallic uppercase">
                      AIRNAL IS NOW LIVE
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 sm:gap-4 md:gap-7 font-mono">
                      <div className="flex flex-col">
                        <span className="text-2xl sm:text-3xl md:text-4xl font-light text-brand-ivory tabular-nums leading-none mb-2">{timeLeft.days.toString().padStart(2, '0')}</span>
                        <span className="text-[9px] tracking-[0.2em] text-brand-text-muted uppercase text-center md:text-left">Days</span>
                      </div>
                      <div className="text-brand-border-strong text-2xl sm:text-3xl font-light leading-none mb-4">:</div>
                      <div className="flex flex-col">
                        <span className="text-2xl sm:text-3xl md:text-4xl font-light text-brand-ivory tabular-nums leading-none mb-2">{timeLeft.hours.toString().padStart(2, '0')}</span>
                        <span className="text-[9px] tracking-[0.2em] text-brand-text-muted uppercase text-center md:text-left">Hours</span>
                      </div>
                      <div className="text-brand-border-strong text-2xl sm:text-3xl font-light leading-none mb-4">:</div>
                      <div className="flex flex-col">
                        <span className="text-2xl sm:text-3xl md:text-4xl font-light text-brand-ivory tabular-nums leading-none mb-2">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                        <span className="text-[9px] tracking-[0.2em] text-brand-text-muted uppercase text-center md:text-left">Mins</span>
                      </div>
                      <div className="text-brand-border-strong text-2xl sm:text-3xl font-light leading-none mb-4">:</div>
                      <div className="flex flex-col">
                        <span className="text-2xl sm:text-3xl md:text-4xl font-light text-brand-ivory tabular-nums leading-none mb-2">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                        <span className="text-[9px] tracking-[0.2em] text-brand-text-muted uppercase text-center md:text-left">Secs</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA Action */}
                <div className="relative w-full max-w-sm">
                  <button
                    onClick={() => setShowOptions(!showOptions)}
                    className="group/btn inline-flex items-center justify-center w-full px-8 py-5 text-[12px] font-semibold tracking-widest text-brand-ivory hover:text-[#101010] border border-[var(--color-metallic-gold-shadow)]/40 hover:border-transparent hover:bg-metallic bg-[#101010] active:scale-[0.98] transition-all duration-300 rounded-sm uppercase focus:outline-none focus:ring-2 focus:ring-[var(--color-metallic-gold-mid)] focus:ring-offset-4 focus:ring-offset-[#101010]"
                    aria-expanded={showOptions}
                    aria-haspopup="true"
                  >
                    <CalendarIcon className="w-4 h-4 mr-3 text-[var(--color-metallic-gold-mid)] group-hover/btn:text-[#101010] transition-colors duration-300" />
                    ADD TO CALENDAR
                    <ChevronDown className={`w-4 h-4 ml-auto opacity-60 group-hover/btn:opacity-100 transition-all duration-300 ${showOptions ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showOptions && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full mb-2 left-0 right-0 lg:top-full lg:bottom-auto lg:mt-2 bg-brand-elevated border border-[var(--color-metallic-gold-shadow)]/40 shadow-2xl z-20 rounded-sm overflow-hidden flex flex-col"
                      >
                        <a
                          href={googleCalendarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-left px-5 py-4 text-[11px] font-medium tracking-[0.15em] text-brand-text-secondary hover:text-brand-ivory hover:bg-brand-border/40 uppercase transition-colors outline-none focus:bg-brand-border/40 flex items-center justify-between"
                          onClick={() => setShowOptions(false)}
                        >
                          Google Calendar
                          <ExternalLink className="w-3 h-3 opacity-50" />
                        </a>
                        <div className="h-px w-full bg-[var(--color-metallic-gold-shadow)]/20" />
                        <button
                          onClick={handleDownloadICS}
                          className="text-left px-5 py-4 text-[11px] font-medium tracking-[0.15em] text-brand-text-secondary hover:text-brand-ivory hover:bg-brand-border/40 uppercase transition-colors outline-none focus:bg-brand-border/40 flex items-center justify-between"
                        >
                          Apple Calendar
                          <Download className="w-3 h-3 opacity-50" />
                        </button>
                        <div className="h-px w-full bg-[var(--color-metallic-gold-shadow)]/20" />
                        <a
                          href={outlookCalendarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-left px-5 py-4 text-[11px] font-medium tracking-[0.15em] text-brand-text-secondary hover:text-brand-ivory hover:bg-brand-border/40 uppercase transition-colors outline-none focus:bg-brand-border/40 flex items-center justify-between"
                          onClick={() => setShowOptions(false)}
                        >
                          Outlook
                          <ExternalLink className="w-3 h-3 opacity-50" />
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Contact Secondary Option */}
            <div className="w-full pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <span className="text-[11px] font-medium tracking-[0.1em] text-brand-text-secondary uppercase">
                HAVE AN IDEA OR WANT TO WORK WITH AIRNAL?
              </span>
              <button
                onClick={handleContactUs}
                className="text-[12px] font-semibold tracking-[0.2em] text-brand-ivory hover:text-metallic uppercase transition-colors text-left flex items-center group/link outline-none focus:text-metallic focus-visible:ring-2 focus-visible:ring-[var(--color-metallic-gold-mid)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#101010] rounded-sm py-1"
              >
                CONTACT AIRNAL
                <div className="relative ml-2 overflow-hidden w-4 h-4 flex items-center">
                  <span className="absolute transform -translate-x-full opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all duration-300 text-[var(--color-metallic-gold-mid)]">→</span>
                  <span className="absolute transform translate-x-0 opacity-100 group-hover/link:translate-x-full group-hover/link:opacity-0 transition-all duration-300 text-brand-ivory">→</span>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
