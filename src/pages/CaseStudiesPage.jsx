import PageHero from "../components/page/PageHero";
import CardGrid from "../components/page/CardGrid";
import CTABand from "../components/page/CTABand";
import usePageTitle from "../hooks/usePageTitle";
import { caseStudiesPage } from "../data/content";

export default function CaseStudiesPage() {
  usePageTitle(caseStudiesPage.seoTitle);
  const { hero, note, blocks, cta } = caseStudiesPage;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} headline={hero.headline} lead={hero.lead} />
      <CardGrid items={blocks} note={note} columns={2} />
      <CTABand heading={cta.heading} body={cta.body} label={cta.label} to={cta.to} />
    </>
  );
}
