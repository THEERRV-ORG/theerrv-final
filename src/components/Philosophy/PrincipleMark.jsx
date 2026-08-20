const MARKS = {
  "01": (
    // Foundation — base plinth
    <>
      <line x1="6" y1="40" x2="42" y2="40" />
      <line x1="10" y1="40" x2="10" y2="14" />
      <line x1="24" y1="40" x2="24" y2="14" />
      <line x1="38" y1="40" x2="38" y2="14" />
      <line x1="4" y1="46" x2="44" y2="46" />
    </>
  ),
  "02": (
    // Structure — stacked frame
    <>
      <rect x="8" y="8" width="32" height="15" />
      <rect x="8" y="25" width="32" height="15" />
      <line x1="24" y1="8" x2="24" y2="40" />
    </>
  ),
  "03": (
    // Precision — compass mark
    <>
      <circle cx="24" cy="24" r="16" />
      <line x1="24" y1="2" x2="24" y2="10" />
      <line x1="24" y1="38" x2="24" y2="46" />
      <line x1="2" y1="24" x2="10" y2="24" />
      <line x1="38" y1="24" x2="46" y2="24" />
      <circle cx="24" cy="24" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
};

export default function PrincipleMark({ index }) {
  return (
    <svg className="mark" viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      {MARKS[index]}
    </svg>
  );
}
