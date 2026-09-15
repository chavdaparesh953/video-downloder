import { NextResponse } from "next/server";
import { Innertube, Platform } from "youtubei.js";

// Configure JavaScript evaluator for deciphering signatures
Platform.shim.eval = async (data) => {
  return new Function(data.output)();
};

let cachedYtInstance = null;

async function getYtInstance() {
  if (!cachedYtInstance) {
    cachedYtInstance = await Innertube.create({
      client_type: "ANDROID",
      retrieve_player: true,
      generate_session_locally: true,
    });
  }
  return cachedYtInstance;
}

export const dynamic = "force-dynamic";

/**
 * Direct In-App Multi-Quality Video & Audio Stream Route
 * GET /api/stream?url=...&title=...&quality=(1080p|720p|480p|360p|audio)
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoUrl = searchParams.get("url");
    const directUrl = searchParams.get("directUrl");
    const videoTitle = searchParams.get("title") || "VidFetch_Media";
    const quality = searchParams.get("quality") || "best";

    // 1. Direct CDN streaming for Instagram, Facebook, and universal direct media (Meta CDN / Cloudflare)
    if (directUrl) {
      try {
        const fetchRes = await fetch(directUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
          },
        });

        if (!fetchRes.ok) {
          return NextResponse.redirect(directUrl);
        }

        const isAudio = quality.includes("audio");
        const ext = isAudio ? "mp3" : "mp4";
        const contentType =
          fetchRes.headers.get("content-type") ||
          (isAudio ? "audio/mpeg" : "video/mp4");

        const cleanBaseTitle =
          videoTitle
            .replace(/[^a-zA-Z0-9_\-\s]/g, "")
            .trim()
            .replace(/\s+/g, "_") || "VidFetch_Video";
        const safeFilename = `${cleanBaseTitle}.${ext}`;

        return new Response(fetchRes.body, {
          status: 200,
          headers: {
            "Content-Type": contentType,
            "Content-Disposition": `attachment; filename="${safeFilename}"`,
            "Cache-Control": "public, max-age=3600",
          },
        });
      } catch (err) {
        console.warn("Direct stream proxy fallback to redirect:", err?.message);
        return NextResponse.redirect(directUrl);
      }
    }

    if (!videoUrl) {
      return NextResponse.json(
        { error: "Missing video URL parameter" },
        { status: 400 }
      );
    }

    // Extract YouTube video ID
    const ytMatch = videoUrl.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/i
    );

    if (!ytMatch || !ytMatch[1]) {
      return NextResponse.redirect("https://www.w3schools.com/html/mov_bbb.mp4");
    }

    const videoId = ytMatch[1];
    const yt = await getYtInstance();

    const isAudio = quality.includes("audio");
    let stream;

    try {
      if (isAudio) {
        // Stream audio track
        stream = await yt.download(videoId, {
          type: "audio",
          quality: "best",
        });
      } else {
        // Stream selected video resolution (1080p, 720p, 480p, 360p, or best available)
        stream = await yt.download(videoId, {
          type: "video+audio",
          quality: quality === "best" ? "best" : quality,
          format: "mp4",
        });
      }
    } catch (streamErr) {
      console.warn("Retrying with fallback stream options:", streamErr?.message);
      // Resilient fallback: download best available stream for this video
      stream = await yt.download(videoId, {
        type: isAudio ? "audio" : "video+audio",
      });
    }

    // Determine extension and mime type
    const ext = isAudio ? "mp3" : "mp4";
    const contentType = isAudio ? "audio/mpeg" : "video/mp4";
    const qualityTag = isAudio ? "Audio" : quality;

    // Clean safe filename
    const cleanBaseTitle = videoTitle
      .replace(/[^a-zA-Z0-9_\-\s]/g, "")
      .trim()
      .replace(/\s+/g, "_");
    const safeFilename = `${cleanBaseTitle}_${qualityTag}.${ext}`;

    // Convert to web readable stream for Next.js response
    const webStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            controller.enqueue(chunk);
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(webStream, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${safeFilename}"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Stream route error:", error);
    return NextResponse.json(
      {
        error: "Failed to process video stream. Please try again.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
