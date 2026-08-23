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
    // automation loop
    <>
      <path d="M14 18a12 12 0 0 1 20-4" />
      <path d="M34 30a12 12 0 0 1-20 4" />
      <path d="M34 8v8h-8" />
      <path d="M14 40v-8h8" />
    </>
  ),
  3: (
    // performance / speed
    <>
      <path d="M24 8a16 16 0 1 0 12 5.5" />
      <line x1="24" y1="24" x2="33" y2="15" />
      <circle cx="24" cy="24" r="1.8" fill="currentColor" stroke="none" />
    </>
  ),
  4: (
    // AI spark
    <>
      <path d="M24 10l3.2 8.8L36 22l-8.8 3.2L24 34l-3.2-8.8L12 22l8.8-3.2z" />
      <circle cx="35" cy="34" r="1.6" fill="currentColor" stroke="none" />
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
      {GLYPHS[index % 5]}
    </svg>
  );
}
