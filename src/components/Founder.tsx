"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export function Founder() {
  const [emailMenuOpen, setEmailMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const email = "airnal.business@gmail.com";
  const subject = "A conversation with AIRNAL";
  const body = `Hi AIRNAL,\n\nI came across AIRNAL and would like to discuss an idea, project, or opportunity.\n\nBest,\n[Your Name]`;

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setEmailMenuOpen(false);
      }
    };
    if (emailMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emailMenuOpen]);

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
          setEmailMenuOpen(false);
        }, 1500);
      }).catch(() => {
        fallbackCopyTextToClipboard(email);
      });
    } else {
      fallbackCopyTextToClipboard(email);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    if (typeof document === "undefined") return;
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setEmailMenuOpen(false);
      }, 1500);
    } catch {
      alert(`Email address: ${text}`);
      setEmailMenuOpen(false);
    }
    document.body.removeChild(textArea);
  };

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
            className="flex gap-8 justify-center items-center relative"
          >
            <a
              href="https://www.linkedin.com/in/arsalan-safdar-131748408"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] tracking-widest text-brand-text-secondary hover:text-metallic transition-all duration-300 border-b border-[var(--color-metallic-gold-shadow)]/40 hover:border-[var(--color-metallic-gold-mid)] uppercase hover:-translate-y-px pb-1"
            >
              LinkedIn
            </a>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setEmailMenuOpen(!emailMenuOpen)}
                aria-expanded={emailMenuOpen}
                aria-haspopup="true"
                className="text-[13px] tracking-widest text-brand-text-secondary hover:text-metallic transition-all duration-300 border-b border-[var(--color-metallic-gold-shadow)]/40 hover:border-[var(--color-metallic-gold-mid)] uppercase hover:-translate-y-px pb-1 outline-none"
              >
                Email
              </button>

              <AnimatePresence>
                {emailMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-brand-elevated border border-[var(--color-metallic-gold-shadow)]/40 shadow-2xl z-20 rounded-sm overflow-hidden flex flex-col w-48 text-left"
                  >
                    <a
                      href={gmailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 text-[11px] font-medium tracking-[0.15em] text-brand-text-secondary hover:text-brand-ivory hover:bg-brand-border/40 uppercase transition-colors outline-none flex items-center justify-between"
                      onClick={() => setEmailMenuOpen(false)}
                    >
                      Open Gmail
                      <span className="text-[10px] opacity-60">↗</span>
                    </a>
                    <div className="h-px w-full bg-[var(--color-metallic-gold-shadow)]/20" />
                    <button
                      onClick={handleCopyEmail}
                      className="px-4 py-3 text-[11px] font-medium tracking-[0.15em] text-brand-text-secondary hover:text-brand-ivory hover:bg-brand-border/40 uppercase transition-colors outline-none flex items-center justify-between w-full text-left"
                    >
                      {copied ? "Email Copied!" : "Copy Email"}
                      <span className="text-[10px] opacity-60">{copied ? "✓" : "📋"}</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
