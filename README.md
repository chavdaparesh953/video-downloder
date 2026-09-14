# Universal Video Downloader 🚀

A clean, modern, and high-performance **Universal Video Downloader** web application built with **Next.js 14 (App Router)** and **Tailwind CSS**.

---

## ✨ Features

- **Minimalist & Modern UI**: Built with a sleek white and light-slate palette (`#ffffff` and `#f8fafc`), free from cluttered spammy aesthetics.
- **Hero & Centered Input**: Instant paste button from clipboard, URL validation, and clear button.
- **Full State Management**: Handles URL input, active loading spinner, shimmer skeleton states, error feedback, and fetched video data.
- **Responsive Result Card**: Previews video thumbnail, title, ready badge, quality format options, and a prominent green **Download MP4** button.
- **Backend API Route Handler**: Next.js 14 App Router route at `app/api/download/route.js` handling `POST` requests.
- **RapidAPI Ready**: Fully documented integration placeholder comments for connecting RapidAPI social media extractors.
- **Monetization Placeholder**: Clean `AdBanner.js` component positioned beneath the download result with `// Insert Adsterra/Monetag banner script here`.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2 (App Router)
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **Language**: JavaScript (ES6+)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🔌 RapidAPI Integration Setup

To connect live video extraction:
1. Obtain an API key from [RapidAPI](https://rapidapi.com) (e.g. Social Media Video Downloader).
2. Create a `.env.local` file:
   ```env
   RAPIDAPI_KEY=your_rapidapi_key_here
   ```
3. In `app/api/download/route.js`, uncomment the RapidAPI fetch logic provided in the comments.

---

## 📄 License
MIT License. Created for educational and personal offline video backup use.
