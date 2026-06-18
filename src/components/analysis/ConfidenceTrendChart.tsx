"use client";

interface ConfidenceTrendChartProps {
  status?: string;
}

export function ConfidenceTrendChart({
  status = "Good",
}: ConfidenceTrendChartProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      {/* Title & Badge */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
          Confidence
        </h3>
        <span className="inline-block rounded-full bg-success-lightest border border-success/15 px-2.5 py-0.5 text-xs font-bold text-success">
          {status}
        </span>
      </div>

      <p className="text-sm font-medium text-text-secondary mb-6">
        You sound confident!
      </p>

      {/* Smooth SVG Spline Area Chart */}
      <div className="relative h-16 w-full rounded-xl bg-surface-secondary px-4 border border-border/40 overflow-hidden flex items-end">
        <svg
          viewBox="0 0 500 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            {/* Blue gradient fading out at the bottom */}
            <linearGradient id="confidence-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-info)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--color-info)" stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Fill path (includes bottom bounds for area) */}
          <path
            d="M 0 80 
               C 60 75, 100 95, 150 90 
               C 200 85, 240 50, 290 55 
               C 340 60, 380 90, 420 85 
               C 460 80, 480 65, 500 68 
               L 500 100 
               L 0 100 Z"
            fill="url(#confidence-grad)"
          />

          {/* Stroke path (spline curve only) */}
          <path
            d="M 0 80 
               C 60 75, 100 95, 150 90 
               C 200 85, 240 50, 290 55 
               C 340 60, 380 90, 420 85 
               C 460 80, 480 65, 500 68"
            fill="none"
            stroke="var(--color-info)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
