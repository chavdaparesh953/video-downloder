"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import {
  Link as LinkIcon,
  Download,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Clipboard,
  X,
  Film,
  Music,
  ShieldCheck,
  Zap,
  Layers,
} from "lucide-react";
import AdBanner from "../components/AdBanner";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoData, setVideoData] = useState(null);

  // Handle URL form submission
  const handleDownload = async (e) => {
    if (e) e.preventDefault();

    if (!url.trim()) {
      setError("Please paste a valid video URL before clicking Download.");
      return;
    }

    // Reset previous states
    setError("");
    setVideoData(null);
    setLoading(true);

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Failed to retrieve video details. Please try another link."
        );
      }

      setVideoData(result.data);
    } catch (err) {
      setError(
        err.message || "An unexpected error occurred. Please verify the URL and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Quick clipboard paste helper
  const handlePasteClipboard = async () => {
    try {
      if (navigator?.clipboard?.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text.trim());
          setError("");
        }
      }
    } catch {
      // Clipboard permissions may be denied or unsupported
    }
  };

  // Quick clear input
  const handleClearInput = () => {
    setUrl("");
    setError("");
  };

  // Quick test sample loader
  const handleLoadSample = (sampleUrl) => {
    setUrl(sampleUrl);
    setError("");
  };

  // Reset to download another video
  const handleReset = () => {
    setUrl("");
    setVideoData(null);
    setError("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      {/* Top Header / Navigation */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/20">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-slate-900">
                Universal<span className="text-blue-600">Video</span>
              </span>
              <span className="hidden text-xs text-slate-400 sm:inline-block ml-2 font-medium">
                Downloader
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/70">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              100% Free & Unlimited
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-4 pt-12 pb-8 sm:px-6 sm:pt-16 lg:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            {/* Subtle top pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/70 px-3.5 py-1 text-xs font-medium text-blue-700 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              High Speed • No Watermarks • Clean MP4
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl sm:leading-tight">
              Universal Video Downloader
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
              Download your favorite videos from YouTube, Instagram, Facebook, and more
              in high-quality MP4. Fast, secure, and completely free.
            </p>

            {/* Supported Platform Badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-600">
              <span className="text-slate-400">Supported Platforms:</span>
              <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-red-500" /> YouTube
              </span>
              <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-pink-500" /> Instagram
              </span>
              <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-blue-600" /> Facebook
              </span>
              <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-slate-900" /> TikTok
              </span>
              <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-sky-500" /> Twitter / X
              </span>
            </div>

            {/* Input & Download Box Form */}
            <div className="mx-auto mt-8 max-w-2xl">
              <form
                onSubmit={handleDownload}
                className="relative flex flex-col gap-2.5 rounded-2xl border border-slate-200/90 bg-white p-2.5 shadow-xl shadow-slate-200/50 sm:flex-row sm:items-center sm:gap-2"
              >
                <div className="relative flex flex-1 items-center">
                  <LinkIcon className="pointer-events-none absolute left-3.5 h-5 w-5 text-slate-400" />
                  <input
                    type="url"
                    id="video-url-input"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Paste YouTube, Instagram, or Facebook URL here..."
                    className="w-full rounded-xl bg-transparent py-3 pl-11 pr-20 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none sm:text-base"
                    required
                  />

                  {/* Actions inside input: Clear & Paste */}
                  <div className="absolute right-2 flex items-center gap-1">
                    {url ? (
                      <button
                        type="button"
                        onClick={handleClearInput}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
                        title="Clear input"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handlePasteClipboard}
                        className="flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition"
                        title="Paste from clipboard"
                      >
                        <Clipboard className="h-3.5 w-3.5" />
                        <span className="hidden xs:inline">Paste</span>
                      </button>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  id="download-submit-btn"
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-75 sm:w-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Fetching...</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </>
                  )}
                </button>
              </form>

              {/* Sample Links for Quick Demo Testing */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
                <span className="font-medium">Quick Test Samples:</span>
                <button
                  type="button"
                  onClick={() =>
                    handleLoadSample("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
                  }
                  className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition"
                >
                  YouTube
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleLoadSample("https://www.instagram.com/reel/C8_example_reel/")
                  }
                  className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition"
                >
                  Instagram
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleLoadSample("https://www.facebook.com/watch/?v=102030405060")
                  }
                  className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition"
                >
                  Facebook
                </button>
              </div>

              {/* Error Alert Message */}
              {error && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/80 p-3.5 text-left text-sm text-red-800">
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">Unable to download video</p>
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

        {/* Loading Spinner & Skeleton UI State */}
        {loading && (
          <section className="px-4 py-6 sm:px-6">
            <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-100">
              <div className="flex flex-col sm:flex-row gap-5 items-center">
                {/* Skeleton Thumbnail */}
                <div className="relative h-44 w-full sm:w-64 shrink-0 rounded-xl animate-shimmer overflow-hidden" />

                {/* Skeleton Info */}
                <div className="flex flex-1 flex-col gap-3 w-full">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-20 rounded-full animate-shimmer" />
                    <div className="h-5 w-14 rounded-full animate-shimmer" />
                  </div>
                  <div className="h-5 w-full rounded-lg animate-shimmer" />
                  <div className="h-4 w-3/4 rounded-lg animate-shimmer" />

                  <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                    <span>Analyzing video stream and generating high-speed download links...</span>
                  </div>

                  <div className="h-11 w-full rounded-xl animate-shimmer mt-2" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Result Card (When videoData is available) */}
        {!loading && videoData && (
          <section className="px-4 py-6 sm:px-6">
            <div
              id="result-card"
              className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 transition-all sm:p-6"
            >
              <div className="flex flex-col gap-6 sm:flex-row">
                {/* Thumbnail Preview with Platform Badge & Play Overlay */}
                <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-44 sm:w-64">
                  <img
                    src={videoData.thumbnail}
                    alt={videoData.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {/* Platform Badge */}
                  <span className="absolute top-2.5 left-2.5 rounded-md bg-slate-900/80 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-xs">
                    {videoData.platform}
                  </span>
                  {/* Duration Badge */}
                  {videoData.duration && (
                    <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/80 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-xs">
                      {videoData.duration}
                    </span>
                  )}
                </div>

                {/* Video Information & Actions */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="h-3 w-3" /> Ready
                      </span>
                      {videoData.author && (
                        <span className="text-xs text-slate-500 font-medium">
                          {videoData.author}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-2 text-base font-bold text-slate-900 sm:text-lg line-clamp-2">
                      {videoData.title}
                    </h2>
                    <p className="mt-1 text-xs text-slate-400 break-all line-clamp-1">
                      Source: {videoData.sourceUrl}
                    </p>
                  </div>

                  {/* Prominent Green Download MP4 Button */}
                  <div className="mt-5 flex flex-col gap-2.5">
                    <a
                      href={videoData.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download="video.mp4"
                      id="download-mp4-btn"
                      className="group flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 active:scale-[0.98]"
                    >
                      <Download className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
                      <span>Download MP4 (High Quality)</span>
                    </a>

                    {/* Secondary Reset / Download Another */}
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-center text-xs font-medium text-slate-500 hover:text-slate-800 transition py-1"
                    >
                      Download another video
                    </button>
                  </div>
                </div>
              </div>

              {/* Optional Formats Accordion / List */}
              {videoData.formats && videoData.formats.length > 0 && (
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    Available Quality Formats
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {videoData.formats.map((fmt, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 hover:bg-slate-50 transition"
                      >
                        <div className="flex items-center gap-2">
                          {fmt.format === "MP3" ? (
                            <Music className="h-4 w-4 text-purple-600" />
                          ) : (
                            <Film className="h-4 w-4 text-blue-600" />
                          )}
                          <div>
                            <p className="text-xs font-semibold text-slate-800">
                              {fmt.quality}
                            </p>
                            <p className="text-[11px] text-slate-400">{fmt.size}</p>
                          </div>
                        </div>
                        <a
                          href={fmt.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="rounded-lg bg-white border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition shadow-xs"
                        >
                          Save
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Monetization Placeholder: AdBanner placed below download result */}
        <div className="px-4 sm:px-6">
          <AdBanner />
        </div>

        {/* Feature Highlights Section */}
        <section className="border-t border-slate-200/80 bg-white px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                How It Works
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Download any video across popular platforms in 3 simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center p-5 rounded-2xl border border-slate-100 bg-slate-50/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 font-bold text-lg mb-4">
                  1
                </div>
                <h3 className="text-base font-semibold text-slate-900">Copy Video URL</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  Open YouTube, Instagram, or Facebook, and copy the link of the video or reel you wish to download.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center p-5 rounded-2xl border border-slate-100 bg-slate-50/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 font-bold text-lg mb-4">
                  2
                </div>
                <h3 className="text-base font-semibold text-slate-900">Paste & Fetch</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  Paste the URL into the input field above and click Download. Our servers extract the highest quality stream.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center p-5 rounded-2xl border border-slate-100 bg-slate-50/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 font-bold text-lg mb-4">
                  3
                </div>
                <h3 className="text-base font-semibold text-slate-900">Download MP4</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  Click the green Download MP4 button to save the video directly to your smartphone, tablet, or PC.
                </p>
              </div>
            </div>

            {/* Why Choose Universal Downloader */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200/60 bg-white shadow-xs">
                <Zap className="h-6 w-6 text-amber-500 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Blazing Fast Speed</h4>
                  <p className="mt-1 text-xs text-slate-500">
                    High performance extraction engine retrieves your video stream without artificial delays.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200/60 bg-white shadow-xs">
                <ShieldCheck className="h-6 w-6 text-emerald-500 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Safe & Anonymous</h4>
                  <p className="mt-1 text-xs text-slate-500">
                    No sign-up or software installation required. We do not track or store your downloads.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200/60 bg-white shadow-xs">
                <Layers className="h-6 w-6 text-blue-500 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Multiple Formats</h4>
                  <p className="mt-1 text-xs text-slate-500">
                    Supports 1080p Full HD, 720p HD, and high-fidelity MP3 audio extraction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p className="font-semibold text-slate-700">Universal Video Downloader</p>
            <p className="mt-0.5 text-slate-400">
              Disclaimer: For personal offline educational use only. Please respect copyright laws and content creators.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">© {new Date().getFullYear()} Universal Video Downloader</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
