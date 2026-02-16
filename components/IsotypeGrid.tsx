import React, { useState, MouseEvent } from 'react';

const COLS = 28;
const TOTAL_NAVY = 178; // Admissions (approx 100 each)
const TOTAL_CRIMSON = 96;   // Deaths (1 each)
const TOTAL = TOTAL_NAVY + TOTAL_CRIMSON; // 274
const ROWS = Math.ceil(TOTAL / COLS);

const ICON_W = 36;
const ICON_H = 44;
const PAD_X = 2;
const PAD_Y = 2;

// SVG Path for Person Icon
const CIRCLE = { cx: 299.51, cy: 254.51, r: 55.22 };
const BODY_PATH = "M295.71,480.19l-6.69,77.38c-.83,9.62-8.89,17.01-18.55,17.01h0c-10.28,0-18.62-8.33-18.62-18.62v-180.99c0-1.53-1.92-2.21-2.88-1.01l-35.64,44.41c-4.48,5.59-12.42,6.97-18.53,3.22h0c-6.71-4.11-8.8-12.88-4.68-19.58,10.47-17,29.28-47.32,38.54-60.7,13.25-19.13,34.59-23.18,47.46-23.18,12.88,0,33.85,0,46.73,0,12.88,0,34.22,4.05,47.46,23.18,9.27,13.39,28.08,43.7,38.54,60.7,4.12,6.7,2.03,15.47-4.68,19.58h0c-6.11,3.74-14.04,2.36-18.53-3.22l-35.64-44.41c-.96-1.19-2.88-.52-2.88,1.01v180.99c0,10.28-8.33,18.62-18.62,18.62h0c-9.66,0-17.71-7.39-18.55-17.01l-6.69-77.38c-.17-1.97-1.82-3.48-3.8-3.48h0c-1.98,0-3.63,1.51-3.8,3.48Z";
const VB = "180 190 240 410";

// Design Tokens
const COLOR_NAVY = "#394a62";
const COLOR_CRIMSON = "#9f1c20";

interface IconData {
  i: number;
  col: number;
  row: number;
  isCase: boolean;
}

const IsotypeGrid: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });

  // Generate icon data
  const icons: IconData[] = [];
  for (let i = 0; i < TOTAL; i++) {
    icons.push({
      i,
      col: i % COLS,
      row: Math.floor(i / COLS),
      isCase: i >= TOTAL_NAVY,
    });
  }

  const svgW = COLS * (ICON_W + PAD_X) + PAD_X;
  const svgH = ROWS * (ICON_H + PAD_Y) + PAD_Y + 60; // Extra space for labels

  const handleMove = (e: MouseEvent<SVGSVGElement>) => {
    // Use client coordinates for fixed tooltip
    setTipPos({ x: e.clientX, y: e.clientY });
  };

  const getLabel = (icon: IconData) => {
    if (icon.isCase) {
      const deathNum = icon.i - TOTAL_NAVY + 1;
      return `Death ${deathNum} of ${TOTAL_CRIMSON} — represents 1 death`;
    }
    const groupNum = icon.i + 1;
    return `Admission group ${groupNum} of ${TOTAL_NAVY} — represents ~100 admissions`;
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 mb-6 font-sans text-sm text-navy/80">
        <div className="flex items-center gap-2">
          <svg width={14} height={18} viewBox={VB} className="overflow-visible">
            <circle cx={CIRCLE.cx} cy={CIRCLE.cy} r={CIRCLE.r} fill={COLOR_NAVY} />
            <path d={BODY_PATH} fill={COLOR_NAVY} />
          </svg>
          <span>Admissions (each icon ≈ 100)</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width={14} height={18} viewBox={VB} className="overflow-visible">
            <circle cx={CIRCLE.cx} cy={CIRCLE.cy} r={CIRCLE.r} fill={COLOR_CRIMSON} />
            <path d={BODY_PATH} fill={COLOR_CRIMSON} />
          </svg>
          <span>Deaths (each icon = 1)</span>
        </div>
      </div>

      {/* Main Visualization */}
      <div className="w-full pb-4">
        {/* SVG Container - scales naturally */}
        <svg 
            viewBox={`0 0 ${svgW} ${svgH}`}
            style={{ width: '100%', height: 'auto', overflow: "visible", cursor: "crosshair" }} 
            onMouseMove={handleMove}
            onMouseLeave={() => setHovered(null)}
            className="mx-auto max-w-[1000px]"
        >
        {icons.map(({ i, col, row, isCase }) => {
            const x = PAD_X + col * (ICON_W + PAD_X);
            const y = PAD_Y + row * (ICON_H + PAD_Y);
            const active = hovered === i;
            const fill = isCase ? COLOR_CRIMSON : COLOR_NAVY;
            const dimmed = hovered !== null && !active;

            return (
            <g key={i}
                onMouseEnter={() => setHovered(i)}
                className="transition-opacity duration-300"
                style={{ pointerEvents: 'all' }}
            >
                <svg x={x} y={y} width={ICON_W} height={ICON_H} viewBox={VB}>
                <circle 
                    cx={CIRCLE.cx} cy={CIRCLE.cy} r={CIRCLE.r} 
                    fill={fill}
                    style={{ opacity: dimmed ? 0.2 : 1, transition: "opacity 0.2s" }}
                />
                <path 
                    d={BODY_PATH} 
                    fill={fill}
                    style={{ opacity: dimmed ? 0.2 : 1, transition: "opacity 0.2s" }}
                />
                </svg>
                {active && (
                <rect 
                    x={x - 2} y={y - 2} 
                    width={ICON_W + 4} height={ICON_H + 4}
                    rx={4} 
                    fill="none" 
                    stroke={fill} 
                    strokeWidth={1.5} 
                    opacity={0.6}
                />
                )}
            </g>
            );
        })}

        {/* Bottom Summary Text - Scalable */}
        <text x={svgW / 2} y={ROWS * (ICON_H + PAD_Y) + 30} textAnchor="middle" fontSize="15" fontWeight="600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <tspan fill={COLOR_NAVY}>17,833 admissions</tspan>
            <tspan fill="#ccc" dx="10" dy="0"> | </tspan>
            <tspan fill={COLOR_CRIMSON} dx="10" dy="0">96 deaths</tspan>
        </text>
        </svg>

        {/* Tooltip Overlay (HTML) - Fixed size for readability */}
        {hovered !== null && (() => {
            const label = getLabel(icons[hovered]);
            const bg = icons[hovered].isCase ? COLOR_CRIMSON : COLOR_NAVY;
            
            return (
                <div 
                    className="fixed z-50 pointer-events-none px-3 py-2 rounded shadow-lg text-white font-sans text-xs font-medium max-w-[200px] text-center transform -translate-x-1/2 -translate-y-full mt-[-10px]"
                    style={{ 
                        left: tipPos.x, 
                        top: tipPos.y,
                        backgroundColor: bg,
                        opacity: 0.95
                    }}
                >
                    {label}
                    {/* Tiny triangle */}
                    <div 
                        className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px]"
                        style={{ borderTopColor: bg }}
                    />
                </div>
            );
        })()}
      </div>
    </div>
  );
};

export default IsotypeGrid;