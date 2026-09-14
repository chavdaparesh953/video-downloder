import { NextResponse } from "next/server";

/**
 * Universal Video Downloader API Route
 * POST /api/download
 *
 * Receives: { url: string }
 * Returns: { success: boolean, data?: VideoData, error?: string }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { url } = body;

    // 1. Validation: Ensure a URL is provided
    if (!url || typeof url !== "string" || !url.trim()) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid video URL." },
        { status: 400 }
      );
    }

    const cleanUrl = url.trim();

    // 2. Validate URL format
    let parsedUrl;
    try {
      parsedUrl = new URL(cleanUrl);
    } catch {
      return NextResponse.json(
        { success: false, error: "The provided URL is invalid. Please check and try again." },
        { status: 400 }
      );
    }

    // 3. Detect Platform
    const hostname = parsedUrl.hostname.toLowerCase();
    let platform = "General";
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
    | 1. Sign up on RapidAPI (e.g. "Social Media Video Downloader" or "All-in-One Video Downloader").
    | 2. Add your RAPIDAPI_KEY to your `.env.local` file:
    |      RAPIDAPI_KEY=your_actual_rapidapi_key_here
    |
    | 3. Uncomment and adapt the code block below:
    |
    | const rapidApiKey = process.env.RAPIDAPI_KEY;
    | const rapidApiHost = "social-download-all-in-one.p.rapidapi.com"; // Example host
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

    // 4. Simulated API Processing (Simulate realistic extraction latency)
    await new Promise((resolve) => setTimeout(resolve, 750));

    // Generate dynamic preview metadata based on detected platform
    let videoTitle = `Sample ${platform} Video Stream`;
    let thumbnail = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";

    if (platform === "YouTube") {
      videoTitle = "Explore Nature: 4K Cinematic Wildlife & Landscape Showcase";
      thumbnail = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";
    } else if (platform === "Instagram") {
      videoTitle = "Viral Aesthetic Reels - Creative Photography & Lifestyle";
      thumbnail = "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=800&q=80";
    } else if (platform === "Facebook") {
      videoTitle = "Trending Highlights & Special Moments - HD Stream";
      thumbnail = "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80";
    } else if (platform === "TikTok") {
      videoTitle = "Trending Creative Dance & Sound Mashup #viral";
      thumbnail = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80";
    }

    // Simulated dummy response data for immediate testing
    const simulatedData = {
      title: videoTitle,
      thumbnail: thumbnail,
      downloadUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Test working MP4 stream
      duration: "3:42",
      platform: platform,
      sourceUrl: cleanUrl,
      author: `@creator_${platform.toLowerCase().replace(/[^a-z]/g, "")}`,
      formats: [
        { quality: "1080p Full HD", size: "48.2 MB", format: "MP4", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
        { quality: "720p HD", size: "26.4 MB", format: "MP4", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
        { quality: "480p SD", size: "14.1 MB", format: "MP4", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
        { quality: "Audio MP3 (320kbps)", size: "5.2 MB", format: "MP3", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
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
        error: "An unexpected error occurred while processing the video request. Please try again.",
      },
      { status: 500 }
    );
  }
}
