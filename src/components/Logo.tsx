import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "w-8 h-8" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="url(#ai-gradient)" />
      
      {/* Tech orbit/arc */}
      <path d="M11 9A10 10 0 0 1 23 21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.3" strokeDasharray="2 3"/>
      <path d="M21 9A10 10 0 0 0 9 21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.15" strokeDasharray="2 3"/>
      
      {/* Neural network / Checkmark hybrid */}
      <path d="M9 16.5L13.5 21L23 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="23" cy="11" r="2" fill="white"/>
      <circle cx="9" cy="16.5" r="1.5" fill="white" fillOpacity="0.9"/>
      <circle cx="13.5" cy="21" r="1.5" fill="white" fillOpacity="0.9"/>
      
      <defs>
        <linearGradient id="ai-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F46E5" /> {/* indigo-600 */}
          <stop offset="1" stopColor="#7C3AED" /> {/* violet-600 */}
        </linearGradient>
      </defs>
    </svg>
  );
}
