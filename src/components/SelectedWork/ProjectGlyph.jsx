const GLYPHS = {
  0: (
    // operations dashboard
    <>
      <rect x="8" y="10" width="32" height="20" rx="3" />
      <line x1="8" y1="18" x2="40" y2="18" />
      <circle cx="14" cy="14" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="19" cy="14" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  1: (
    // BI bar chart
    <>
      <line x1="8" y1="34" x2="40" y2="34" />
      <rect x="12" y="20" width="5" height="14" />
      <rect x="21.5" y="12" width="5" height="22" />
      <rect x="31" y="24" width="5" height="10" />
    </>
  ),
  2: (
    // connected nodes
    <>
      <circle cx="12" cy="14" r="3.2" />
      <circle cx="36" cy="14" r="3.2" />
      <circle cx="24" cy="34" r="3.2" />
      <line x1="14.7" y1="16" x2="21.6" y2="31.5" />
      <line x1="33.3" y1="16" x2="26.4" y2="31.5" />
      <line x1="15.2" y1="14" x2="32.8" y2="14" />
    </>
  ),
};

export default function ProjectGlyph({ index = 0 }) {
  return (
    <svg
      className="glyph"
      viewBox="0 0 48 48"
      width="34"
      height="34"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {GLYPHS[index % 3]}
    </svg>
  );
}
