import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Universal Video Downloader - Fast & Free MP4 Video Saver",
  description:
    "Free, fast, and modern online video downloader. Download high-definition MP4 videos and MP3 audio from YouTube, Instagram, Facebook, and more.",
  keywords: [
    "video downloader",
    "youtube downloader",
    "instagram reels downloader",
    "facebook video downloader",
    "mp4 download",
  ],
  authors: [{ name: "Universal Video Downloader" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-slate-50 text-slate-900 min-h-screen antialiased flex flex-col selection:bg-blue-600 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
