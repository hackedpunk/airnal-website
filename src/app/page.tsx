import { Navbar } from "@/components/Navbar";
import { CinematicHero } from "@/components/CinematicHero";
import { Intro } from "@/components/Intro";
import { Pillars } from "@/components/Pillars";
import { Founder } from "@/components/Founder";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <CinematicHero />
        <Intro />
        <Pillars />
        <Founder />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
