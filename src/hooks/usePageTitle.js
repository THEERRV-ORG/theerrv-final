import { useEffect } from "react";

/**
 * Sets document.title for the current route and keeps the meta description,
 * canonical URL, and the Open Graph / Twitter title, description and URL in sync
 * with it — restoring the previous values on unmount. Non-JS crawlers read the
 * homepage defaults baked into index.html; JS-rendering crawlers (Google) get
 * the correct per-route values from here.
 *
 * Pass a unique `description` per route: without it every page inherits the
 * homepage meta description, which hurts search relevance and click-through.
 */
export default function usePageTitle(title, description) {
  useEffect(() => {
    if (!title) return;

    const url = window.location.origin + window.location.pathname;
    const targets = [
      ['link[rel="canonical"]', "href", url],
      ['meta[property="og:url"]', "content", url],
      ['meta[property="og:title"]', "content", title],
      ['meta[name="twitter:title"]', "content", title],
    ];
    if (description) {
      targets.push(
        ['meta[name="description"]', "content", description],
        ['meta[property="og:description"]', "content", description],
        ['meta[name="twitter:description"]', "content", description],
      );
    }

    const previousTitle = document.title;
    document.title = title;

    // Snapshot + apply each meta/link, remembering the prior value to restore.
    const restores = [];
    for (const [selector, attr, value] of targets) {
      const el = document.querySelector(selector);
      if (!el) continue;
      restores.push([el, attr, el.getAttribute(attr)]);
      el.setAttribute(attr, value);
    }

    return () => {
      document.title = previousTitle;
      for (const [el, attr, prev] of restores) {
        if (prev !== null) el.setAttribute(attr, prev);
      }
    };
  }, [title, description]);
}
