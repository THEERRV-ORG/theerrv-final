import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Intro from "./components/Intro/Intro";
import Capabilities from "./components/Capabilities/Capabilities";
import Philosophy from "./components/Philosophy/Philosophy";
import Technology from "./components/Technology/Technology";
import SelectedWork from "./components/SelectedWork/SelectedWork";
import FinalCTA from "./components/FinalCTA/FinalCTA";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Capabilities />
        <Philosophy />
        <Technology />
        <SelectedWork />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
