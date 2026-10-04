import Link from "next/link";

const NAV_LINKS = [
  { name: "Products", href: "#products" },
  { name: "Solutions", href: "#solutions" },
  { name: "Vision", href: "#vision" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="bg-brand-bg relative border-t border-brand-border">
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-8">

          {/* Brand */}
          <div className="flex flex-col gap-6 md:max-w-sm">
            <span className="text-xl font-medium tracking-[0.2em] text-brand-ivory">
              AIRNAL
            </span>
            <p className="text-[13px] text-brand-text-secondary leading-relaxed tracking-wide">
              AI that turns ideas into reality.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[13px] tracking-wide text-brand-text-secondary hover:text-metallic transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] tracking-[0.1em] text-brand-text-muted uppercase">
            © 2027 AIRNAL. All rights reserved.
          </p>
          <a
            href="https://airnal.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[0.1em] text-brand-text-muted hover:text-metallic uppercase transition-colors"
          >
            airnal.in
          </a>
        </div>
      </div>
    </footer>
  );
}
