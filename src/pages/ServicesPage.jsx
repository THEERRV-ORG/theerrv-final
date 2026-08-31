import ServicesShowcase from "../components/page/ServicesShowcase";
import CTABand from "../components/page/CTABand";
import usePageTitle from "../hooks/usePageTitle";
import { servicesPage } from "../data/content";

export default function ServicesPage() {
  usePageTitle(servicesPage.seoTitle);
  const { showcase, cta } = servicesPage;

  return (
    <>
      <ServicesShowcase showcase={showcase} />
      <CTABand heading={cta.heading} body={cta.body} label={cta.label} to={cta.to} />
    </>
  );
}
