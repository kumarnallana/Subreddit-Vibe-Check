"use client";

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TrendingUp, Minus, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

export function SentimentOverview({ stats }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!stats || !chartRef.current) return;

    // Clear previous D3 SVG before redraw
    d3.select(chartRef.current).selectAll('*').remove();

    const width = chartRef.current.clientWidth || 300;
    const height = 40;
    const margin = { left: 12, right: 12 };

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', height)
      .style('overflow', 'visible')
      .attr('role', 'img')
      .attr('aria-label', `Linear vibe meter showing average score of ${stats.averageScore.toFixed(2)} on a scale from -3 to +3`);

    // AFINN average scores scale from -3 (bearish) to +3 (bullish)
    const xScale = d3.scaleLinear()
      .domain([-3, 3])
      .range([margin.left, width - margin.right])
      .clamp(true);

    // Gradient definition for background track
    const defs = svg.append('defs');
    const linearGradient = defs.append('linearGradient')
      .attr('id', 'vibe-gradient-track')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    linearGradient.append('stop').attr('offset', '0%').attr('stop-color', '#f43f5e'); // rose-500
    linearGradient.append('stop').attr('offset', '50%').attr('stop-color', '#64748b'); // slate-500
    linearGradient.append('stop').attr('offset', '100%').attr('stop-color', '#10b981'); // emerald-500

    // Background track line
    svg.append('line')
      .attr('x1', margin.left)
      .attr('x2', width - margin.right)
      .attr('y1', height / 2)
      .attr('y2', height / 2)
      .attr('stroke', 'url(#vibe-gradient-track)')
      .attr('stroke-width', 5)
      .attr('stroke-linecap', 'round')
      .attr('opacity', 0.6);

    // Neutral center tick mark (0.00 point)
    svg.append('line')
      .attr('x1', xScale(0))
      .attr('x2', xScale(0))
      .attr('y1', height / 2 - 7)
      .attr('y2', height / 2 + 7)
      .attr('stroke', '#64748b')
      .attr('stroke-width', 2)
      .attr('stroke-linecap', 'round');

    // Score indicator pin
    const indicator = svg.append('circle')
      .attr('cx', xScale(0))
      .attr('cy', height / 2)
      .attr('r', 7.5)
      .attr('fill', '#ffffff')
      .attr('stroke', '#0f172a') // slate-900 ring
      .attr('stroke-width', 2.5);

    // Smooth entry transition to final score
    indicator.transition()
      .duration(750)
      .ease(d3.easeCubicOut)
      .attr('cx', xScale(stats.averageScore));

    // Handle responsive resize via ResizeObserver
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newWidth = entry.contentRect.width;
        if (newWidth > 0) {
          xScale.range([margin.left, newWidth - margin.right]);
          svg.select('line').attr('x2', newWidth - margin.right);
          svg.select('line:nth-child(3)').attr('x1', xScale(0)).attr('x2', xScale(0));
          indicator.attr('cx', xScale(stats.averageScore));
        }
      }
    });

    observer.observe(chartRef.current);
    return () => observer.disconnect();
  }, [stats]);

  if (!stats) return null;

  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-3">
      {/* Vibe Meter Panel */}
      <div className="rounded-2xl border border-white/5 bg-slate-800/50 p-6 sm:p-7 lg:col-span-2 flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Overall Vibe</span>
          <div className="mt-1.5 flex flex-wrap items-baseline gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{stats.vibe}</h2>
            <span className="text-xs sm:text-sm font-mono font-medium text-slate-300">
              {stats.averageScore > 0 ? '+' : ''}{stats.averageScore.toFixed(2)} AFINN avg
            </span>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between text-xs font-medium text-slate-400 mb-1.5 select-none">
            <span className="text-rose-400">Negative (-3)</span>
            <span className="text-slate-400">Neutral (0)</span>
            <span className="text-emerald-400">Positive (+3)</span>
          </div>
          <div ref={chartRef} className="w-full h-[40px]" />
        </div>
      </div>

      {/* Sentiment Distribution Summary */}
      <div className="rounded-2xl border border-white/5 bg-slate-800/50 p-6 sm:p-7 flex flex-col justify-between">
        <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-4">Distribution</span>
        
        <div className="flex flex-col gap-4">
          {/* Positive Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-medium mb-1">
              <span className="flex items-center gap-1.5 text-slate-200">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                Positive
              </span>
              <span className="font-mono font-semibold text-white">{stats.positivePercent}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-700/60 overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${stats.positivePercent}%` }} />
            </div>
          </div>

          {/* Neutral Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-medium mb-1">
              <span className="flex items-center gap-1.5 text-slate-200">
                <Minus className="h-3.5 w-3.5 text-slate-400" />
                Neutral
              </span>
              <span className="font-mono font-semibold text-white">{stats.neutralPercent}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-700/60 overflow-hidden">
              <div className="h-full rounded-full bg-slate-400 transition-all duration-500" style={{ width: `${stats.neutralPercent}%` }} />
            </div>
          </div>

          {/* Negative Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-medium mb-1">
              <span className="flex items-center gap-1.5 text-slate-200">
                <TrendingDown className="h-3.5 w-3.5 text-rose-400" />
                Negative
              </span>
              <span className="font-mono font-semibold text-white">{stats.negativePercent}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-700/60 overflow-hidden">
              <div className="h-full rounded-full bg-rose-500 transition-all duration-500" style={{ width: `${stats.negativePercent}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
