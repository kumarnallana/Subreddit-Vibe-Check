import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { analyzeTitle, aggregateSentiment } from '@/lib/sentiment';

export function useSubredditData() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSubParam = searchParams.get('subreddit') || '';

  const [subreddit, setSubreddit] = useState(currentSubParam);
  
  // Loading & stage state
  const [isFetching, setIsFetching] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const [error, setError] = useState(null);
  
  // Data state (supports stale-while-revalidate UX)
  const [data, setData] = useState(null);
  const [staleData, setStaleData] = useState(null);

  // Abort controller reference for race condition protection
  const abortControllerRef = useRef(null);
  const lastFetchedSubRef = useRef('');

  useEffect(() => {
    if (currentSubParam && currentSubParam !== lastFetchedSubRef.current) {
      handleSearch(currentSubParam, false);
    }
  }, [currentSubParam]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = async (sub, updateUrl = true) => {
    if (!sub) return;

    // Abort previous in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    lastFetchedSubRef.current = sub;
    setSubreddit(sub);
    setIsFetching(true);
    setLoadingStage('Fetching subreddit posts...');
    setError(null);

    // Update URL without scrolling
    if (updateUrl) {
      router.push(`/?subreddit=${encodeURIComponent(sub)}`, { scroll: false });
    }
    
    // Preserve current data as stale to prevent layout flashes
    if (data) {
      setStaleData(data);
      setData(null);
    }

    try {
      const response = await fetch(`/api/subreddit?name=${encodeURIComponent(sub)}`, {
        signal: abortControllerRef.current.signal
      });
      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.message || 'Failed to fetch subreddit data.');
      }

      setLoadingStage('Analyzing title sentiment...');
      
      // Short delay for readable stage transitions
      await new Promise(r => setTimeout(r, 180));

      // Sentiment analysis calculation
      const enrichedPosts = result.posts.map(post => ({
        ...post,
        sentiment: analyzeTitle(post.title)
      }));

      const stats = aggregateSentiment(enrichedPosts);

      setLoadingStage('Finalizing insights...');
      await new Promise(r => setTimeout(r, 100));

      setData({
        subreddit: sub,
        source: result.source,
        count: result.count,
        posts: enrichedPosts,
        stats
      });
      
      setStaleData(null);
    } catch (err) {
      if (err.name === 'AbortError') {
        return; // Ignored gracefully
      }
      setError(err.message || 'An error occurred while analyzing the subreddit.');
      setStaleData(null);
    } finally {
      setIsFetching(false);
      setLoadingStage('');
    }
  };

  return {
    subreddit,
    isFetching,
    loadingStage,
    error,
    data,
    staleData,
    activeData: data || staleData,
    hasNoData: !(data || staleData) && !isFetching && !error,
    handleSearch
  };
}
