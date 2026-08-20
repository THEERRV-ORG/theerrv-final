import { Cinema } from "@/components/Cinema";
import { Nav } from "@/components/Nav";
import { Preloader } from "@/components/Preloader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { About } from "@/components/sections/About";
import { Capabilities } from "@/components/sections/Capabilities";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Story } from "@/components/sections/Story";

/**
 * Page rhythm: ink, white, white, subtle, white, ink, ink.
 *
 * The reference site's shape — loader, immersive hero, sequential value panels,
 * footer — held onto the Theerrv design system, where ink sections carry the
 * editorial weight and the white canvas does the reading. The 3D lives only in
 * the opening ink block, which is where the system already allows the page to
 * raise its voice.
 */
export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />

      <a href="#main" className="sr-only skip-link">
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Cinema />
        <Capabilities />
        <About />
        <Story />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
