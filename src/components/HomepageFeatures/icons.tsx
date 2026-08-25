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

export function CompassIcon({className}: IconProps): ReactNode {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </svg>
  );
}

export function CheckBadgeIcon({className}: IconProps): ReactNode {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 3l2.1 1.2 2.4-.3 1.2 2.1 2.1 1.2-.3 2.4 1.2 2.1-1.2 2.1.3 2.4-2.1 1.2-1.2 2.1-2.4-.3L12 21l-2.1-1.2-2.4.3-1.2-2.1-2.1-1.2.3-2.4L3 12l1.2-2.1-.3-2.4 2.1-1.2 1.2-2.1 2.4.3L12 3z" />
      <path d="M9 12.5l2 2 4-4.5" />
    </svg>
  );
}

export function ArchiveIcon({className}: IconProps): ReactNode {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3.5" y="4" width="17" height="4.5" rx="1.2" />
      <path d="M4.5 8.5v9.3a1.7 1.7 0 001.7 1.7h11.6a1.7 1.7 0 001.7-1.7V8.5" />
      <path d="M10 12.5h4" />
    </svg>
  );
}

export function BookOpenIcon({className}: IconProps): ReactNode {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 6.5c-1.6-1.2-4-1.7-6.5-1.5v12.5c2.5-.2 4.9.3 6.5 1.5" />
      <path d="M12 6.5c1.6-1.2 4-1.7 6.5-1.5v12.5c-2.5-.2-4.9.3-6.5 1.5" />
      <path d="M12 6.5v13" />
    </svg>
  );
}

export function BoltIcon({className}: IconProps): ReactNode {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12.5 3.5l-7 10h5.5l-1 7 7-10h-5.5l1-7z" />
    </svg>
  );
}

export function FeatherIcon({className}: IconProps): ReactNode {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M20.5 3.5c-5 0-13 3-15.5 10.5C4.3 16.8 5 19 6.5 20.2 8.5 22 11 21.5 13.5 19 21 16.5 20.5 3.5 20.5 3.5z" />
      <path d="M11 19L20.5 3.5" />
      <path d="M8 15l3.5-3.5" />
    </svg>
  );
}
