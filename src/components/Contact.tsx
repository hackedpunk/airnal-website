"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const email = "airnal.business@gmail.com";
  const subject = "A conversation with AIRNAL";
  const body = `Hi AIRNAL,

I came across AIRNAL and would like to discuss an idea, project, or opportunity.

Best,
[Your Name]`;

  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodedSubject}&body=${encodedBody}`;
  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${email}&subject=${encodedSubject}&body=${encodedBody}`;
  const mailtoUrl = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
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
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <section id="contact" className="py-32 md:py-56 relative border-t border-brand-border bg-brand-bg overflow-hidden">

      {/* Background abstract element (very subtle cinematic glow) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-[50%] -translate-x-1/2 w-[800px] h-[600px] bg-brand-ivory rounded-full blur-[200px] opacity-[0.02] mix-blend-screen" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="text-[11px] font-semibold tracking-[0.25em] uppercase">
              <span className="text-metallic">08</span>
              <span className="text-brand-text-muted mx-1">/</span>
              <span className="text-brand-ivory">CONTACT</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-brand-text leading-[1.05] mb-8">
              Have an idea<br /> worth building?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-xl md:text-2xl text-brand-text-secondary font-light mb-16">
              Let&apos;s build something intelligent.
            </p>
          </motion.div>

          {/* Email Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-14"
          >
            <div className="text-2xl md:text-3xl font-medium tracking-wide text-brand-ivory">
              {email}
            </div>
          </motion.div>

          {/* Contact Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            {/* Primary: GMAIL */}
            <a
              href={gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Gmail"
              className="group w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 text-[12px] font-medium tracking-[0.1em] text-brand-bg bg-brand-ivory hover:bg-metallic hover:-translate-y-[1px] transition-all duration-300 rounded-[2px]"
            >
              OPEN GMAIL
              <ArrowRight className="ml-3 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary: OUTLOOK */}
            <a
              href={outlookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Outlook"
              className="group w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 text-[12px] font-medium tracking-[0.1em] text-brand-ivory border border-[var(--color-metallic-gold-shadow)]/40 hover:border-[var(--color-metallic-gold-mid)] bg-transparent hover:-translate-y-[1px] transition-all duration-300 rounded-[2px]"
            >
              OPEN OUTLOOK
              <ArrowRight className="ml-3 w-4 h-4 transform group-hover:translate-x-1 transition-transform opacity-70" />
            </a>

            {/* Tertiary: COPY */}
            <button
              onClick={handleCopy}
              aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
              className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-5 text-[12px] font-medium tracking-[0.1em] text-brand-text-secondary hover:text-brand-ivory bg-transparent hover:-translate-y-[1px] transition-all duration-300 rounded-[2px] focus:outline-none focus:ring-1 focus:ring-[var(--color-metallic-gold-mid)] focus:ring-offset-1 focus:ring-offset-[#101010]"
            >
              {copied ? "EMAIL COPIED" : "COPY EMAIL"}
            </button>
          </motion.div>

          {/* Contact Placeholders */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-32 pt-16 border-t border-brand-border w-full flex flex-col sm:flex-row justify-center gap-10 sm:gap-20"
          >
            {[
              { label: "Official Email", href: mailtoUrl },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/arsalan-safdar-131748408" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label === "LinkedIn" ? "_blank" : undefined}
                rel={link.label === "LinkedIn" ? "noopener noreferrer" : undefined}
                className="text-[11px] font-semibold tracking-[0.25em] text-brand-text-secondary hover:text-metallic uppercase transition-colors focus:outline-none focus:text-metallic"
              >
                {link.label}
              </a>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
