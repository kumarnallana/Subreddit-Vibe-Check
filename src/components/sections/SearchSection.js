"use client";

import { useState, useEffect, useRef } from 'react';
import { Search, X, CornerDownLeft } from 'lucide-react';

export function SearchSection({ onSearch, isFetching, initialValue = '' }) {
  const [input, setInput] = useState(initialValue);
  const inputRef = useRef(null);

  // Keep input in sync with external changes (e.g. URL query params or browser back/forward)
  useEffect(() => {
    setInput(initialValue);
  }, [initialValue]);

  // Keyboard shortcut '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && input.trim() !== initialValue) {
      onSearch(input.trim());
    }
  };

  const handleClear = () => {
    setInput('');
    inputRef.current?.focus();
  };

  const sampleSubreddits = ['technology', 'programming', 'webdev', 'reactjs'];

  return (
    <div className="mx-auto w-full max-w-2xl text-center">
      <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-slate-50 via-slate-100 to-slate-400">
        Analyze the Vibe
      </h1>
      <p className="mb-10 text-base sm:text-lg text-slate-300">
        Understand the mood and sentiment behind the hottest conversations on Reddit.
      </p>

      <form 
        onSubmit={handleSubmit} 
        className="relative flex items-center shadow-2xl shadow-blue-900/10 rounded-full border border-white/10 bg-slate-800/60 p-2 backdrop-blur-xl transition-all duration-200 focus-within:border-blue-500/50 focus-within:bg-slate-800/90 focus-within:ring-4 focus-within:ring-blue-500/10"
        role="search"
        aria-label="Search Subreddit"
      >
        <div className="pointer-events-none pl-5 text-slate-400" aria-hidden="true">
          <Search className="h-5 w-5" />
        </div>
        <div className="pointer-events-none pl-2.5 text-slate-400 font-mono font-medium select-none" aria-hidden="true">
          r/
        </div>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="technology, reactjs, webdev"
          className="w-full bg-transparent px-2 py-3 text-base sm:text-lg font-medium text-white outline-none placeholder:text-slate-500"
          disabled={isFetching}
          spellCheck={false}
          autoComplete="off"
          aria-label="Subreddit name"
        />
        
        {/* Clear Button */}
        {input && !isFetching && (
          <button
            type="button"
            onClick={handleClear}
            className="mr-2 p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-700 transition-colors focus-ring"
            aria-label="Clear input"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Keyboard shortcut helper */}
        {!input && (
          <kbd className="hidden sm:inline-flex mr-3 items-center rounded border border-slate-700 bg-slate-800/80 px-2 py-0.5 text-[11px] font-mono font-medium text-slate-400 shadow-sm" aria-hidden="true">
            /
          </kbd>
        )}

        <button
          type="submit"
          disabled={isFetching || !input.trim() || input.trim() === initialValue}
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 sm:px-7 py-3 text-sm sm:text-base font-medium text-white transition-all duration-150 hover:bg-blue-500 active:scale-95 disabled:opacity-50 disabled:pointer-events-none focus-ring"
          aria-label="Run sentiment analysis"
        >
          {isFetching ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Analyzing</span>
            </span>
          ) : (
            <span>Analyze</span>
          )}
        </button>
      </form>

      {/* Suggested Pill Buttons */}
      <div className="mt-8 flex flex-wrap justify-center items-center gap-2.5 text-sm text-slate-400">
        <span className="text-slate-500 text-xs uppercase tracking-widest font-semibold mr-1 select-none">Quick Try</span>
        {sampleSubreddits.map((sub) => (
          <button
            key={sub}
            type="button"
            onClick={() => {
              setInput(sub);
              onSearch(sub);
            }}
            disabled={isFetching}
            className="rounded-full border border-white/5 bg-slate-800/50 px-3.5 py-1 text-xs sm:text-sm font-medium text-slate-300 transition-all duration-150 hover:border-white/15 hover:bg-slate-700/80 hover:text-white active:scale-95 disabled:opacity-50 focus-ring"
            aria-label={`Analyze r/${sub}`}
          >
            r/{sub}
          </button>
        ))}
      </div>
    </div>
  );
}
