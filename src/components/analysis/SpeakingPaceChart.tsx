"use client";

interface SpeakingPaceChartProps {
  paceWpm?: number;
  status?: string;
}

export function SpeakingPaceChart({
  paceWpm = 135,
  status = "Good",
}: SpeakingPaceChartProps) {
  // Waveform bar heights (percentages)
  const barHeights = [
    20, 35, 15, 40, 65, 25, 10, 30, 55, 70, 85, 50, 35, 20, 45, 60, 75, 90, 55, 30,
    15, 25, 50, 75, 60, 40, 20, 10, 30, 65, 80, 45, 35, 20, 55, 70, 95, 60, 30, 15,
    25, 40, 65, 50, 35, 20, 10, 30, 55, 70, 45, 20,
  ];

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      {/* Title & Badge */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
          Speaking Pace
        </h3>
        <span className="inline-block rounded-full bg-success-lightest border border-success/15 px-2.5 py-0.5 text-xs font-bold text-success">
          {status}
        </span>
      </div>

      <p className="text-sm font-medium text-text-secondary mb-6">
        Your speaking pace is ideal ({paceWpm} WPM).
      </p>

      {/* Waveform Visualization */}
      <div className="flex h-16 w-full items-center justify-between gap-[3px] overflow-hidden rounded-xl bg-surface-secondary px-4 border border-border/40">
        {barHeights.map((height, index) => (
          <div
            key={index}
            style={{ height: `${height}%` }}
            className="w-[3px] rounded-full bg-accent opacity-85 hover:opacity-100 hover:scale-y-110 transition-all duration-200"
          />
        ))}
      </div>
    </div>
  );
}
