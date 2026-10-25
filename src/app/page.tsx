import { Navbar } from "@/components/Navbar";
import { CinematicHero } from "@/components/CinematicHero";
import { Intro } from "@/components/Intro";
import { Pillars } from "@/components/Pillars";
import { Process } from "@/components/Process";
import { Philosophy } from "@/components/Philosophy";
import { Products } from "@/components/Products";
import { Solutions } from "@/components/Solutions";
import { Founder } from "@/components/Founder";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { LaunchModal } from "@/components/LaunchModal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <CinematicHero />
        <Intro />
        <Pillars />
        <Process />
        <Philosophy />
        <Products />
        <Solutions />
        <Founder />
        <Contact />
      </main>
      <Footer />
      <LaunchModal />
    </>
  );
}
