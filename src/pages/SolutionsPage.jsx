import PageHero from "../components/page/PageHero";
import DetailList from "../components/page/DetailList";
import FAQ from "../components/page/FAQ";
import CTABand from "../components/page/CTABand";
import usePageTitle from "../hooks/usePageTitle";
import { solutionsPage } from "../data/content";

export default function SolutionsPage() {
  usePageTitle(solutionsPage.seoTitle);
  const { hero, items, cta, faqs } = solutionsPage;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} headline={hero.headline} lead={hero.lead} />
      <DetailList items={items} />
      <FAQ eyebrow={faqs.eyebrow} heading={faqs.heading} items={faqs.items} />
      <CTABand heading={cta.heading} body={cta.body} label={cta.label} to={cta.to} />
    </>
  );
}
