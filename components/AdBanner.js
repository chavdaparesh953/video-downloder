"use client";

import React from "react";

/**
 * AdBanner Component
 * Placeholder container for Adsterra / Monetag monetization scripts.
 */
export default function AdBanner({ className = "" }) {
  // Insert Adsterra/Monetag banner script here

  return (
    <div
      className={`w-full max-w-3xl mx-auto my-6 overflow-hidden rounded-xl border border-dashed border-slate-200 bg-slate-50/70 p-4 transition-all hover:bg-slate-50 ${className}`}
    >
      <div className="flex flex-col items-center justify-center min-h-[90px] text-center">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Advertisement
        </span>
        {/* Placeholder for responsive ad banner slot */}
        <div id="ad-banner-slot" className="w-full flex items-center justify-center py-2">
          {/* Adsterra/Monetag script will render iframe / banner here */}
          <span className="text-xs text-slate-400/80">
            Ad Banner Slot (728x90 / Responsive Display)
          </span>
        </div>
      </div>
    </div>
  );
}
