import React from "react";

/**
 * VidFetch Custom Brand Icon
 * Features a modern bold 'V' seamlessly integrated with a high-speed downward Download Arrow (⬇).
 * Palette: Electric Blue (#0056b3) + Neon Mint / Cyan (#00d2ff).
 */
export function VidFetchIcon({ className = "w-10 h-10" }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="vidfetch-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0056b3" />
          <stop offset="100%" stopColor="#00d2ff" />
        </linearGradient>
        <linearGradient id="vidfetch-arrow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e0f7ff" />
        </linearGradient>
        <filter id="vidfetch-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0056b3" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Rounded Squircle Container */}
      <rect
        width="40"
        height="40"
        rx="11"
        fill="url(#vidfetch-bg)"
        filter="url(#vidfetch-glow)"
      />

      {/* Geometric 'V' Outer Wings */}
      <path
        d="M8.5 10.5L20 28.5L31.5 10.5"
        stroke="#ffffff"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Central High-Speed Download Arrow (⬇) */}
      <path
        d="M20 7.5V23.5M14.5 18L20 23.5L25.5 18"
        stroke="url(#vidfetch-arrow)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Speed Accent Pill */}
      <circle cx="20" cy="32.5" r="1.6" fill="#ffffff" />
    </svg>
  );
}

/**
 * Full VidFetch Brand Logo with Typography
 * "Vid" in normal sans-serif weight, "Fetch" in ultra-bold electric blue/cyan gradient.
 */
export default function VidFetchLogo({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 cursor-pointer select-none group ${className}`}>
      <div className="transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
        <VidFetchIcon className="h-10 w-10 shrink-0" />
      </div>
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className="text-2xl font-normal tracking-tight text-slate-800 font-sans">
            Vid
          </span>
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-[#0056b3] via-[#0284c7] to-[#00d2ff] bg-clip-text text-transparent font-sans">
            Fetch
          </span>
          <span className="rounded-md bg-gradient-to-r from-[#0056b3] to-[#00d2ff] px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-xs">
            PRO
          </span>
        </div>
        <span className="text-[10px] font-medium tracking-widest uppercase text-slate-400 -mt-0.5">
          Fast Video Downloader
        </span>
      </div>
    </div>
  );
}
