"use client";

import { useState } from 'react';
import { ExternalLink, MessageCircle, ArrowUp, TrendingUp, Minus, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { SENTIMENT_CONFIG, FILTER_TABS, SORT_OPTIONS } from '@/data/constants';

export function PostList({ posts }) {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('score_desc');

  if (!posts || posts.length === 0) return null;

  // Filter posts
  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    return post.sentiment.label === filter;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sort === 'score_desc') return b.score - a.score;
    if (sort === 'sentiment_desc') return b.sentiment.score - a.sentiment.score;
    if (sort === 'sentiment_asc') return a.sentiment.score - b.sentiment.score;
    return 0;
  });

  const getSentimentBadge = (label) => {
    return SENTIMENT_CONFIG[label] || SENTIMENT_CONFIG.neutral;
  };

  const filterTabsWithCounts = FILTER_TABS.map(tab => ({
    ...tab,
    count: tab.id === 'all' 
      ? posts.length 
      : posts.filter(p => p.sentiment.label === tab.id).length
  }));

  return (
    <div className="mt-12">
      {/* Controls Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
          <span>Hot Posts</span>
          <span className="text-xs font-mono font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-white/5">
            {filteredPosts.length}
          </span>
        </h2>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Segmented Control Filter */}
          <div className="flex p-1 bg-slate-800/90 rounded-xl border border-white/5" role="tablist" aria-label="Sentiment Filters">
            {filterTabsWithCounts.map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(tab.id)}
                  className={cn(
                    "relative px-3 sm:px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors outline-none",
                    isActive ? "text-white font-semibold" : "text-slate-400 hover:text-slate-200"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-sentiment-tab"
                      className="absolute inset-0 bg-slate-700 rounded-lg shadow-sm border border-white/10"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {tab.label}
                    <span className={cn(
                      "text-[10px] font-mono px-1.5 py-0.2 rounded",
                      isActive ? "bg-slate-900/60 text-slate-200" : "text-slate-400"
                    )}>
                      {tab.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* Sort Dropdown */}
          <select 
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort posts by"
            className="rounded-xl border border-white/5 bg-slate-800/90 px-3 py-1.5 text-xs font-medium text-slate-200 focus:border-blue-500/50 focus:outline-none focus-ring cursor-pointer"
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-3">
        <AnimatePresence mode="popLayout">
          {sortedPosts.map((post) => {
            const { color, bg, border, Icon } = getSentimentBadge(post.sentiment.label);
            const redditUrl = post.permalink ? `https://reddit.com${post.permalink}` : post.url;

            return (
              <motion.div 
                key={post.id} 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="group relative flex flex-col gap-3 rounded-xl border border-white/5 bg-slate-800/40 p-4 sm:p-5 sm:flex-row sm:items-start transition-all duration-150 hover:border-white/10 hover:bg-slate-800/70"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                    <span className="font-medium text-slate-300">u/{post.author || 'reddit_user'}</span>
                    <span aria-hidden="true">•</span>
                    <span>{post.created ? new Date(post.created * 1000).toLocaleDateString() : 'Recent'}</span>
                  </div>
                  
                  <a 
                    href={redditUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm sm:text-base font-medium leading-snug text-white transition-colors group-hover:text-blue-400 focus-ring rounded"
                  >
                    {post.title}
                  </a>

                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mt-3">
                    <span className="flex items-center gap-1">
                      <ArrowUp className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                      <span>{post.score.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                      <span>{post.numComments.toLocaleString()} comments</span>
                    </span>
                  </div>
                </div>
                
                <div className="flex shrink-0 items-center justify-between sm:flex-col sm:items-end sm:justify-start gap-2.5">
                  <div className={cn("inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold capitalize", bg, color, border)}>
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{post.sentiment.label}</span>
                    <span className="opacity-75 font-mono text-[11px]">({post.sentiment.score > 0 ? '+' : ''}{post.sentiment.score})</span>
                  </div>
                  
                  <a 
                    href={redditUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-7 w-7 rounded-lg bg-slate-700/40 text-slate-400 opacity-80 sm:opacity-0 transition-all hover:bg-slate-700 hover:text-white group-hover:opacity-100 focus:opacity-100 focus-ring"
                    aria-label={`View "${post.title}" on Reddit`}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {sortedPosts.length === 0 && (
          <div className="rounded-xl border border-white/5 border-dashed p-10 text-center text-sm text-slate-400">
            No posts match the selected sentiment filter.
          </div>
        )}
      </div>
    </div>
  );
}
