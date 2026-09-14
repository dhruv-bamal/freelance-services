/**
 * The hero's animated backdrop.
 *
 * Concentric arcs on slow, opposed rotation, centred behind the portrait.
 *
 * WHY ARCS AND NOT A PARTICLE FIELD
 * A drifting node-and-line network is the default backdrop on every AI-generated
 * landing page, and it means nothing. Rings centred on the portrait read as reach
 * — a signal going out from a person — which is what the page is actually about.
 *
 * WHY IT IS CHEAP
 * Every moving part is a `rotate` on a <g>, which the compositor handles on its
 * own thread: no layout, no paint, no JavaScript, and no per-frame work on the
 * main thread. The alternative — animating stroke-dashoffset, as most SVG
 * backdrops do — repaints the whole path every frame.
 *
 * The arcs are broken by stroke-dasharray rather than drawn as separate paths, so
 * the whole thing is five <circle> elements. It is masked to fade at the edges,
 * pointer-events: none so it can never intercept a click, and aria-hidden because
 * it carries no information.
 *
 * Under reduced motion the rotation simply stops; the geometry stays, because it
 * is a composition, not an effect.
 */
/**
 * Opacity falls with radius so the whole field reads as one object receding,
 * rather than five rings of equal weight fighting each other.
 */
const RINGS = [
  { r: 150, dash: '180 90',  width: 1.2, opacity: 0.38, spin: 'spin-a' },
  { r: 232, dash: '60 140',  width: 1.2, opacity: 0.32, spin: 'spin-b' },
  { r: 318, dash: '320 200', width: 1.4, opacity: 0.26, spin: 'spin-c' },
  { r: 410, dash: '40 120',  width: 1.2, opacity: 0.2,  spin: 'spin-d' },
  { r: 508, dash: '600 360', width: 1.2, opacity: 0.14, spin: 'spin-e' },
];

/** Small marks riding the rings, so the rotation is readable at all. */
const MARKS = [
  { r: 150, angle: 18, size: 3.5, spin: 'spin-a', opacity: 0.8 },
  { r: 232, angle: 205, size: 3, spin: 'spin-b', opacity: 0.68 },
  { r: 318, angle: 96, size: 4, spin: 'spin-c', opacity: 0.55 },
  { r: 410, angle: 300, size: 3, spin: 'spin-d', opacity: 0.42 },
];

const CX = 880;
const CY = 320;

export function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="hero-backdrop pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        focusable="false"
      >
        {RINGS.map((ring) => (
          <g key={ring.r} className={ring.spin} style={{ transformOrigin: `${CX}px ${CY}px` }}>
            <circle
              cx={CX}
              cy={CY}
              r={ring.r}
              fill="none"
              stroke="var(--color-indigo)"
              strokeWidth={ring.width}
              strokeDasharray={ring.dash}
              strokeLinecap="round"
              opacity={ring.opacity}
            />
          </g>
        ))}

        {MARKS.map((mark) => {
          const rad = (mark.angle * Math.PI) / 180;
          return (
            <g
              key={`${mark.r}-${mark.angle}`}
              className={mark.spin}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
            >
              <circle
                cx={CX + Math.cos(rad) * mark.r}
                cy={CY + Math.sin(rad) * mark.r}
                r={mark.size}
                fill="var(--color-indigo)"
                opacity={mark.opacity}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
