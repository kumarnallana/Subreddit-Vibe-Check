import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const SENTIMENT_CONFIG = {
  positive: {
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    Icon: TrendingUp,
    label: 'Positive'
  },
  negative: {
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    Icon: TrendingDown,
    label: 'Negative'
  },
  neutral: {
    color: 'text-slate-400',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/20',
    Icon: Minus,
    label: 'Neutral'
  }
};

export const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'positive', label: 'Positive' },
  { id: 'neutral', label: 'Neutral' },
  { id: 'negative', label: 'Negative' }
];

export const SORT_OPTIONS = [
  { value: 'score_desc', label: 'Highest Reddit Score' },
  { value: 'sentiment_desc', label: 'Highest Sentiment Score' },
  { value: 'sentiment_asc', label: 'Lowest Sentiment Score' }
];
