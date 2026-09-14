"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useTransition } from "react";
import {
  Download,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Clipboard,
  X,
  Play,
  Film,
  Music,
  ShieldCheck,
  Zap,
  Layers,
  ExternalLink,
  ChevronDown,
  Check,
  Info,
  RefreshCw,
} from "lucide-react";
import {
  YouTubeIcon,
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  TwitterXIcon,
} from "../components/BrandIcons";
import AdBanner from "../components/AdBanner";

const PLATFORMS = [
  {
    id: "all",
    label: "All-in-One",
    tag: "Auto",
    icon: Sparkles,
    heroTitle: "Universal Video Downloader",
    heroSubtitle:
      "Paste any video link from YouTube, Instagram, Facebook, TikTok, or Twitter/X. Instant high-speed MP4 extraction.",
    placeholder: "Paste any video link (YouTube, Instagram, Facebook, TikTok, Twitter/X)...",
    sampleUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    badge: "Auto Detect",
  },
  {
    id: "youtube",
    label: "YouTube",
    tag: "MP4 / MP3",
    customIcon: YouTubeIcon,
    heroTitle: "YouTube Video & Shorts Downloader",
    heroSubtitle:
      "Download YouTube videos, Shorts, and audio tracks in 1080p Full HD or 320kbps MP3 format with zero speed throttling.",
    placeholder: "Paste YouTube link (e.g. https://www.youtube.com/watch?v=...)",
    sampleUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    badge: "1080p / 4K",
  },
  {
    id: "instagram",
    label: "Instagram",
    tag: "Reels & Video",
    customIcon: InstagramIcon,
    heroTitle: "Instagram Reels & Video Downloader",
    heroSubtitle:
      "Save Instagram Reels, video posts, and IGTV clips in original high-definition MP4 directly to your gallery.",
    placeholder: "Paste Instagram link (e.g. https://www.instagram.com/reel/...)",
    sampleUrl: "https://www.instagram.com/reel/C8_example_reel/",
    badge: "HD Reels",
  },
  {
    id: "facebook",
    label: "Facebook",
    tag: "Watch & Reels",
    customIcon: FacebookIcon,
    heroTitle: "Facebook Video Downloader",
    heroSubtitle:
      "Download Facebook Watch clips, public feed videos, and Facebook Reels in crystal-clear 1080p MP4 quality.",
    placeholder: "Paste Facebook video link (e.g. https://www.facebook.com/watch/?v=...)",
    sampleUrl: "https://www.facebook.com/watch/?v=102030405060",
    badge: "Watch & Reels",
  },
  {
    id: "tiktok",
    label: "TikTok",
    tag: "No Watermark",
    customIcon: TikTokIcon,
    heroTitle: "TikTok Video Downloader",
    heroSubtitle:
      "Download TikTok videos without watermark in HD quality. Clean sound, pure video, instant download.",
    placeholder: "Paste TikTok link (e.g. https://www.tiktok.com/@user/video/...)",
    sampleUrl: "https://www.tiktok.com/@user/video/7123456789",
    badge: "No Watermark",
  },
  {
    id: "twitter",
    label: "Twitter / X",
    tag: "HD Video",
    customIcon: TwitterXIcon,
    heroTitle: "Twitter / X Video Downloader",
    heroSubtitle:
      "Extract and download videos, GIFs, and media streams from Twitter (X) tweets in MP4 format.",
    placeholder: "Paste Twitter/X link (e.g. https://x.com/user/status/...)",
    sampleUrl: "https://x.com/techinsider/status/1234567890",
    badge: "HD MP4",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("all");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [activeFormatType, setActiveFormatType] = useState("video"); // 'video' or 'audio'
  const [copiedLink, setCopiedLink] = useState(false);
  const [, startTransition] = useTransition();

  const currentPlatform =
    PLATFORMS.find((p) => p.id === activeTab) || PLATFORMS[0];

  // Auto-detect platform from user input
  const detectPlatformFromUrl = (inputUrl) => {
    const lower = inputUrl.toLowerCase();
    if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "youtube";
    if (lower.includes("instagram.com")) return "instagram";
    if (lower.includes("facebook.com") || lower.includes("fb.watch")) return "facebook";
    if (lower.includes("tiktok.com")) return "tiktok";
    if (lower.includes("twitter.com") || lower.includes("x.com")) return "twitter";
    return null;
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setUrl(val);
    if (error) setError("");

    // If user is on 'all' tab, automatically switch visual tab or detect
    const detected = detectPlatformFromUrl(val);
    if (detected && activeTab === "all") {
      // Keep on current or auto-highlight
    }
  };

  const handleDownload = async (e) => {
    if (e) e.preventDefault();

    if (!url.trim()) {
      setError("Please paste a valid video URL first.");
      return;
    }

    setError("");
    setVideoData(null);
    setLoading(true);

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url.trim(),
          targetPlatform: activeTab !== "all" ? currentPlatform.label : undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Unable to retrieve video. Please check the link and try again."
        );
      }

      setVideoData(result.data);
      setActiveFormatType("video");
    } catch (err) {
      setError(
        err.message || "An unexpected error occurred. Please verify the URL and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasteClipboard = async () => {
    try {
      if (navigator?.clipboard?.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text.trim());
          setError("");
          const detected = detectPlatformFromUrl(text.trim());
          if (detected) {
            setActiveTab(detected);
          }
        }
      }
    } catch {
      // Clipboard denied
    }
  };

  const handleClear = () => {
    setUrl("");
    setError("");
  };

  const handleSampleClick = (sample) => {
    setUrl(sample);
    setError("");
  };

  const handleReset = () => {
    setUrl("");
    setVideoData(null);
    setError("");
  };

  const handleCopyDirectLink = (link) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB] text-slate-900 font-sans">
      {/* Top Professional Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Brand Logo */}
          <div
            onClick={handleReset}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-slate-900">
                  Save<span className="text-blue-600">Media</span>
                </span>
                <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                  Pro
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400">
                Universal Video Downloader
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl text-xs font-semibold text-slate-600">
            <button
              onClick={() => setActiveTab("youtube")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === "youtube"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "hover:text-slate-900"
              }`}
            >
              <YouTubeIcon className="w-3.5 h-3.5" />
              <span>YouTube</span>
            </button>
            <button
              onClick={() => setActiveTab("instagram")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === "instagram"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "hover:text-slate-900"
              }`}
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </button>
            <button
              onClick={() => setActiveTab("facebook")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === "facebook"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "hover:text-slate-900"
              }`}
            >
              <FacebookIcon className="w-3.5 h-3.5" />
              <span>Facebook</span>
            </button>
            <button
              onClick={() => setActiveTab("tiktok")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === "tiktok"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "hover:text-slate-900"
              }`}
            >
              <TikTokIcon className="w-3.5 h-3.5" />
              <span>TikTok</span>
            </button>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Fast & 100% Free
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 pb-16">
        {/* Hero & Search Container */}
        <section className="relative px-4 pt-10 pb-6 sm:px-6 lg:pt-14">
          <div className="mx-auto max-w-4xl text-center">
            {/* Top platform tabs bar */}
            <div className="mb-8 flex justify-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-2xl bg-white p-1.5 shadow-sm border border-slate-200">
                {PLATFORMS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  const IconComp = tab.icon;
                  const CustomIcon = tab.customIcon;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setError("");
                      }}
                      className={`relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all sm:text-sm ${
                        isActive
                          ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {CustomIcon && <CustomIcon className="h-4 w-4 shrink-0" />}
                      {IconComp && <IconComp className="h-4 w-4 shrink-0 text-amber-400" />}
                      <span>{tab.label}</span>
                      {isActive && tab.badge && (
                        <span className="hidden sm:inline-block rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase">
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Hero Headings */}
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-5xl">
              {currentPlatform.heroTitle}
            </h1>
            <p className="mx-auto mt-3.5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              {currentPlatform.heroSubtitle}
            </p>

            {/* Main Input Box */}
            <div className="mx-auto mt-8 max-w-3xl">
              <div className="rounded-3xl border border-slate-200/90 bg-white p-2.5 shadow-xl shadow-slate-200/60 transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
                <form
                  onSubmit={handleDownload}
                  className="flex flex-col gap-2.5 sm:flex-row sm:items-center"
                >
                  <div className="relative flex flex-1 items-center">
                    {/* Dynamic Platform Icon inside Input */}
                    <div className="pointer-events-none absolute left-3.5 flex items-center justify-center">
                      {currentPlatform.customIcon ? (
                        <currentPlatform.customIcon className="h-5 w-5" />
                      ) : (
                        <Sparkles className="h-5 w-5 text-blue-600" />
                      )}
                    </div>

                    <input
                      type="url"
                      id="video-url-input"
                      value={url}
                      onChange={handleInputChange}
                      placeholder={currentPlatform.placeholder}
                      className="w-full rounded-2xl bg-transparent py-3.5 pl-12 pr-20 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none sm:text-base"
                      required
                    />

                    {/* Actions inside input: Paste / Clear */}
                    <div className="absolute right-2.5 flex items-center gap-1.5">
                      {url ? (
                        <button
                          type="button"
                          onClick={handleClear}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                          title="Clear input"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handlePasteClipboard}
                          className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition"
                          title="Paste from clipboard"
                        >
                          <Clipboard className="h-3.5 w-3.5" />
                          <span>Paste</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* High Impact Download Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    id="download-submit-btn"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-75 sm:w-auto"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Extracting...</span>
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Instant Test Sample Links */}
              <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
                <span className="font-medium text-slate-400">Quick Test:</span>
                <button
                  type="button"
                  onClick={() =>
                    handleSampleClick("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
                  }
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition"
                >
                  YouTube 4K
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSampleClick("https://www.instagram.com/reel/C8_example_reel/")
                  }
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition"
                >
                  Instagram Reel
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSampleClick("https://www.facebook.com/watch/?v=102030405060")
                  }
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition"
                >
                  Facebook Watch
                </button>
              </div>

              {/* Error Message Box */}
              {error && (
                <div className="mt-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50/90 p-4 text-left text-sm text-red-800 shadow-sm animate-in fade-in">
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold">Unable to download video</p>
                    <p className="mt-0.5 text-xs text-red-700">{error}</p>
                  </div>
                  <button
                    onClick={() => setError("")}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Loading Shimmer Skeleton State */}
        {loading && (
          <section className="px-4 py-4 sm:px-6">
            <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-100">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Skeleton Thumbnail */}
                <div className="relative aspect-video w-full md:w-72 shrink-0 rounded-2xl animate-shimmer overflow-hidden" />

                {/* Skeleton Meta */}
                <div className="flex flex-1 flex-col gap-3 w-full">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-24 rounded-full animate-shimmer" />
                    <div className="h-5 w-16 rounded-full animate-shimmer" />
                  </div>
                  <div className="h-6 w-full rounded-lg animate-shimmer" />
                  <div className="h-4 w-3/4 rounded-lg animate-shimmer" />

                  <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-blue-600">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Resolving direct CDN video streams...</span>
                  </div>

                  <div className="h-12 w-full rounded-xl animate-shimmer mt-2" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Genuine Production Result Card */}
        {!loading && videoData && (
          <section className="px-4 py-4 sm:px-6">
            <div
              id="result-card"
              className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/70"
            >
              {/* Card Header Status */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-6 py-3 text-xs">
                <div className="flex items-center gap-2 font-semibold text-slate-700">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Stream Extracted Successfully
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 font-semibold text-slate-500 hover:text-slate-900 transition"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Download Another</span>
                </button>
              </div>

              <div className="p-6 sm:p-7">
                {/* Media Preview + Info */}
                <div className="flex flex-col gap-6 md:flex-row">
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl bg-slate-950 md:w-72 group shadow-sm">
                    <img
                      src={videoData.thumbnail}
                      alt={videoData.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105 opacity-90"
                    />
                    {/* Subtle Play Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg backdrop-blur-xs transition group-hover:scale-110">
                        <Play className="h-5 w-5 ml-0.5 fill-current" />
                      </div>
                    </div>
                    {/* Platform Tag */}
                    <span className="absolute top-2.5 left-2.5 rounded-lg bg-black/80 px-2 py-1 text-[11px] font-bold text-white backdrop-blur-xs">
                      {videoData.platform}
                    </span>
                    {/* Duration Badge */}
                    <span className="absolute bottom-2.5 right-2.5 rounded-lg bg-black/85 px-2 py-0.5 text-[11px] font-mono font-medium text-white backdrop-blur-xs">
                      {videoData.duration}
                    </span>
                  </div>

                  {/* Right Info Section */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      {/* Creator Info */}
                      {videoData.author && (
                        <div className="flex items-center gap-2.5 mb-2">
                          <img
                            src={videoData.author.avatar}
                            alt={videoData.author.name}
                            className="h-6 w-6 rounded-full object-cover border border-slate-200"
                          />
                          <span className="text-xs font-bold text-slate-700">
                            {videoData.author.name}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            • {videoData.author.stats}
                          </span>
                        </div>
                      )}

                      {/* Video Title */}
                      <h2 className="text-base font-extrabold text-slate-900 sm:text-lg leading-snug line-clamp-2">
                        {videoData.title}
                      </h2>
                    </div>

                    {/* Primary Green Download MP4 Button */}
                    <div className="mt-5">
                      <a
                        href={videoData.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download="video.mp4"
                        id="download-mp4-btn"
                        className="group flex items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-extrabold text-white shadow-xl shadow-emerald-600/30 transition-all hover:bg-emerald-700 active:scale-[0.98]"
                      >
                        <Download className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
                        <span>Download MP4 (Best 1080p Quality)</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quality Formats Tabs (Video vs Audio) */}
                <div className="mt-8 border-t border-slate-100 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveFormatType("video")}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                          activeFormatType === "video"
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Film className="h-3.5 w-3.5" />
                        <span>Video Formats (MP4)</span>
                      </button>
                      <button
                        onClick={() => setActiveFormatType("audio")}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                          activeFormatType === "audio"
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Music className="h-3.5 w-3.5" />
                        <span>Audio Formats (MP3)</span>
                      </button>
                    </div>

                    <button
                      onClick={() => handleCopyDirectLink(videoData.downloadUrl)}
                      className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition flex items-center gap-1"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Clipboard className="h-3.5 w-3.5" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Format Rows */}
                  <div className="space-y-2">
                    {activeFormatType === "video"
                      ? videoData.videoFormats?.map((fmt, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3 hover:bg-slate-50 transition"
                          >
                            <div className="flex items-center gap-3">
                              <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-700">
                                {fmt.format}
                              </span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="text-xs font-bold text-slate-800">
                                    {fmt.quality}
                                  </p>
                                  {fmt.badge && (
                                    <span className="rounded bg-emerald-100 px-1.5 py-0.2 text-[10px] font-semibold text-emerald-700">
                                      {fmt.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-400">
                                  {fmt.resolution} • {fmt.size}
                                </p>
                              </div>
                            </div>
                            <a
                              href={fmt.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                              className="flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-xs hover:border-slate-300 hover:bg-slate-100 transition"
                            >
                              <Download className="h-3.5 w-3.5 text-slate-500" />
                              <span>Download</span>
                            </a>
                          </div>
                        ))
                      : videoData.audioFormats?.map((fmt, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3 hover:bg-slate-50 transition"
                          >
                            <div className="flex items-center gap-3">
                              <span className="rounded-md bg-purple-100 px-2 py-0.5 text-[11px] font-bold text-purple-700">
                                {fmt.format}
                              </span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="text-xs font-bold text-slate-800">
                                    {fmt.quality}
                                  </p>
                                  {fmt.badge && (
                                    <span className="rounded bg-purple-100 px-1.5 py-0.2 text-[10px] font-semibold text-purple-700">
                                      {fmt.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-400">
                                  {fmt.resolution} • {fmt.size}
                                </p>
                              </div>
                            </div>
                            <a
                              href={fmt.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                              className="flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-xs hover:border-slate-300 hover:bg-slate-100 transition"
                            >
                              <Download className="h-3.5 w-3.5 text-slate-500" />
                              <span>Save Audio</span>
                            </a>
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Monetization Placeholder AdBanner below Download Result */}
        <div className="px-4 sm:px-6">
          <AdBanner />
        </div>

        {/* How It Works & Guide */}
        <section className="mt-8 border-t border-slate-200/80 bg-white px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                Simple & Efficient
              </span>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                How to Download Online Videos
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Follow these 3 straightforward steps to download any video in HD
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative rounded-3xl border border-slate-100 bg-slate-50/60 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white font-black text-lg mb-5 shadow-md shadow-blue-500/25">
                  01
                </div>
                <h3 className="text-base font-bold text-slate-900">Copy Video Link</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Open YouTube, Instagram, or Facebook and copy the link from the browser URL bar or Share menu.
                </p>
              </div>

              <div className="relative rounded-3xl border border-slate-100 bg-slate-50/60 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white font-black text-lg mb-5 shadow-md shadow-indigo-500/25">
                  02
                </div>
                <h3 className="text-base font-bold text-slate-900">Paste & Analyze</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Paste the URL into the input field above. Our engine instantly detects the platform and video quality options.
                </p>
              </div>

              <div className="relative rounded-3xl border border-slate-100 bg-slate-50/60 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white font-black text-lg mb-5 shadow-md shadow-emerald-500/25">
                  03
                </div>
                <h3 className="text-base font-bold text-slate-900">Download MP4</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Click the green Download button to immediately save the MP4 video directly to your computer or phone.
                </p>
              </div>
            </div>

            {/* Value Props */}
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-3.5 p-5 rounded-2xl border border-slate-200/70 bg-white">
                <Zap className="h-6 w-6 text-amber-500 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Maximum Speed CDN</h4>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    Direct stream links provide unthrottled download speeds with full bandwidth.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-5 rounded-2xl border border-slate-200/70 bg-white">
                <ShieldCheck className="h-6 w-6 text-emerald-500 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Zero Watermarks</h4>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    Preserves pristine original video files without intrusive overlay branding.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-5 rounded-2xl border border-slate-200/70 bg-white">
                <Layers className="h-6 w-6 text-blue-500 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Multi-Format Extraction</h4>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    Extract in 1080p, 720p, 480p MP4 or convert audio directly to high-bitrate MP3.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">SaveMedia</span>
            <span>• Universal Online Video Downloader</span>
          </div>
          <p className="text-slate-400 text-center sm:text-right">
            Disclaimer: For personal offline educational backup only. Please respect copyright laws and content creators.
          </p>
        </div>
      </footer>
    </div>
  );
}
