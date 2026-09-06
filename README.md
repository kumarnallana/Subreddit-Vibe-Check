# The Subreddit Vibe Check

Understand the mood behind the hottest conversations on Reddit.

[![Live Demo](https://img.shields.io/badge/Live_Demo-subreddit--vibe--check--app.vercel.app-blue?style=for-the-badge&logo=vercel)](https://subreddit-vibe-check-app.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-The--Subreddit--Vibe--Check-181717?style=for-the-badge&logo=github)](https://github.com/kumarnallana/The-Subreddit-Vibe-Check)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)

---

## Live Deployment Details

- **Production URL:** [https://subreddit-vibe-check-app.vercel.app](https://subreddit-vibe-check-app.vercel.app)
- **Vercel Account:** `sasi-kumar-nallana` (Sasi Kumar Nallana)
- **Vercel Project Name:** `redroot-subreddit-vibe-check`
- **GitHub Repository:** [kumarnallana/The-Subreddit-Vibe-Check](https://github.com/kumarnallana/The-Subreddit-Vibe-Check)

---

## Overview

**The Subreddit Vibe Check** is a production-grade full-stack web application that inspects the hottest posts from any specified subreddit, evaluates client-side sentiment analysis across post titles using the AFINN lexicon, and delivers an intuitive, dynamic visual dashboard summarizing the collective "vibe" of that community.

---

## Features

- **Linear Vibe Meter (D3.js):** Custom data visualization gauge illustrating overall community sentiment from Extremely Negative (-5) to Extremely Positive (+5).
- **Official Reddit Integration:** Connects to Reddit using the official Data API (OAuth2 Client Credentials flow) following the 2026 Developer Policy.
- **Client-Side Sentiment Analysis:** Uses AFINN-165 vocabulary for instantaneous, zero-latency sentiment scoring directly on the browser client.
- **Stale Data Protection & Honest Loading:** Seamlessly transitions between subreddits using `AbortController` and stale-data caching to eliminate race conditions and jitter.
- **Shareable State & Deep Linking:** Dynamically syncs state with URL query parameters (`/?subreddit=reactjs`) for effortless bookmarking and sharing.
- **Adaptive Demo Mode:** Built-in synthetic dataset provider enabling full local UI exploration and end-to-end verification without requiring Reddit developer keys.
- **Interactive Professional Resume:** Embedded interactive resume accessible directly within the app at `/resume`.

---

## Architecture

```text
Browser Client (React 19 / Next.js 16)
  │
  ├── UI Layer: Lenis Smooth Scroll, Framer Motion, D3.js Vibe Meter
  ├── NLP Layer: AFINN Lexicon Sentiment Scoring Engine
  │
  ▼ HTTP GET /api/subreddit?name={subreddit}
Next.js Route Handler (Edge-Ready Proxy)
  │
  ├── Environment & Provider Detection (Mock vs Live API)
  │
  ├── [If API] Reddit OAuth2 Provider (Client Credentials Flow)
  │      └── reddit.com/api/v1/access_token ──► oauth.reddit.com/r/{name}/hot
  │
  └── [If Mock] Synthetic Data Provider (Instant Fallback)
         │
         ▼
  Normalized JSON Schema Contract ──► Returned to Client Dashboard
```

---

## Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router), React 19 |
| **Styling** | Tailwind CSS v4, `clsx`, `tailwind-merge` |
| **Data Visualization** | D3.js (Linear Vibe Meter gauge) |
| **Animation & Scroll** | Framer Motion, Lenis React Smooth Scroll |
| **Icons** | Lucide React |
| **NLP Engine** | `sentiment` (AFINN-165 vocabulary) |
| **Testing** | Playwright Test |
| **Deployment** | Vercel (`redroot-subreddit-vibe-check` / `subreddit-vibe-check-app.vercel.app`) |

---

## Getting Started

### Prerequisites
- **Node.js**: v20.x or higher
- **npm**: v10.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/kumarnallana/The-Subreddit-Vibe-Check.git

# Navigate to project directory
cd The-Subreddit-Vibe-Check

# Install dependencies
npm install
```

> **Note on Renamed Repositories:** If your local git remote still references the old name, update it via:
> ```bash
> git remote set-url origin https://github.com/kumarnallana/The-Subreddit-Vibe-Check.git
> ```

---

## Environment Configuration

Copy `.env.example` to create your local `.env` configuration:

```bash
cp .env.example .env
```

### Configuration Options

```env
# Set to 'mock' for synthetic demo data, or 'api' for official live Reddit Data API
REDDIT_DATA_SOURCE=mock

# Required if REDDIT_DATA_SOURCE=api
# Obtain keys at: https://www.reddit.com/prefs/apps
REDDIT_CLIENT_ID=your_client_id_here
REDDIT_CLIENT_SECRET=your_client_secret_here

# Required User-Agent compliant with Reddit Developer Guidelines
REDDIT_USER_AGENT=web:redroot-subreddit-vibe-check:v1.0.0 (by /u/YOUR_USERNAME)
```

---

## Running Locally

```bash
# Start Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Reviewer Instructions: Reddit API Integration

This application connects using the **OAuth2 Client Credentials** flow as mandated by the Reddit Developer Policy:

1. Go to [https://www.reddit.com/prefs/apps](https://www.reddit.com/prefs/apps).
2. Register an application (script).
3. Populate the following in your `.env` file:
   ```env
   REDDIT_DATA_SOURCE=api
   REDDIT_CLIENT_ID=your_client_id
   REDDIT_CLIENT_SECRET=your_client_secret
   REDDIT_USER_AGENT=web:redroot-subreddit-vibe-check:v1.0.0 (by /u/yourusername)
   ```
4. Restart the server (`npm run dev`). The application detects the credentials and pulls live Reddit OAuth data.

---

## Building for Production

```bash
# Run Next.js production build
npm run build

# Start production server
npm run start
```

---

## Automated Testing (Playwright)

An end-to-end automated testing suite is included to guarantee reliability:

```bash
# Install Playwright browser binaries (first time only)
npx playwright install chromium

# Run the E2E test suite
npx playwright test
```

---

## Design Decisions

1. **Server-Side Credentials Protection:** Next.js Route Handler (`/api/subreddit`) securely stores Reddit Client Secret on the server, ensuring sensitive credentials are never exposed to the client.
2. **Deterministic Client Sentiment Scoring:** Running the AFINN sentiment algorithm client-side provides instant score computation, eliminates unnecessary compute overhead on the server, and allows instant filter recalculations.
3. **Normalized Data Contract:** Raw Reddit JSON payloads vary significantly; the API normalizes every post into a strict schema before sending it downstream, eliminating frontend runtime exceptions.
4. **Adaptive Demo Mode:** Allows developers and evaluators to run, test, and audit the application immediately without requiring approved Reddit API credentials.

---

## Developer Contact

- **Developer:** Nallana Sasi Kumar
- **Email:** [sasikumarnallana956@gmail.com](mailto:sasikumarnallana956@gmail.com)
- **LinkedIn:** [linkedin.com/in/sasi-kumar-nallana](https://www.linkedin.com/in/sasi-kumar-nallana)
- **GitHub:** [github.com/kumarnallana](https://github.com/kumarnallana)
- **Live App:** [https://subreddit-vibe-check-app.vercel.app](https://subreddit-vibe-check-app.vercel.app)
- **Resume:** Accessible online at [https://subreddit-vibe-check-app.vercel.app/resume](https://subreddit-vibe-check-app.vercel.app/resume)
