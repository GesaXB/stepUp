// Simple SVG abstract representations of popular collab brands 
// Used purely as stylistic technical ornaments

export const AdidasLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <polygon points="15,80 35,40 50,40 30,80" />
    <polygon points="40,80 60,20 75,20 55,80" />
    <polygon points="65,80 85,0 100,0 80,80" />
  </svg>
);

export const OffWhiteLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="8" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 20 L80 80 M80 20 L20 80" />
    <path d="M65 20 L80 20 L80 35" />
    <path d="M20 65 L20 80 L35 80" />
    <path d="M20 35 L20 20 L35 20" />
    <path d="M80 65 L80 80 L65 80" />
  </svg>
);

export const NikeLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M10,65 Q35,85 95,20 Q65,65 10,65 Z" />
  </svg>
);

export const FogLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <text x="50" y="65" fontSize="48" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="-2">FOG</text>
  </svg>
);
