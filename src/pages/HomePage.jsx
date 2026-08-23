import Hero from "../components/Hero/Hero";
import Intro from "../components/Intro/Intro";
import Capabilities from "../components/Capabilities/Capabilities";
import Philosophy from "../components/Philosophy/Philosophy";
import Technology from "../components/Technology/Technology";
import SelectedWork from "../components/SelectedWork/SelectedWork";
import FAQ from "../components/page/FAQ";
import CTABand from "../components/page/CTABand";
import { homeFaqs, finalCta } from "../data/content";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Capabilities />
      <Philosophy />
      <Technology />
      <SelectedWork />
      <FAQ eyebrow={homeFaqs.eyebrow} heading={homeFaqs.heading} items={homeFaqs.items} />
      <CTABand
        title={finalCta.title}
        body={finalCta.body}
        primary={finalCta.cta}
        secondary={finalCta.secondary}
        email={finalCta.email}
      />
    </>
  );
}
