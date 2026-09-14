import "./globals.css";

export const metadata = {
  title: "VidFetch - Universal Video Downloader (Fast & Free HD MP4)",
  description:
    "VidFetch is the modern, high-speed universal video downloader. Download crystal-clear 1080p Full HD MP4 and 320kbps MP3 from YouTube, Instagram Reels, Facebook, TikTok, and Twitter/X.",
  keywords: [
    "VidFetch",
    "VidFetch video downloader",
    "youtube video downloader",
    "instagram reels downloader",
    "facebook video downloader",
    "tiktok no watermark downloader",
    "free mp4 downloader",
  ],
  authors: [{ name: "VidFetch" }],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="font-sans bg-[#F9FAFB] text-slate-900 min-h-screen antialiased flex flex-col selection:bg-[#0056b3] selection:text-white">
        {children}
      </body>
    </html>
  );
}
