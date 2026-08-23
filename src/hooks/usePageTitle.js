import { useEffect } from "react";

/**
 * Sets document.title for the current route and restores the previous title on
 * unmount, so each page contributes its own SEO title without a router loader.
 */
export default function usePageTitle(title) {
  useEffect(() => {
    if (!title) return;
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
