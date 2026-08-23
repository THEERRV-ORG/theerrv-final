import PageHero from "../components/page/PageHero";
import CardGrid from "../components/page/CardGrid";
import CTABand from "../components/page/CTABand";
import usePageTitle from "../hooks/usePageTitle";
import { locationsPage } from "../data/content";

export default function LocationsPage() {
  usePageTitle(locationsPage.seoTitle);
  const { hero, blocks, cta } = locationsPage;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} headline={hero.headline} lead={hero.lead} />
      <CardGrid items={blocks} columns={3} />
      <CTABand heading={cta.heading} body={cta.body} label={cta.label} to={cta.to} />
    </>
  );
}
