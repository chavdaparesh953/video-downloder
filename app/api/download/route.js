import { NextResponse } from "next/server";

/**
 * Universal Video Downloader API Route Handler
 * POST /api/download
 *
 * Receives: { url: string, targetPlatform?: string }
 * Returns: { success: boolean, data?: VideoData, error?: string }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { url, targetPlatform } = body;

    // 1. Validation
    if (!url || typeof url !== "string" || !url.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid video link." },
        { status: 400 }
      );
    }

    const cleanUrl = url.trim();

    // 2. Validate URL syntax
    let parsedUrl;
    try {
      parsedUrl = new URL(cleanUrl);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid link structure. Please paste a complete URL (e.g., https://...)",
        },
        { status: 400 }
      );
    }

    // 3. Platform Detection
    const hostname = parsedUrl.hostname.toLowerCase();
    let platform = targetPlatform || "Universal";

    if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
      platform = "YouTube";
    } else if (hostname.includes("instagram.com")) {
      platform = "Instagram";
    } else if (hostname.includes("facebook.com") || hostname.includes("fb.watch")) {
      platform = "Facebook";
    } else if (hostname.includes("tiktok.com")) {
      platform = "TikTok";
    } else if (hostname.includes("twitter.com") || hostname.includes("x.com")) {
      platform = "Twitter / X";
    }

    /*
    |--------------------------------------------------------------------------
    | RapidAPI Integration Placeholder
    |--------------------------------------------------------------------------
    |
    | To connect a live RapidAPI video downloader service:
    | 1. Sign up on RapidAPI (e.g., "Social Media Video Downloader" or "YouTube Media Downloader").
    | 2. Add your RAPIDAPI_KEY to your `.env.local` file:
    |      RAPIDAPI_KEY=your_actual_rapidapi_key_here
    |
    | 3. Uncomment and adapt the code block below:
    |
    | const rapidApiKey = process.env.RAPIDAPI_KEY;
    | const rapidApiHost = "social-download-all-in-one.p.rapidapi.com";
    |
    | const response = await fetch(`https://${rapidApiHost}/v1/social/autolink`, {
    |   method: "POST",
    |   headers: {
    |     "content-type": "application/json",
    |     "X-RapidAPI-Key": rapidApiKey,
    |     "X-RapidAPI-Host": rapidApiHost,
    |   },
    |   body: JSON.stringify({ url: cleanUrl }),
    | });
    |
    | const result = await response.json();
    | return NextResponse.json({
    |   success: true,
    |   data: {
    |     title: result.title,
    |     thumbnail: result.thumbnail,
    |     downloadUrl: result.medias?.[0]?.url || result.url,
    |     duration: result.duration || "0:00",
    |     platform: platform,
    |     formats: result.medias || [],
    |   }
    | });
    |
    |--------------------------------------------------------------------------
    */

    // 4. Simulated Extraction Latency (Realistic ~600ms)
    await new Promise((resolve) => setTimeout(resolve, 650));

    // Dynamic metadata depending on platform
    let videoTitle = "Universal High Definition Stream Showcase";
    let thumbnail =
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80";
    let authorName = "MediaCreator Official";
    let authorAvatar =
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80";
    let duration = "04:18";
    let stats = "1.2M views • 3 days ago";

    if (platform === "YouTube") {
      videoTitle = "Explore 4K HDR: Cinematic Nature & Wildlife Odyssey";
      thumbnail =
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";
      authorName = "Earth Odyssey Studio";
      authorAvatar =
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80";
      duration = "08:45";
      stats = "4.8M views • 1 week ago";
    } else if (platform === "Instagram") {
      videoTitle = "Trending Cinematic Travel Reel • Venice & Amalfi Coast #wanderlust";
      thumbnail =
        "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=800&q=80";
      authorName = "@wanderlust_visuals";
      authorAvatar =
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80";
      duration = "00:48";
      stats = "890K likes • 240K shares";
    } else if (platform === "Facebook") {
      videoTitle = "Incredible Science & Innovation In Modern Architecture (Full Feature)";
      thumbnail =
        "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80";
      authorName = "Future Frontiers Media";
      authorAvatar =
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80";
      duration = "06:12";
      stats = "2.1M views • 45K comments";
    } else if (platform === "TikTok") {
      videoTitle = "Viral Creative Beat Sync & Visual Transitions #aesthetic #trend";
      thumbnail =
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80";
      authorName = "@soundwave.vfx";
      authorAvatar =
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80";
      duration = "00:34";
      stats = "3.4M plays • No Watermark";
    } else if (platform === "Twitter / X") {
      videoTitle = "Breaking Tech Showcase: Autonomous Robotics Live Demo";
      thumbnail =
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80";
      authorName = "@TechInsiderDaily";
      authorAvatar =
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80";
      duration = "02:15";
      stats = "540K views • 12K reposts";
    }

    const testVideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";

    const simulatedData = {
      title: videoTitle,
      thumbnail: thumbnail,
      downloadUrl: testVideoUrl,
      duration: duration,
      platform: platform,
      sourceUrl: cleanUrl,
      author: {
        name: authorName,
        avatar: authorAvatar,
        stats: stats,
      },
      videoFormats: [
        {
          quality: "1080p Full HD",
          resolution: "1920x1080",
          size: "64.8 MB",
          format: "MP4",
          badge: "Best Quality",
          url: testVideoUrl,
        },
        {
          quality: "720p HD",
          resolution: "1280x720",
          size: "34.2 MB",
          format: "MP4",
          badge: "Popular",
          url: testVideoUrl,
        },
        {
          quality: "480p SD",
          resolution: "854x480",
          size: "18.5 MB",
          format: "MP4",
          badge: "Fast",
          url: testVideoUrl,
        },
        {
          quality: "360p Low",
          resolution: "640x360",
          size: "9.8 MB",
          format: "MP4",
          badge: "Compact",
          url: testVideoUrl,
        },
      ],
      audioFormats: [
        {
          quality: "MP3 Audio (320 kbps)",
          resolution: "Stereo 48kHz",
          size: "8.4 MB",
          format: "MP3",
          badge: "Lossless HQ",
          url: testVideoUrl,
        },
        {
          quality: "MP3 Audio (192 kbps)",
          resolution: "Stereo 44.1kHz",
          size: "5.1 MB",
          format: "MP3",
          badge: "Standard",
          url: testVideoUrl,
        },
        {
          quality: "M4A Audio (128 kbps)",
          resolution: "AAC Audio",
          size: "3.7 MB",
          format: "M4A",
          badge: "Compact",
          url: testVideoUrl,
        },
      ],
    };

    return NextResponse.json(
      {
        success: true,
        data: simulatedData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API /api/download error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Server error while processing video. Please verify the URL and try again.",
      },
      { status: 500 }
    );
  }
}
