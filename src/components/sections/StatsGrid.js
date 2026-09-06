"use client";

import { useEffect, useRef, useState } from 'react';
import { TrendingUp, TrendingDown, Minus, BarChart2, Activity, Layers3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/animations/variants';

function AnimatedNumber({ value, isFloat = false }) {
  const ref = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 40,
    stiffness: 120
  });
  const isInView = useInView(ref, { once: true, margin: "-10px" });

  useEffect(() => {
    if (prefersReducedMotion) {
      if (ref.current) {
        ref.current.textContent = isFloat ? value.toFixed(2) : Math.round(value);
      }
      return;
    }

    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue, isFloat, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = isFloat ? latest.toFixed(2) : Math.round(latest);
      }
    });
  }, [springValue, isFloat, prefersReducedMotion]);

  return <span ref={ref}>{isFloat ? value.toFixed(2) : Math.round(value)}</span>;
}

export function StatsGrid({ stats }) {
  if (!stats) return null;

  const cards = [
    { 
      title: 'Total Posts', 
      value: stats.total, 
      subtext: 'analyzed',
      icon: Layers3, 
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    { 
      title: 'Positive', 
      value: stats.positive, 
      subtext: `${stats.positivePercent}%`,
      icon: TrendingUp, 
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    { 
      title: 'Neutral', 
      value: stats.neutral, 
      subtext: `${stats.neutralPercent}%`,
      icon: Minus, 
      color: 'text-slate-400',
      bg: 'bg-slate-500/10'
    },
    { 
      title: 'Negative', 
      value: stats.negative, 
      subtext: `${stats.negativePercent}%`,
      icon: TrendingDown, 
      color: 'text-rose-400',
      bg: 'bg-rose-500/10'
    },
    { 
      title: 'Avg Sentiment', 
      value: stats.averageScore, 
      isFloat: true,
      subtext: 'AFINN score',
      icon: Activity, 
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    { 
      title: 'Avg Reddit Score', 
      value: stats.averageRedditScore, 
      subtext: 'upvotes',
      icon: BarChart2, 
      color: 'text-amber-400',
      bg: 'bg-amber-500/10'
    },
  ];

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-4"
    >
      {cards.map((card, i) => (
        <motion.div 
          variants={fadeInUp}
          key={i} 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative overflow-hidden rounded-2xl border-t border-l border-white/10 border-r border-b border-black/20 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-5 shadow-xl backdrop-blur-md transition-colors hover:from-slate-700/80 hover:to-slate-800/80"
        >
          {/* Subtle inner glow */}
          <div className="absolute -inset-x-20 -top-20 h-[100px] w-full rotate-12 bg-white/5 blur-2xl pointer-events-none" />
          <div className="flex items-center gap-4">
            <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", card.bg, card.color)} aria-hidden="true">
              <card.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">{card.title}</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <p className="text-2xl font-bold font-mono tracking-tight text-white">
                  <AnimatedNumber value={card.value} isFloat={card.isFloat} />
                </p>
                {card.subtext && (
                  <span className="text-xs font-medium text-slate-400">{card.subtext}</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
