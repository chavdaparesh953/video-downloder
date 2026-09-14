import React from "react";

export function YouTubeIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fill="#FF0000"
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
      />
      <path fill="#FFFFFF" d="m9.545 15.568 6.273-3.568-6.273-3.568v7.136z" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <defs>
        <radialGradient id="ig-grad" r="150%" cx="30%" cy="107%">
          <stop stopColor="#fdf497" offset="0%" />
          <stop stopColor="#fdf497" offset="5%" />
          <stop stopColor="#fd5949" offset="45%" />
          <stop stopColor="#d6249f" offset="60%" />
          <stop stopColor="#285AEB" offset="90%" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="#FFFFFF" strokeWidth="2.1" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="#FFFFFF" />
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="4.8"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.1"
      />
    </svg>
  );
}

export function FacebookIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fill="#1877F2"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
      <path
        fill="#FFFFFF"
        d="M16.671 15.543l.532-3.47h-3.328v-2.25c0-.949.465-1.874 1.956-1.874h1.514V4.996s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.643H7.078v3.47h3.047v8.385a12.09 12.09 0 0 0 3.75 0v-8.385h2.796z"
      />
    </svg>
  );
}

export function TikTokIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fill="#000000"
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .59.04.87.12V9.4a6.33 6.33 0 0 0-.87-.06A6.34 6.34 0 0 0 3.14 15.7a6.34 6.34 0 0 0 10.82 4.48c1.77-1.77 2.37-4.29 2.37-6.51V8.14a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.51.43z"
      />
    </svg>
  );
}

export function TwitterXIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fill="#0f172a"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}
