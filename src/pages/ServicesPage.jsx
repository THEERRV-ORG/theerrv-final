import ServicesShowcase from "../components/page/ServicesShowcase";
import FAQ from "../components/page/FAQ";
import CTABand from "../components/page/CTABand";
import usePageTitle from "../hooks/usePageTitle";
import { servicesPage } from "../data/content";

export default function ServicesPage() {
  usePageTitle(servicesPage.seoTitle);
  const { showcase, cta, faqs } = servicesPage;

  return (
    <>
      <ServicesShowcase showcase={showcase} />
      <FAQ eyebrow={faqs.eyebrow} heading={faqs.heading} items={faqs.items} />
      <CTABand heading={cta.heading} body={cta.body} label={cta.label} to={cta.to} />
    </>
  );
}
