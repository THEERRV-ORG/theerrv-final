/**
 * Line icons for the Services showcase, drawn on a 24×24 grid with the current
 * text color so each tile can tint its own icon.
 */
const PATHS = {
  software: (
    // cube
    <>
      <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7z" />
      <path d="M3.5 7 12 11.5 20.5 7" />
      <path d="M12 11.5V21.5" />
    </>
  ),
  dotnet: (
    // code brackets
    <>
      <path d="M8.5 8 4.5 12l4 4" />
      <path d="M15.5 8l4 4-4 4" />
      <path d="M13 5.5 11 18.5" />
    </>
  ),
  backend: (
    // stacked nodes
    <>
      <rect x="9" y="3.5" width="6" height="6" rx="1.4" />
      <rect x="3.5" y="14.5" width="6" height="6" rx="1.4" />
      <rect x="14.5" y="14.5" width="6" height="6" rx="1.4" />
      <path d="M12 9.5v3M12 12.5H6.5v2M12 12.5h5.5v2" />
    </>
  ),
  cloud: (
    // cloud
    <>
      <path d="M7.5 18.5a4 4 0 0 1-.5-7.97 5.5 5.5 0 0 1 10.6 1.05A3.75 3.75 0 0 1 17 18.5z" />
    </>
  ),
  modernize: (
    // refresh / circular arrows
    <>
      <path d="M19 12a7 7 0 0 1-11.9 5" />
      <path d="M5 12a7 7 0 0 1 11.9-5" />
      <path d="M17 3.5V7.5H13" />
      <path d="M7 20.5V16.5H11" />
    </>
  ),
  data: (
    // bar chart
    <>
      <path d="M4 20h16" />
      <rect x="6" y="11" width="3" height="6" rx="0.6" />
      <rect x="10.5" y="7" width="3" height="10" rx="0.6" />
      <rect x="15" y="13" width="3" height="4" rx="0.6" />
    </>
  ),
  ai: (
    // spark
    <>
      <path d="M12 3.5l1.8 5.2 5.2 1.8-5.2 1.8L12 17.5l-1.8-5.2L5 10.5l5.2-1.8z" />
      <circle cx="18.5" cy="17.5" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  devops: (
    // infinity loop
    <>
      <path d="M8 12a3 3 0 1 0-3 3c1.7 0 2.6-1.3 3.6-2.6l2.8-3.8C15.4 6 16.3 5 18 5a3 3 0 1 1 0 6c-1.7 0-2.6-1-3.6-2.4" />
    </>
  ),
};

export default function ServiceIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name] ?? PATHS.software}
    </svg>
  );
}
