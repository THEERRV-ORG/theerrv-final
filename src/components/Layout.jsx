import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

/**
 * App shell shared by every route: fixed grain overlay, navbar, the routed
 * page via <Outlet />, and footer. Resets scroll position on each navigation —
 * or, when the URL carries a hash (e.g. /contact#location from the footer),
 * scrolls that section into view instead. React Router does not do this on its
 * own, and the hash may change while the pathname stays put, so both are
 * dependencies.
 */
export default function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // On a cold load the target may not be in the DOM yet, and the page keeps
    // growing as fonts and sections settle — so poll briefly for the element,
    // then re-assert the position once layout has stopped moving.
    //
    // `behavior: "instant"` is deliberate: the global `scroll-behavior: smooth`
    // makes a scroll issued during a route change silently do nothing, so the
    // section would never be reached. Landing directly on it is also the right
    // feel for a cross-page jump.
    let cancelled = false;
    let timer;

    const scrollToHash = (attempt = 0) => {
      if (cancelled) return;
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ block: "start", behavior: "instant" });
        if (attempt === 0) timer = setTimeout(() => scrollToHash(1), 320);
      } else if (attempt < 12) {
        timer = setTimeout(() => scrollToHash(attempt), 60);
      }
    };

    timer = setTimeout(scrollToHash, 60);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pathname, hash]);

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <Navbar />
      <main>
        {/* Page chunks load here; the navbar and footer stay mounted. The
            fallback reserves a full viewport of height so the footer stays
            below the fold while a chunk arrives — otherwise it would paint
            directly under the navbar and then jump down when content loads
            (a visible layout shift). Purely a spacer: no spinner to flash on
            the fast chunks, aria-hidden so it's silent to assistive tech. */}
        <Suspense fallback={<div className="route-fallback" aria-hidden="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
