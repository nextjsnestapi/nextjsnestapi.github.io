import type {ReactNode} from 'react';

type IconProps = {className?: string};

const base = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function ShieldCheckIcon({className}: IconProps): ReactNode {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 3l7 3v5.5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4.5" />
    </svg>
  );
}

export function ShapesIcon({className}: IconProps): ReactNode {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <circle cx="17.5" cy="7.5" r="3.5" />
      <path d="M4 20l3.5-7 3.5 7z" />
    </svg>
  );
}

export function ListSearchIcon({className}: IconProps): ReactNode {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 6h11" />
      <path d="M4 12h7" />
      <path d="M4 18h5" />
      <circle cx="17" cy="16" r="3" />
      <path d="M19.3 18.3L21.5 20.5" />
    </svg>
  );
}

export function LayersIcon({className}: IconProps): ReactNode {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" />
      <path d="M4 12.5l8 4.5 8-4.5" />
      <path d="M4 16.5l8 4.5 8-4.5" />
    </svg>
  );
}

export function DocSyncIcon({className}: IconProps): ReactNode {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M7 3.5h7l3 3v13.5a1 1 0 01-1 1H7a1 1 0 01-1-1V4.5a1 1 0 011-1z" />
      <path d="M14 3.5V7h3.5" />
      <path d="M9 13.5a3 3 0 015-2.2" />
      <path d="M15 15.5a3 3 0 01-5 2.2" />
      <path d="M13.7 10.5l.6.8-.6.8" />
      <path d="M10.3 17.5l-.6-.8.6-.8" />
    </svg>
  );
}

export function TerminalIcon({className}: IconProps): ReactNode {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M7 9.5l3 2.75-3 2.75" />
      <path d="M12.5 15h4.5" />
    </svg>
  );
}
