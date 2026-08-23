import PageHero from "../components/page/PageHero";
import CTABand from "../components/page/CTABand";
import usePageTitle from "../hooks/usePageTitle";

export default function NotFoundPage() {
  usePageTitle("Page Not Found | Theerrv Technologies");

  return (
    <>
      <PageHero
        eyebrow="Error 404"
        headline={["Page", "Not Found."]}
        lead="The page you're looking for doesn't exist or may have moved. Let's get you back on track."
      />
      <CTABand
        heading="Looking for something specific?"
        body="Head back home or get in touch and we'll point you in the right direction."
        label="Back to Home"
        to="/"
      />
    </>
  );
}
