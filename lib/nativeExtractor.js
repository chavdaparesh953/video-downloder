import path from "path";
import { execFile } from "child_process";
import util from "util";
import fs from "fs";

const execFileAsync = util.promisify(execFile);

/**
 * 100% Self-Hosted Native Media Extractor (Zero 3rd-Party Downloader Websites)
 * Powered by local standalone engine in /bin/yt-dlp.
 * Bypasses all middleman websites and extracts direct CDN streams from Meta, TikTok, Twitter, and YouTube.
 */
export async function extractNativeMedia(url) {
  try {
    let binPath = path.join(process.cwd(), "bin", "yt-dlp");

    if (!fs.existsSync(binPath)) {
      if (fs.existsSync("/tmp/yt-dlp_macos")) {
        binPath = "/tmp/yt-dlp_macos";
      } else {
        binPath = "yt-dlp";
      }
    }

    const { stdout } = await execFileAsync(
      binPath,
      [
        "--dump-single-json",
        "--no-warnings",
        "--no-check-certificates",
        url,
      ],
      {
        timeout: 25000,
        maxBuffer: 15 * 1024 * 1024,
      }
    );

    if (!stdout || !stdout.trim()) {
      return null;
    }

    const info = JSON.parse(stdout);

    // Format duration
    let formattedDuration = "HD Stream";
    if (info.duration && typeof info.duration === "number") {
      const mins = Math.floor(info.duration / 60);
      const secs = Math.floor(info.duration % 60);
      formattedDuration = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    }

    // Direct stream URL
    const directUrl = info.url || (info.formats && info.formats[info.formats.length - 1]?.url);

    return {
      success: true,
      title: info.title || "Social Media Video",
      thumbnail: info.thumbnail || "",
      directUrl: directUrl || "",
      author: {
        name: info.uploader || info.channel || info.creator || "@creator",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
        stats: `${info.view_count ? `${info.view_count.toLocaleString()} views • ` : ""}100% Direct CDN Stream`,
      },
      duration: formattedDuration,
      formats: info.formats || [],
    };
  } catch (error) {
    console.warn("Native media extraction failed:", error?.message);
    return null;
  }
}
