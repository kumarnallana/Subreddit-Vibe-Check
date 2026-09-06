import './globals.css';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { LenisProvider } from '@/components/LenisProvider';
import { Activity, Mail, FileText, ArrowUpRight } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'The Subreddit Vibe Check | Real-Time Reddit Sentiment Analytics',
  description: 'Understand the collective mood and sentiment behind the hottest conversations on Reddit.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-slate-900 text-slate-50 antialiased selection:bg-blue-500/30`}>
        <LenisProvider>
          <div className="relative flex min-h-screen flex-col">
            {/* Subtle background radial gradient */}
            <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900 to-slate-900 opacity-80" aria-hidden="true" />
            
            {/* Header Navigation */}
            <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-900/80 backdrop-blur-xl transition-all">
              <div className="container mx-auto flex h-14 max-w-5xl items-center justify-between px-4 md:px-8">
                {/* Logo & Brand */}
                <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-inner" aria-hidden="true">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-[15px] font-semibold tracking-tight text-slate-50">The Subreddit Vibe Check</span>
                </Link>

                {/* GitHub Repository Link */}
                <a
                  href="https://github.com/kumarnallana/secureid-identity-access"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-white/5 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-white/10 hover:bg-slate-700 hover:text-white focus-ring"
                  aria-label="View Source Code on GitHub"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span className="hidden sm:inline">GitHub Repository</span>
                </a>
              </div>
            </header>
            
            <main className="flex-1" id="main-content">
              {children}
            </main>
            
            {/* Professional Footer with Developer Contact */}
            <footer className="border-t border-white/5 bg-slate-900/60 py-12 mt-20 text-center">
              <div className="container mx-auto max-w-5xl px-4 md:px-8">
                {/* Professional Developer Contact Card */}
                <div className="rounded-2xl border border-white/5 bg-slate-800/40 p-6 sm:p-8 backdrop-blur-sm">
                  <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase">
                    Contact Developer for Further Information About Project
                  </span>
                  
                  <h3 className="mt-2 text-lg sm:text-xl font-bold tracking-tight text-white">
                    Nallana Sasi Kumar
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                    Full-Stack Developer passionate about building high-performance, accessible, and scalable web applications.
                  </p>

                  {/* Professional Contact Action Links with Resume */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <Link
                      href="/resume"
                      className="inline-flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs sm:text-sm font-medium text-blue-400 transition-colors hover:border-blue-500/50 hover:bg-blue-500/20 hover:text-blue-300 focus-ring"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Resume (PDF)</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                    </Link>

                    <a
                      href="mailto:sasikumarnallana956@gmail.com"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-800/80 px-4 py-2 text-xs sm:text-sm font-medium text-slate-200 transition-colors hover:border-white/20 hover:bg-slate-700 hover:text-white focus-ring"
                    >
                      <Mail className="h-4 w-4 text-slate-400" />
                      <span>sasikumarnallana956@gmail.com</span>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/sasi-kumar-nallana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-800/80 px-4 py-2 text-xs sm:text-sm font-medium text-slate-200 transition-colors hover:border-white/20 hover:bg-slate-700 hover:text-white focus-ring"
                    >
                      <svg className="h-4 w-4 fill-current text-slate-400" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <span>LinkedIn Profile</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
                    </a>

                    <a
                      href="https://github.com/kumarnallana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-800/80 px-4 py-2 text-xs sm:text-sm font-medium text-slate-200 transition-colors hover:border-white/20 hover:bg-slate-700 hover:text-white focus-ring"
                    >
                      <svg className="h-4 w-4 fill-current text-slate-400" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      <span>GitHub Profile</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
                    </a>
                  </div>
                </div>

                {/* Subtitle Attribution */}
                <p className="mt-8 text-xs text-slate-500">
                  The Subreddit Vibe Check • Built with Next.js App Router, D3.js, Framer Motion, and AFINN Sentiment Analysis.
                </p>
              </div>
            </footer>
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
