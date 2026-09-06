"use client";

import { Suspense } from 'react';
import { SearchSection } from '@/components/sections/SearchSection';
import { StatsGrid } from '@/components/sections/StatsGrid';
import { SentimentOverview } from '@/components/sections/SentimentOverview';
import { PostList } from '@/components/sections/PostList';
import { AlertCircle, BarChart3, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSubredditData } from '@/hooks/useSubredditData';

function DashboardContent() {
  const {
    subreddit,
    isFetching,
    loadingStage,
    error,
    activeData,
    staleData,
    hasNoData,
    handleSearch
  } = useSubredditData();

  return (
    <div className="container mx-auto px-4 py-10 md:px-8 max-w-5xl">
      <SearchSection onSearch={(sub) => handleSearch(sub, true)} initialValue={subreddit} isFetching={isFetching} />

      <div className="mt-14">
        {/* Empty / Initial State */}
        {hasNoData && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center justify-center space-y-4 py-20 text-center rounded-2xl border border-white/5 bg-slate-800/20 p-8"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/80 border border-white/5 shadow-inner" aria-hidden="true">
              <BarChart3 className="h-8 w-8 text-slate-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-200">No Subreddit Analyzed Yet</h2>
              <p className="mt-1.5 text-sm text-slate-400 max-w-md mx-auto">
                Enter a subreddit name above or select one of the suggested tags to inspect conversation sentiment.
              </p>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
            className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-8 text-center"
            role="alert"
          >
            <AlertCircle className="mx-auto mb-3 h-9 w-9 text-rose-400" />
            <h2 className="text-base font-semibold text-rose-200">Analysis Failed</h2>
            <p className="text-sm text-rose-300/80 mt-1 max-w-md mx-auto">{error}</p>
            <button
              onClick={() => handleSearch(subreddit, false)}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-rose-500/20 border border-rose-500/30 px-4 py-2 text-xs font-medium text-rose-200 hover:bg-rose-500/30 transition-colors focus-ring"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Retry Search</span>
            </button>
          </motion.div>
        )}

        {/* Dashboard Results Container */}
        {activeData && (
          <div className="relative">
            {/* Stale Data Masking Overlay */}
            {staleData && isFetching && (
              <div 
                className="absolute inset-0 z-20 flex items-start justify-center pt-24 backdrop-blur-[2px] bg-slate-900/40 rounded-2xl transition-opacity duration-200"
                aria-live="polite"
              >
                <div className="flex items-center gap-3 rounded-full border border-blue-500/30 bg-slate-900/90 px-5 py-2.5 text-sm font-medium text-blue-400 shadow-2xl backdrop-blur-md">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
                  <span>{loadingStage}</span>
                </div>
              </div>
            )}

            <div className={staleData && isFetching ? 'opacity-40 grayscale-[25%] pointer-events-none transition-all duration-300' : 'transition-all duration-300'}>
              {activeData.count === 0 ? (
                <div className="rounded-2xl border border-white/5 bg-slate-800/40 p-12 text-center text-slate-400">
                  <p>No valid public posts found for r/{activeData.subreddit}.</p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Demo Mode Notice Banner */}
                  {activeData.source === 'mock' && (
                    <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs sm:text-sm text-amber-300/90">
                      <AlertCircle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                      <div>
                        <strong className="font-semibold text-amber-300">Demo Mode Active: </strong>
                        Rendering 50 synthetic posts for evaluation. To switch to live Reddit API data, add your developer keys to <code className="font-mono bg-amber-500/10 px-1 py-0.5 rounded text-amber-200">.env</code>.
                      </div>
                    </div>
                  )}
                  
                  <StatsGrid stats={activeData.stats} />
                  <SentimentOverview stats={activeData.stats} />
                  <PostList posts={activeData.posts} />
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div className="h-96 w-full flex items-center justify-center text-slate-400">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
