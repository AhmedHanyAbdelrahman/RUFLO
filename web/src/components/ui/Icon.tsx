export type IconName =
  | "target"
  | "database"
  | "signal"
  | "shield-check"
  | "route"
  | "cpu"
  | "shield"
  | "bar-chart"
  | "users"
  | "refresh"
  | "filter"
  | "zap"
  | "heart"
  | "building"
  | "expand"
  | "check"
  | "x"
  | "layers"
  | "globe"
  | "arrow-loop";

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const paths: Record<IconName, React.ReactNode> = {
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
      <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
    </>
  ),
  signal: (
    <>
      <line x1="5" y1="17" x2="5" y2="13" />
      <line x1="10.5" y1="17" x2="10.5" y2="9" />
      <line x1="16" y1="17" x2="16" y2="5" />
      <line x1="21" y1="17" x2="21" y2="12" />
    </>
  ),
  "shield-check": (
    <>
      <path d="M12 3l7 3v5.5c0 4.2-2.9 7.7-7 8.5-4.1-.8-7-4.3-7-8.5V6l7-3z" />
      <path d="M8.7 12l2.2 2.2 4.4-4.4" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="18" r="2.2" />
      <path d="M6 8.2V11a4 4 0 0 0 4 4h4a4 4 0 0 1 4 4" />
    </>
  ),
  cpu: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <rect x="10.5" y="10.5" width="3" height="3" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
    </>
  ),
  shield: <path d="M12 3l7 3v5.5c0 4.2-2.9 7.7-7 8.5-4.1-.8-7-4.3-7-8.5V6l7-3z" />,
  "bar-chart": (
    <>
      <line x1="5" y1="20" x2="5" y2="14" />
      <line x1="12" y1="20" x2="12" y2="8" />
      <line x1="19" y1="20" x2="19" y2="4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17.5" cy="9" r="2.3" />
      <path d="M15.6 14.2c2.6.3 4.6 2.5 4.9 5.3" />
    </>
  ),
  refresh: (
    <>
      <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
      <path d="M18 3v4h-4" />
      <path d="M6 21v-4h4" />
    </>
  ),
  filter: <path d="M4 5h16l-6 7v6l-4 2v-8L4 5z" />,
  zap: <path d="M13 3 5 14h5l-1 7 8-11h-5l1-7z" />,
  heart: <path d="M12 20s-7-4.4-9.5-9A5.4 5.4 0 0 1 12 6a5.4 5.4 0 0 1 9.5 5c-2.5 4.6-9.5 9-9.5 9z" />,
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <line x1="9" y1="7" x2="9" y2="7.01" />
      <line x1="15" y1="7" x2="15" y2="7.01" />
      <line x1="9" y1="11" x2="9" y2="11.01" />
      <line x1="15" y1="11" x2="15" y2="11.01" />
      <line x1="9" y1="15" x2="9" y2="15.01" />
      <line x1="15" y1="15" x2="15" y2="15.01" />
    </>
  ),
  expand: (
    <>
      <path d="M9 3H3v6" />
      <path d="M15 21h6v-6" />
      <path d="M21 3l-8 8" />
      <path d="M3 21l8-8" />
    </>
  ),
  check: <path d="M4 12l5 5L20 6" />,
  x: <path d="M5 5l14 14M19 5 5 19" />,
  layers: (
    <>
      <path d="M12 3 3 8l9 5 9-5-9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.4 2.3 3.7 5.3 3.7 8.5s-1.3 6.2-3.7 8.5c-2.4-2.3-3.7-5.3-3.7-8.5S9.6 5.8 12 3.5z" />
    </>
  ),
  "arrow-loop": (
    <>
      <path d="M4 12a8 8 0 0 1 13.5-5.8" />
      <path d="M20 12a8 8 0 0 1-13.5 5.8" />
      <path d="M16 4.5l1.7 1.7L16 8" />
      <path d="M8 19.5l-1.7-1.7L8 16" />
    </>
  ),
};

export function Icon({
  name,
  className = "h-6 w-6",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...strokeProps}>
      {paths[name]}
    </svg>
  );
}
